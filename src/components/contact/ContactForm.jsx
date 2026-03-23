import React, { useMemo, useState } from "react";
import { SITE } from "../../data/siteConfig";

const PACKAGE_OPTIONS = [
  { id: "2D1N Wild Escape", label: "2D1N Wild Escape" },
  { id: "3D2N Deep Wild", label: "3D2N Deep Wild" },
  { id: "Custom", label: "Custom" }
];

const PROPERTY_OPTIONS = [
  { id: "Couple Cottage", label: "Couple Cottage" },
  { id: "Bachelor", label: "Bachelor" },
  { id: "Budget", label: "Budget" }
];

function buildWhatsAppMessage(data) {
  const lines = [
    "Hi! I want to book a Wayanad trip with Wayanad Wild Ways.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Travel Date: ${data.travelDate}`,
    `Package: ${data.package}`,
    `Property Type: ${data.propertyType}`,
    `Guests: ${data.guests}`,
    data.message ? `Message: ${data.message}` : "Message: (not provided)"
  ];
  return lines.join("\n");
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [packageChoice, setPackageChoice] = useState(PACKAGE_OPTIONS[0].id);
  const [propertyType, setPropertyType] = useState(PROPERTY_OPTIONS[0].id);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const waHref = useMemo(() => {
    const data = {
      name,
      phone,
      travelDate,
      package: packageChoice,
      propertyType,
      guests,
      message
    };
    const msg = buildWhatsAppMessage(data);
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [name, phone, travelDate, packageChoice, propertyType, guests, message]);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (phone.trim() && !/^[0-9]{10}$/.test(phone.trim().replace(/\D/g, ""))) next.phone = "Enter a valid 10-digit Indian number.";
    if (!travelDate) next.travelDate = "Please select your travel date.";
    if (!packageChoice) next.package = "Please select a package.";
    if (!propertyType) next.propertyType = "Please select a property type.";
    if (!Number.isFinite(Number(guests)) || Number(guests) < 1) next.guests = "Guests must be at least 1.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;
    window.open(waHref, "_blank", "noreferrer");
    // No success message by design: conversion-focused flow.
  };

  return (
    <div className="rounded-card bg-white border border-black/5 shadow-card p-6 sm:p-7" data-reveal>
      <div className="font-display text-2xl font-bold text-charcoal">Enquiry Form</div>
      <div className="mt-1 text-sm font-body text-charcoal/70">Fill your details and we will plan your Wayanad trip.</div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <div>
          <label className="font-body text-sm font-semibold text-charcoal">Name</label>
          <input
            className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
            required
          />
          {errors.name && <div className="mt-2 text-xs text-accent font-body">{errors.name}</div>}
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-charcoal">Phone</label>
          <input
            className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile number"
            required
          />
          {errors.phone && <div className="mt-2 text-xs text-accent font-body">{errors.phone}</div>}
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-charcoal">Travel Date</label>
          <input
            className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            type="date"
            required
          />
          {errors.travelDate && <div className="mt-2 text-xs text-accent font-body">{errors.travelDate}</div>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-semibold text-charcoal">Package</label>
            <select
              className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
              value={packageChoice}
              onChange={(e) => setPackageChoice(e.target.value)}
            >
              {PACKAGE_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            {errors.package && <div className="mt-2 text-xs text-accent font-body">{errors.package}</div>}
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-charcoal">Property Type</label>
            <select
              className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {PROPERTY_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            {errors.propertyType && <div className="mt-2 text-xs text-accent font-body">{errors.propertyType}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-semibold text-charcoal">No. of Guests</label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-black/10 bg-white px-4 font-body text-sm outline-none focus:border-primary/60"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              type="number"
              min={1}
              required
            />
            {errors.guests && <div className="mt-2 text-xs text-accent font-body">{errors.guests}</div>}
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-charcoal">Quick Notes (Optional)</label>
            <div className="mt-2 h-12 rounded-xl border border-black/10 bg-white px-4 flex items-center text-sm font-body text-charcoal/60">
              We will confirm details on WhatsApp
            </div>
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-charcoal">Message</label>
          <textarea
            className="mt-2 w-full min-h-[110px] rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm outline-none focus:border-primary/60"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any preferences? (Optional)"
          />
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full h-12 rounded-pill bg-primary text-white font-body font-semibold shadow-card-hover transition-transform duration-200 hover:-translate-y-0.5"
            style={{ touchAction: "manipulation" }}
          >
            Send Enquiry on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

