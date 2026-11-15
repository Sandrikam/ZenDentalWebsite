# Zen Dental clinic operations: expansion planning

Planning only, 15 November 2026. No patient records, ministry connections or management features have been implemented.

## Capacity and interface

The user reports an expansion from three to seven chairs. Currently two are publicly bookable and one is reserved for the head doctor; approximately seven doctors use mostly personal Google accounts. The four new chairs' allocation and staffing remain unknown.

Keep the administrator's Georgian-first home screen simple: Today, Patients and Needs attention. Show chair columns on a large screen and an agenda on phones. The owner gets a separate overview. Configure chair eligibility, working hours, assistants, cleaning buffers, equipment and maintenance blocks. A booking needs all required resources, not just an available doctor. No need for seven paid Google Workspace seats just to represent chairs.

## Priorities

| Priority | Capability | Practical benefit |
| --- | --- | --- |
| First | One patient record with duplicate detection | Find history and contacts without repeated data entry. Separate patients from guarantors and guardians. |
| First | Secure pre-visit questionnaire (ანკეტა) | Patient completes relevant medical history, allergies and medicines before arrival; clinician reviews and confirms changes at the visit. Reception tablet/paper fallback remains. |
| First | Clinical chart, treatment plans and consent | Tooth-level findings, completed procedures, staged estimates, signed/versioned forms and attachments belong together. A submitted intake form is not a completed clinical record. |
| First | Seven-chair scheduling and approval inbox | Calls, walk-ins and online requests share one schedule. Doctor/chair eligibility, buffers and staff availability prevent unusable bookings. |
| First | Ministry reporting work queue | Draft, needs review, ready, submitted, accepted, rejected; responsible clinician, receipt and error details. A completed visit is not automatically a successfully reported visit. |
| Next | Recall reminders and cancellation waitlist | Clinician-set follow-up dates, overdue lists, SMS confirmation and opt-out preferences; offer released slots with short holds. No automatic clinical advice. |
| Next | Payments and treatment stages | Deposits, balances, refunds, receipts, instalments, outstanding estimates, laboratory costs and accountant exports. Keep fiscal/accounting integration separate and verified. |
| Next | Laboratory case tracking | Track impressions/scans, promised delivery, fittings, delays and lab invoices before confirming a chair slot. |
| Next | Materials and equipment | Minimum stock/expiry alerts, batches where required, sterilization cycle/load records and equipment maintenance. Confirm required logs with the clinic's compliance lead. |
| Later | Owner dashboard | Chair utilization, no-shows, waiting time, recall completion, accepted treatment plans, revenue collected and outstanding balances. Distinguish booked hours from productive treatment time. |

## EHR and ministry integration

Do not send the raw patient questionnaire directly to the ministry. Proposed flow:

1. Patient submits intake through a protected link or at reception.
2. Clinician reviews it, completes the encounter and approves the clinical record.
3. Integration maps the approved record to the required government fields/codes.
4. A durable submission queue validates, sends, records acknowledgement and exposes rejection/retry status. Use stable encounter identifiers and reconcile uncertain responses before retrying to prevent duplicates.
5. Amendments preserve who changed what and when, and follow the ministry's supported correction process.

The official EHR order is [Order 01-1/ნ on Matsne](https://matsne.gov.ge/ka/document/view/4390457). The public page available during research shows its original 2019 version, not a verified current consolidated text. Do not encode reporting scope, deadlines or paper-retention obligations from that old view. The [2022 dental-documentation amendment](https://matsne.gov.ge/ka/document/view/5392896) also concerns electronic prescription references in the examination form IV-220-1/ა; applicability/current requirements must be checked before launch.

Existing vendors publicly describe ministry connectivity: [Dentos](https://dentos.ge/ehr) describes dental EHR submission and printed forms; [Medsoft](https://medsoft.ge/integratsiebi/) lists EHR and e-prescription integration. These are vendor claims and evaluation leads, not verified endorsements. Dentos's cited article is from 2021; do not rely on its old pricing, deadlines or legal statements as current requirements.

No current public API specification, clinic onboarding requirements or sandbox access was verified in this research. The ministry's [EHR information page](https://www.moh.gov.ge/ka/695/) could not be accessed with the research tool. Before estimating a direct integration, obtain the current integration specification, authentication/onboarding process, required codes/fields, test access, acceptance rules and amendment procedure from the ministry or an authorized integration provider.

## Build versus integrate

Evaluate a Georgian dental practice-management system before building medical records or ministry reporting ourselves. Request a live demonstration of an accepted submission, error correction, printable forms, full export, patient permissions and seven-chair scheduling. Verify API/webhook availability and pricing, support, data hosting, contract/exit terms and migration from the current system. Do not assume an advertised integration includes an API we can use.

Keep the custom public website and its polished booking interface. Connect it to the selected system if supported, using that system as the schedule and patient-record authority. If no viable connector exists, decide the single schedule owner explicitly before building the booking database. Avoid two systems that each think a chair is available.

Clinical data stays in an authenticated staff system with role-based access, individual accounts, access/change logs, protected storage, tested backups and a clinic-approved retention policy. Keep medical histories and attachments out of personal Google Calendar, public website analytics, SMS text and marketing tools. Calendar entries should contain only the minimum scheduling information required. Form completion, clinical consent and marketing permission are separate records. Signature and retention requirements require current local confirmation.

## Questions for the clinic before choosing software

- Which software or ministry portal is used today, and who submits records? What gets entered twice?
- Which forms, consent sheets, logs and reporting templates are currently used? Obtain blank examples through an agreed secure channel, not actual patient records in chat.
- How will the seven chairs be allocated? Which need assistants, special equipment or particular doctors?
- Who owns clinical review, rejected submissions, reception tasks, payments and stock?
- Which services and durations should be bookable online, and how long is the free consultation?
- Which laboratory, imaging, accounting and SMS systems need to connect? What monthly software budget is acceptable?

Suggested sequence: map today's workflow and inspect current software, select the clinical/reporting system, establish one schedule and patient registry, then add intake/recall/finance automation in small releases. Nothing in this document changes the clinic's actual reporting process yet.
