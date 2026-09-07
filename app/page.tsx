import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { site } from "@/lib/site";

const facts = [
  {
    value: "Less heat",
    body: "Ceramic film cuts infrared, which is the heat you feel through the glass. The AC has less work to do.",
  },
  {
    value: "Less fading",
    body: "It also blocks UV. That's what cooks the dash, fades the seats, and cracks the leather.",
  },
  {
    value: "Phones and fobs still work",
    body: "There's no metal in this film, so GPS, radio, and keyless entry keep working.",
  },
];

const reasons = [
  {
    title: "Cooler when you get back in",
    body: "Get in after work without burning your hands on the wheel.",
  },
  {
    title: "Holds glass together",
    body: "If a window breaks, the film helps keep the pieces in place.",
  },
  {
    title: "Dark in the back, legal up front",
    body: "Rear windows can go as dark as you want. Fronts stay at 25% or lighter, which is the Texas rule.",
  },
  {
    title: "No signal problems",
    body: "Cheap metalized tint can mess with antennas. This ceramic doesn't.",
  },
];

const strip = [
  "No deposit",
  "Ceramic film",
  "Legal front shades",
  `${site.city}`,
  "2016 and newer",
  "Pay at the shop",
];

const included = [
  "Four doors and the back window",
  "Ceramic IR film",
  "Legal shade on the front windows",
];

const heroImage =
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=2000&q=80";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-slate-950">
      <div className="bg-sky-700 px-4 py-2 text-center text-[12px] font-medium text-white">
        Ceramic sedan tint · ${site.offerPrice} · {site.city}
        <span className="mt-1 block text-sky-100/90 sm:mt-0 sm:ml-3 sm:inline">
          {site.address}
        </span>
      </div>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-md sm:px-8">
        <a href="#book" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-sky-500 text-[10px] font-black tracking-tight">
            IR
          </span>
          <span className="text-sm font-semibold sm:text-base">{site.name}</span>
        </a>
        <a
          href={site.phoneHref}
          className="rounded-md bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 sm:text-sm"
        >
          Call now
        </a>
      </header>

      <section
        className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-14"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.62) 0%, rgba(2,6,23,0.88) 58%, #020617 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              {site.city} ceramic tint
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Your car shouldn’t feel like an oven.{" "}
              <span className="text-sky-400">
                Ceramic tint, ${site.offerPrice}.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
              Four doors and the back window. Ceramic film, so it cuts heat and
              UV without messing with your radio. Book a time here. Pay when
              you pick the car up.
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-5xl font-bold text-white">
                ${site.offerPrice}
              </span>
              <span className="text-sm text-white/50">
                Same job is usually closer to ${site.regularPrice} around town.
                Rate is for {site.minVehicleYear} and newer sedans and
                crossovers.
              </span>
            </div>
            <div className="mt-8 max-w-md border-l-2 border-sky-400 bg-black/35 px-5 py-4">
              <p className="text-sm font-semibold text-white">
                Tell us when you want to come in.
              </p>
              <p className="mt-1 text-sm text-white/60">
                We’ll text to confirm. No deposit.
              </p>
            </div>
          </div>
          <div id="book" className="flex justify-center lg:justify-end">
            <BookingForm />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-black py-3">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {[...strip, ...strip].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              {item}
              <span className="text-sky-400">·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              Full sedan
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              What’s included
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Windshield, sunroof, and peeling old tint cost extra. Tell us in
              the notes if you need them.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="mt-6 inline-flex rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400"
            >
              Book ${site.offerPrice}
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Add-ons</h3>
            <p className="mt-1 text-sm text-white/50">
              Tell us in the notes if you want any of these.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {site.addOns.map((item) => (
                <article
                  key={item.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="shrink-0 text-sky-400">${item.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {item.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight">
            Why ceramic
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Dyed film just makes the glass darker. It still gets hot, and it
            can go purple in a few years. Ceramic is what you want in{" "}
            {site.city}.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {facts.map((fact) => (
              <article
                key={fact.value}
                className="border-t-2 border-sky-500 bg-white/[0.03] p-5"
              >
                <p className="font-semibold text-sky-300">{fact.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/65">{fact.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-white/10 p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Texas tint law</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Front windows have to let at least 25% of light through, counting
          the factory glass and the film. We don’t do 5% on the fronts. Rear
          windows can be as dark as you want.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <tbody>
              {[
                ["Windshield", "A strip at the top only, unless you have a medical exemption"],
                ["Front windows", "25% or lighter (film + factory tint)"],
                ["Rear side windows", "Any darkness"],
                ["Back window", "Any darkness"],
                ["Reflective film", "No more than 25% mirror"],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-white/10 last:border-0">
                  <th className="w-40 bg-white/[0.03] px-4 py-3 font-medium text-sky-300">
                    {label}
                  </th>
                  <td className="px-4 py-3 text-white/70">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">FAQ</h2>
        <Faq />
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-sky-700 px-6 py-12 text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Get on the schedule
          </h2>
          <p className="mt-3 max-w-xl text-sky-100">
            Takes a minute. No deposit. We’ll confirm by text.
          </p>
          <a
            href="#book"
            className="mt-6 inline-flex rounded-md bg-white px-8 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-50"
          >
            Book ${site.offerPrice}
          </a>
          <p className="mt-4 text-sm text-sky-100">
            or call{" "}
            <a href={site.phoneHref} className="font-semibold underline">
              {site.phone}
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="text-center text-lg font-semibold">
          Areas we cover
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {site.serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/70"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-white/40">
        <p>© {site.name}</p>
        <p className="mt-2">{site.address}</p>
      </footer>
    </div>
  );
}
