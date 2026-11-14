"use client";

import { useState } from "react";
import Image from "next/image";

const instagram = "https://www.instagram.com/zendental.ge/";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=63+Merab+Kostava+Street+Tbilisi";
const phone = "+995555702737";

const approach = [
  { id: "listen", label: "First, we listen", number: "01", title: "Care that starts with you.", text: "Every visit begins with a conversation. We’ll take time to understand what brought you in, what matters to you, and how you’d like to feel about your care.", note: "A little more listening. A little less rushing." },
  { id: "clear", label: "Then, we make it clear", number: "02", title: "Know what comes next.", text: "We’ll talk through what we see and explain the options in straightforward language, so you can make a choice that feels right for you.", note: "Thoughtful explanations, at your pace." },
  { id: "care", label: "Care, together", number: "03", title: "A plan that feels considered.", text: "From everyday prevention to restorative care, we’ll agree on the next steps together and keep the experience as calm and comfortable as we can.", note: "One step at a time, with you in control." },
];

const services = [
  { n: "01", title: "Everyday care", text: "Regular check-ups and professional cleaning to help you look after your oral health.", tag: "PREVENTION", tone: "cream" },
  { n: "02", title: "Restorative care", text: "Thoughtful treatment for teeth that need a little extra attention, with your comfort in mind.", tag: "RESTORATION", tone: "rose" },
  { n: "03", title: "Smile care", text: "Talk through options for the look and feel of your smile, with a plan shaped around you.", tag: "AESTHETICS", tone: "sand" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(approach[0].id);
  const selected = approach.find((item) => item.id === activeTab) ?? approach[0];

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Zen Dental home">zen<span> dental</span></a>
        <button id="menu-toggle" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? "Close" : "Menu"}</span><span className={`menu-icon ${menuOpen ? "is-open" : ""}`} aria-hidden="true"><b /><b /></span>
        </button>
        <nav id="main-nav" className={menuOpen ? "nav-open" : ""} aria-label="Main navigation" onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            document.getElementById("menu-toggle")?.focus();
          }
        }}>
          <a href="#care" onClick={() => setMenuOpen(false)}>Our care</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Find us</a>
          <a className="nav-book" href={instagram} target="_blank" rel="noreferrer">Book a visit <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <div id="main-content">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A calmer kind of dental care <span className="eyebrow-place">— TBILISI, GEORGIA</span></p>
            <h1>Feel good<br />about <em>your</em><br />smile.</h1>
            <div className="hero-bottom">
              <p>Considered dental care, in a space designed to help you feel at ease.</p>
              <a className="button button-dark" href={instagram} target="_blank" rel="noreferrer">Let’s talk <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <Image src="/images/zen-hero.png" alt="A sculptural ivory smile form in a softly lit blush and stone setting" fill priority sizes="(max-width: 760px) 100vw, 52vw" className="hero-image" />
            <div className="visual-label"><span>ZEN DENTAL / TBILISI</span><span>SPACE TO FEEL AT EASE</span></div>
            <div className="hero-stamp">A little<br />more <em>zen.</em></div>
            <a className="scroll-cue" href="#intro"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
          </div>
        </section>

        <section className="intro section-pad" id="intro">
          <p className="eyebrow">A BETTER KIND OF VISIT</p>
          <div className="intro-content">
            <h2>Good care feels<br />like <em>being cared for.</em></h2>
            <div className="intro-aside"><p>At Zen Dental, we believe the experience matters as much as the dentistry. We make room for questions, take the time to explain, and meet you where you are.</p><a className="text-link" href="#approach">Get to know our approach <span>↗</span></a></div>
          </div>
          <div className="values-row">
            <div><span className="value-mark">01</span><strong>Time to listen</strong><p>Your questions have a place here.</p></div>
            <div><span className="value-mark">02</span><strong>Clarity at every step</strong><p>Understand your options, comfortably.</p></div>
            <div><span className="value-mark">03</span><strong>Care, considered</strong><p>A thoughtful plan, made together.</p></div>
          </div>
        </section>

        <section className="care-section section-pad" id="care">
          <div className="section-heading"><div><p className="eyebrow">CARE FOR YOUR SMILE</p><h2>Here for the<br /><em>whole picture.</em></h2></div><p className="section-intro">Whether it’s time for a check-up or you have something on your mind, we’ll help you find the right place to begin.</p></div>
          <div className="service-list">
            {services.map((service) => <article className={`service-item service-${service.tone}`} key={service.n}>
              <div className="service-copy"><span className="service-number">{service.n} <i>—</i> {service.tag}</span><h3>{service.title}</h3><p>{service.text}</p><a href={instagram} target="_blank" rel="noreferrer" aria-label={`Ask us about ${service.title}`} className="round-arrow">↗</a></div>
              <div className={`service-art art-${service.n}`} aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-disc"/><span className="art-caption">A moment for<br />yourself</span></div>
            </article>)}
          </div>
          <p className="care-footnote">Not sure what you need? That’s a lovely place to start a conversation.</p>
        </section>

        <section className="approach-section section-pad" id="approach">
          <div className="approach-head"><p className="eyebrow">THE ZEN APPROACH</p><h2>Less “dental visit”.<br /><em>More human.</em></h2></div>
          <div className="approach-layout">
            <div className="tab-list" role="tablist" aria-orientation="vertical" aria-label="The Zen approach">
              {approach.map((item, index) => <button key={item.id} id={`tab-${item.id}`} tabIndex={activeTab === item.id ? 0 : -1} className={activeTab === item.id ? "active" : ""} role="tab" aria-selected={activeTab === item.id} aria-controls="approach-panel" onClick={() => setActiveTab(item.id)} onKeyDown={(event) => {
                if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? approach.length - 1 : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : approach.length - 1)) % approach.length;
                setActiveTab(approach[nextIndex].id);
                document.getElementById(`tab-${approach[nextIndex].id}`)?.focus();
              }}><span>{item.number}</span>{item.label}<b aria-hidden="true">↗</b></button>)}
            </div>
            <div className="approach-panel" role="tabpanel" tabIndex={0} id="approach-panel" aria-labelledby={`tab-${selected.id}`} key={selected.id}>
              <span className="panel-number">{selected.number}</span><h3>{selected.title}</h3><p>{selected.text}</p><div className="panel-note"><span className="note-spark">✳</span>{selected.note}</div>
            </div>
            <div className="approach-image" role="img" aria-label="Abstract blush and ivory sculptural detail"><span>MADE FOR A MOMENT OF CALM</span></div>
          </div>
        </section>

        <section className="visit-section section-pad" id="visit">
          <div className="visit-map" role="group" aria-label="Tbilisi location illustration for Zen Dental"><div className="map-grid"/><div className="map-road road-a"/><div className="map-road road-b"/><div className="map-road road-c"/><div className="map-park"/><div className="map-pin"><span>zen dental</span><i aria-hidden="true">●</i></div><span className="map-label map-label-a">TBILISI</span><span className="map-label map-label-b">GEORGIA</span><a className="map-open" href={mapUrl} target="_blank" rel="noreferrer">Open in Maps <span aria-hidden="true">↗</span></a></div>
          <div className="visit-copy"><p className="eyebrow">YOUR NEIGHBOURHOOD DENTIST</p><h2>Come by<br />and <em>say hello.</em></h2><p className="visit-description">Find us on Merab Kostava Street, in the heart of Tbilisi. We’d be happy to help you find a time to visit.</p><address>63 Merab Kostava Street<br />Tbilisi, Georgia</address><div className="visit-actions"><a className="button button-dark" href={mapUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a><a href={`tel:${phone}`} className="phone-link">or call us <span>+995 555 70 27 37</span></a></div></div>
        </section>

        <section className="faq-section section-pad">
          <div><p className="eyebrow">A FEW THINGS YOU MIGHT WONDER</p><h2>Before you<br /><em>drop by.</em></h2></div>
          <div className="faq-list">
            <details><summary>How do I book a visit?<span>+</span></summary><p>Send us a message on Instagram or give us a call. We’ll help you find a time that works.</p><a href={instagram} target="_blank" rel="noreferrer">Message us on Instagram ↗</a></details>
            <details><summary>Where are you located?<span>+</span></summary><p>We’re at 63 Merab Kostava Street in Tbilisi. Open the map for directions.</p><a href={mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a></details>
            <details><summary>What if I’m not sure what kind of care I need?<span>+</span></summary><p>That’s completely okay. Tell us what’s on your mind and we can help you work out a good first step.</p></details>
          </div>
        </section>

        <section className="closing-section section-pad"><p className="eyebrow"><span className="eyebrow-dot"/> YOUR NEXT VISIT CAN FEEL DIFFERENT</p><h2>Let’s make room<br />for <em>a little more ease.</em></h2><a className="button button-light" href={instagram} target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a><div className="closing-circle" aria-hidden="true"/></section>
      </div>

      <footer className="site-footer section-pad"><div className="footer-top"><a className="wordmark footer-wordmark" href="#top">zen<span> dental</span></a><p>Thoughtful dental care<br />for feeling good in your smile.</p><a className="back-top" href="#top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ZEN DENTAL · TBILISI</span><div><a href={instagram} target="_blank" rel="noreferrer">INSTAGRAM <span aria-hidden="true">↗</span></a><a href={`tel:${phone}`}>CALL US <span aria-hidden="true">↗</span></a></div><a href={mapUrl} target="_blank" rel="noreferrer">63 MERAB KOSTAVA STREET, TBILISI <span aria-hidden="true">↗</span></a></div></footer>
    </main>
  );
}
