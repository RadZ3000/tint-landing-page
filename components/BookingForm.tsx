"use client";

import { useMemo, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { MAKES, MODELS, YEARS } from "@/lib/vehicles";

const TIMES = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/30";

export function BookingForm() {
  const [make, setMake] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const models = useMemo(() => (make ? MODELS[make] ?? [] : []), [make]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("saving");
    setError("");
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      year: String(data.get("year") ?? ""),
      make: String(data.get("make") ?? ""),
      model: String(data.get("model") ?? ""),
      preferredDate: String(data.get("preferredDate") ?? ""),
      preferredTime: String(data.get("preferredTime") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("err");
        setError(json.error || "Could not send the request.");
        return;
      }
      setStatus("ok");
      form.reset();
      setMake("");
    } catch {
      setStatus("err");
      setError("That didn’t go through. Try again or call us.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-sky-400/30 bg-black/55 p-8 text-center backdrop-blur-md">
        <p className="text-sm font-semibold tracking-[0.2em] text-sky-400">
          You’re booked
        </p>
        <h3 className="mt-3 text-2xl font-bold text-white">
          We’ll text you to confirm.
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Sit tight. We’ll lock in the time.
        </p>
        <button
          type="button"
          className="mt-6 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white hover:bg-sky-400"
          onClick={() => setStatus("idle")}
        >
          Book another car
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-6"
    >
      <h3 className="text-center text-xl font-extrabold tracking-wide text-white sm:text-2xl">
        Book your install
      </h3>
      <p className="mt-1 text-center text-sm text-white/55">
        Ceramic sedan · ${site.offerPrice}
      </p>

      <div className="mt-5 space-y-3">
        <input
          required
          name="name"
          autoComplete="name"
          placeholder="Full name"
          className={fieldClass}
        />
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile phone"
          className={fieldClass}
        />
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={fieldClass}
        />
        <div className="grid grid-cols-3 gap-2">
          <select required name="year" defaultValue="" className={fieldClass}>
            <option value="">
              Year
            </option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            required
            name="make"
            value={make}
            className={fieldClass}
            onChange={(event) => setMake(event.target.value)}
          >
            <option value="">
              Make
            </option>
            {MAKES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            required
            name="model"
            defaultValue=""
            disabled={!make}
            className={fieldClass}
          >
            <option value="">
              Model
            </option>
            {models.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Preferred date
            </span>
            <input
              required
              name="preferredDate"
              type="date"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Preferred time
            </span>
            <select
              required
              name="preferredTime"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">
                Time
              </option>
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <textarea
          name="notes"
          rows={2}
          placeholder="Anything we should know?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {error ? (
        <p className="mt-3 text-center text-sm text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-5 w-full rounded-full bg-sky-500 py-3.5 text-base font-extrabold text-white shadow-[0_10px_40px_rgba(14,165,233,0.35)] transition hover:bg-sky-400 disabled:opacity-60"
      >
        {status === "saving" ? "Sending…" : "Book now"}
      </button>
      <p className="mt-3 text-center text-[11px] text-white/40">
        Most Houston shops charge closer to ${site.regularPrice} for ceramic.
      </p>
    </form>
  );
}
