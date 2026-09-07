"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const faqs = [
  {
    q: `What do I get for $${site.offerPrice}?`,
    a: `Four doors and the back window in ceramic film. Windshield, sun strip, sunroof, and peeling old tint are extra. You don't pay anything to book.`,
  },
  {
    q: "How long does it take?",
    a: "Most cars are about two hours. SUVs and extra glass run longer. We'll text you a time once we confirm the schedule.",
  },
  {
    q: "What's the difference between ceramic and regular tint?",
    a: "Regular dyed tint makes the windows dark. It still lets a lot of heat through, and it can turn purple. Ceramic cuts infrared heat and UV, and it doesn't have metal in it, so your radio, GPS, and key fob keep working.",
  },
  {
    q: "Do I need a credit card to book?",
    a: "No. Pick a day and time, we'll confirm, and you pay when the car is done.",
  },
  {
    q: "Can you do 5% on the front windows?",
    a: "Not on this job. Texas says the front sides have to let at least 25% of light through (film plus the factory glass). We can go dark in the back.",
  },
  {
    q: "Where are you?",
    a: `Based in ${site.city}. We cover the metro and nearby suburbs.`,
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
