"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const faqs = [
  {
    q: `What do I get for $${site.offerPrice}?`,
    a: "Four doors and the back window in ceramic film. That’s the sedan package.",
  },
  {
    q: "How long does it take?",
    a: "Most sedans are in and out in about two hours.",
  },
  {
    q: "What's the difference between ceramic and regular tint?",
    a: "Regular dyed tint makes the windows dark. It still lets heat through, and it can turn purple. Ceramic cuts infrared heat and UV, and it doesn’t mess with your radio, GPS, or fob.",
  },
  {
    q: "Can you do 5% on the front windows?",
    a: "Not on the fronts. Texas requires at least 25% light through those windows. We can go dark in the back.",
  },
  {
    q: "Where are you?",
    a: `Based in ${site.city}. Book a time online.`,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              {item.q}
              <span className="text-sky-400">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? (
              <p className="px-5 pb-4 text-sm leading-6 text-white/65">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
