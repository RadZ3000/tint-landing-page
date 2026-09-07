/**
 * Replace these placeholders before going live.
 * Stripe, SMS, and calendars are intentionally unwired.
 */
export const site = {
  name: "Ceramic Tint Texas",
  shortName: "Ceramic Tint",
  tagline: "Ceramic window tint",
  logoMark: "/brand/logo-mark.png",
  logoLockup: "/brand/logo-lockup.png",
  city: "Houston",
  region: "Texas",
  address: "YOUR ADDRESS, Houston TX 77000",
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  email: "bookings@example.com",
  instagramUrl: "https://instagram.com/YOUR_HANDLE",
  instagramHandle: "@YOUR_HANDLE",
  mapsUrl: "https://maps.google.com/?q=YOUR+ADDRESS",
  yearsInBusiness: "YOUR YEARS",
  carsTinted: "YOUR COUNT",
  /**
   * Floor that still leaves room after house ceramic film (~$45–60/car),
   * ~2 hours of installer time (~$180–230 after film), and a ~25%
   * origination cut that nets ~$50–80 once cheap local ads are paid.
   * The common $249 Houston promo does not survive that split.
   */
  offerPrice: 349,
  regularPrice: 499,
  minVehicleYear: 2016,
  serviceAreas: [
    "Energy Corridor",
    "Memorial",
    "Katy",
    "Cypress",
    "Spring",
    "The Woodlands",
    "Pearland",
    "Sugar Land",
    "Pasadena",
    "League City",
    "Baytown",
    "Missouri City",
  ],
  addOns: [
    {
      name: "Windshield",
      price: 199,
      blurb: "Most of the sun hits this glass. Worth it if the dash gets too hot to touch.",
    },
    {
      name: "Old tint removal",
      price: 95,
      blurb: "Bubbles, purple film, or a bad leftover job. We take it off before the new cut.",
    },
    {
      name: "Sun strip",
      price: 55,
      blurb: "A short dark band at the top of the windshield. Helps with overhead glare.",
    },
    {
      name: "Sunroof",
      price: 145,
      blurb: "Regular sunroofs. Big panoramic roofs need a quote.",
    },
  ],
  /**
   * STRIPE_PLACEHOLDER
   * When ready: set STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY in .env
   * and charge in app/api/book/route.ts (or a /api/checkout route).
   */
  stripe: {
    publishableKey: "pk_test_PLACEHOLDER",
    priceId: "price_PLACEHOLDER",
  },
} as const;

export const savings = site.regularPrice - site.offerPrice;
