# Zen Dental booking plan: discussion draft

This is a planning document, not an implemented booking system. No calendar accounts, access grants, reminder providers or paid subscriptions have been created.

## Confirmed requirements

- Approximately seven doctors, mostly using personal Gmail/Google Calendar.
- Three chairs: two publicly bookable; one reserved for the head doctor and excluded from public allocation.
- Administrator approves online requests, consulting a doctor when necessary.
- Administrator needs a simple, Georgian-first interface.
- Doctors can add appointments manually and block their own time.
- SMS confirmations/reminders; optional email.
- Avoid mandatory paid Google Workspace accounts for each doctor.

## Recommended architecture

Build a small custom booking application alongside the existing Next.js website. Its database owns booking status, doctor/chair reservations and reminder delivery. Google Calendar is the familiar calendar interface for doctors and an availability input; it does not own the approval workflow or chair allocation.

Use one clinic-owned Google account to own seven secondary calendars, one per doctor. Share each calendar with its doctor's existing Google account using event-editing permission. The clinic application connects the clinic account through Google OAuth. Calendar setup/sharing can be done once in Google's UI; the receptionist does not manage integration settings daily. Do not distribute a shared account password.

If a doctor's personal calendar should prevent bookings, they can share only its free/busy information with the clinic account. The app checks that calendar without receiving personal event descriptions. This is optional per doctor; without that connection, the doctor must put unavailable time in their clinic calendar. Email invitations alone do not grant calendar access or establish availability.

The two shared chairs and the head doctor's restricted chair are database resources; they do not require paid Workspace resource-calendar accounts. Google synchronization uses the clinic-owned doctor calendars, while chair availability is enforced centrally.

## Capacity and scheduling rules

An interval is available only when all applicable conditions hold:

1. Clinic and doctor working hours allow it.
2. The doctor is qualified for the selected bookable visit type and is free.
3. An eligible chair is free for the entire duration, including buffers.
4. No active pending reservation or confirmed appointment already holds either resource.
5. Calendar availability is fresh enough to rely on it.

For public bookings, eligible chairs are only Chair 1 and Chair 2. Chair 3 is staff-only and restricted to the head doctor. Never use it as an automatic fallback when public capacity is full. Whether the head doctor also accepts public appointments on Chairs 1/2 is not yet decided.

Reserve the doctor and chair together in a database transaction. Recheck Google's availability before approval. An idle doctor does not imply an available chair. Show the patient only appointment times, never other patients or private calendar details. Use Asia/Tbilisi as the clinic timezone and identify it explicitly in confirmations.

Start public booking with a small set of clinic-approved visit types and known durations. Complex treatments remain staff-scheduled until their scheduling rules are established. A patient may choose a doctor or an eligible-doctor option; provisional resource assignment still happens internally when holding a slot.

## Patient interface

A short, mobile-first flow in Georgian, English and Russian:

1. Visit reason and optional doctor preference.
2. Available date and time.
3. Name, phone number, preferred language, optional email.
4. Review and submit an appointment request.

The success screen clearly says that the request is awaiting administrator approval. Send a receipt with the same meaning; do not send a confirmed appointment message at this stage. No patient account is required. Use protected management links for later cancellation/change requests; redact private information from public pages and link previews.

Contact verification, rate limits and bounded holds prevent anonymous requests from reserving all clinic capacity. Hold expiry and the administrator's working-hours response window must be decided with the clinic. Show expiry clearly and release capacity automatically. Do not silently let a request expire while suggesting it remains confirmed.

## Administrator interface

Default to Today rather than a full scheduling/configuration suite:

- A day timeline with Chair 1, Chair 2 and Head doctor columns.
- A Requests inbox with Approve, Suggest another time and Decline.
- A prominent Add appointment button for calls, walk-ins and follow-ups.
- Simple doctor filtering, patient search and tap-to-call.
- A small Needs attention list for calendar conflicts, failed SMS and incomplete manual entries.

When reviewing a request, show patient, doctor, time, duration and proposed chair together. Assign the chair automatically when possible. Do not make drag-and-drop the only way to move an appointment. On phones, use an agenda list and full-width action buttons.

The administrator logs in with an approved existing Google account. Access is limited to named staff. The owner can nominate a backup administrator. Doctors get a limited view of their own appointments and availability.

## Approval and changes

Suggested booking states:

- requested: capacity held until the configured expiry; no confirmation yet.
- awaiting_doctor: administrator needs clinical input; expiry remains visible.
- confirming: database resources reserved and Google write being completed.
- confirmed: calendar creation succeeded; confirmation and reminder jobs can run.
- declined / expired / cancelled: resources released and future reminder jobs invalidated.
- needs_attention: a conflict, incomplete import or synchronization problem requires staff action.

Patient acknowledgement of a reminder is a separate field, not a second clinic approval state. Rescheduling keeps the original appointment until the replacement has been accepted and committed. Changes to appointments invalidate old reminder jobs.

If Google is disconnected or a write fails, do not falsely show the patient a successful calendar-backed confirmation. Keep the reservation bounded, retry safely and show a clear staff action. Record who approved, changed or cancelled each appointment.

## Doctors using Google Calendar

Doctors see their shared Zen Dental calendar in their existing Google Calendar account/app after accepting the sharing invitation and enabling that calendar.

Two distinct operations:

- **Block time:** a busy event can prevent online bookings for that doctor. Personal events need only free/busy sharing; no details are imported.
- **Create a patient appointment:** the clinic must also reserve a chair, know the duration and have contact information before sending patient reminders.

Allow direct additions to the doctor's clinic calendar. On import, block the doctor and attempt an atomic reservation of an eligible free chair. Flag conflicts or missing patient/contact information for the administrator; do not invent a patient record or send an SMS based on a guessed phone number in an event title. An arbitrary Google event is not a fully confirmed clinic appointment until resource checks pass.

Provide a one-tap Add appointment link in the calendar event description or doctor's home-screen shortcut. This minimal form reliably captures the patient, duration and chair. It is the recommended path for patient appointments; calendar-only entries remain a supported import path.

Google Calendar permits independent external edits and is not part of the app's database transaction. Therefore, no claim of perfectly atomic two-way synchronization is made. Detect external changes, recheck availability and surface collisions. For the first release, direct edits/deletions of existing confirmed bookings require administrator reconciliation and pause affected reminders until resolved; use the dashboard's change/cancel action for dependable patient communication.

## SMS and reminders

Proposed defaults, subject to clinic confirmation:

- Immediate request receipt, explicitly pending approval.
- Confirmation after administrator approval and successful calendar write.
- Reminders 24 hours and 2 hours before the visit, skipping any reminder whose time has already passed.
- Short links to acknowledge attendance or request a change/cancellation.
- Optional email copy when the patient provides an email.

SMS is a separate messaging service. Google Calendar reminder settings are user-specific and are not a substitute for clinic-controlled patient SMS. Choose a provider after testing Georgian delivery, sender identity, Unicode segments, delivery receipts and pricing. Do not assume an alphanumeric sender supports SMS replies; links and the clinic phone are the baseline interaction.

Keep messages short and in the patient's language, with scheduling details rather than clinical notes. Georgian/Russian Unicode messages can span multiple billable SMS segments; estimate cost using actual templates and volume.

Use durable scheduled jobs, appointment-version checks, idempotent sends, cancellation and delivery-status tracking. A failed message produces a receptionist task; never label a message delivered merely because it was queued. Calendar events contain minimal booking information and a staff-only link, not medical records.

## Technical foundation

- Existing Next.js site for patient UI and a protected staff area.
- PostgreSQL for staff identities, doctors, chairs, visit types, schedules, reservations, appointments and an audit log.
- Transactional overlap protection for doctor/chair reservations, including active holds.
- A durable job runner for synchronization, hold expiry, retries and reminders; not browser timers or an in-memory serverless timeout.
- Google OAuth for the clinic account, with least-required scopes and encrypted stored tokens.
- Calendar event-ID mapping, change notifications, incremental reconciliation, scheduled recovery and deduplication to prevent write loops.
- Separate fresh free/busy checks for any personal calendars shared only as free/busy.
- SMS provider integration and optional transactional email.

Google watch channels expire and need renewal. External Google OAuth apps left in Testing can have seven-day refresh-token expiry for calendar scopes; production authorization setup must be addressed before relying on the integration. Reconnect and recovery flows must be easy for the owner, not a recurring receptionist task.

## Alternatives and costs

The recommended design avoids mandatory per-doctor Workspace subscriptions. Standard Google Calendar API usage is documented as available at no additional cost, subject to quotas and Google's announced future high-usage billing changes. Hosting, database, background jobs, email and SMS still have operating costs.

A hosted scheduler is a viable alternative if its resource model passes the two-chair and head-doctor rules. Cal.com Teams currently lists $12/user/month billed annually: approximately $84/month for seven paid seats, before SMS and any other charges. Confirm its shared-chair handling and external-edit behavior in a prototype rather than assuming seven doctor schedules equal clinic capacity. Google Calendar by itself does not implement this proposed approval/resource/SMS workflow.

Do not select infrastructure or messaging plans solely by free-tier limits. Estimate normal and peak appointments, billable SMS segments, reminder frequency, retries and monitoring needs first.

## Implementation sequence

1. Prototype the patient request flow and the administrator's Today/Requests/Add appointment screens with clearly fictional data. Review with the administrator on her actual phone/tablet.
2. Build staff access, doctors, chair restrictions, schedules and manual appointment management. Test all overlap rules before public booking.
3. Pilot clinic-calendar sharing and synchronization with one doctor, including direct Google edits, disconnects and recovery.
4. Add public requests, expiry and administrator approval; test simultaneous requests for the final free chair.
5. Add SMS delivery, optional email, rescheduling and reminder cancellation; pilot with staff test numbers before real patients.
6. Roll out to the remaining doctors after the administrator can run a full day unaided.

Acceptance checks include: no third public chair; only head doctor can use the restricted chair; no double reservation of doctor or chair through the app; clear pending/confirmed distinction; incomplete manual imports produce no patient SMS; cancellation and time changes invalidate old reminders; failed Google/SMS operations are visible and recoverable; repeated sync messages create no duplicate appointments.

## Remaining clinic decisions

- Exact doctor list and which doctor is the head doctor.
- Doctor working hours and whether the head doctor accepts public bookings.
- Bookable visit types, durations, chair/equipment restrictions and cleanup buffers.
- Approval response window, hold expiry and out-of-hours behavior.
- Same-day lead time, cancellation and rescheduling policies.
- Approximate monthly bookings, message volume and SMS provider choice.
- Named administrator and backup; access and retention rules for booking information.

## Primary sources checked

- Google calendar sharing: https://support.google.com/calendar/answer/37082
- Google Calendar ACL/free-busy model: https://developers.google.com/workspace/calendar/api/concepts/sharing
- Google freeBusy endpoint: https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query
- Google API quotas/pricing: https://developers.google.com/workspace/calendar/api/guides/quota
- Google reminder model: https://developers.google.com/workspace/calendar/api/concepts/reminders
- Google change notifications/renewal: https://developers.google.com/workspace/calendar/api/guides/push
- Google OAuth lifecycle: https://developers.google.com/identity/protocols/oauth2
- Cal.com pricing and approval feature: https://site.cal.com/pricing and https://site.cal.com/features/requires-confirmation
- SMS encoding/segments: https://www.twilio.com/docs/glossary/what-sms-character-limit

Provider details were checked during planning on 15 November 2026; recheck before implementation or purchase.
