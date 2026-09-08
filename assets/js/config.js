/**
 * iOrderUP — Business Configuration
 *
 * EDIT THIS FILE to update contact details across the entire website.
 * These values are injected into every page (index.html, privacy.html,
 * terms.html) automatically by assets/js/main.js — you never need to
 * touch the HTML when the location, phone, or email changes.
 *
 * NOTE: only a city/state is shown publicly (not a street address) —
 * this file intentionally does not store the full mailing address.
 */
window.IORDERUP_CONFIG = {
  businessName: "iOrderUP",
  legalBusinessName: "iOrderUP",
  businessType: "Telephone Answering Services",

  // Public-facing location (city/state only — no street address is published).
  location: "North Charleston, South Carolina",

  // Contact email (used for general inquiries and privacy requests).
  contactEmail: "oscardanielmurillo06@gmail.com",

  // Contact phone — human-readable display format and the raw digits used for the tel: link.
  contactPhoneDisplay: "+1 (562) 638-8094",
  contactPhoneRaw: "+15626388094",

  // Live demo line — visitors can call this number to try iOrderUP for real.
  demoPhoneDisplay: "+1 (878) 230-7408",
  demoPhoneRaw: "+18782307408",

  // "Book a Demo" form endpoint. This is the ONE place to connect the
  // contact form to a real inbox — set it to a form backend URL (e.g. a
  // Formspree/Getform endpoint, or your own serverless function) that
  // accepts a POST with fields: name, restaurant, phone, email.
  // Leave empty and the form stays in its honest "not connected yet"
  // state instead of pretending to send anywhere.
  demoFormEndpoint: "https://formspree.io/f/mrpgabbq",

  // Shown in the footer copyright line.
  currentYear: new Date().getFullYear(),
};
