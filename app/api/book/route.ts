import { NextResponse } from "next/server";

type BookingBody = {
  name?: string;
  phone?: string;
  email?: string;
  year?: string;
  make?: string;
  model?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  addOns?: string[];
};

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.phone?.trim() || !body.email?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  if (!body.year || !body.make || !body.model) {
    return NextResponse.json(
      { ok: false, error: "Year, make, and model are required." },
      { status: 400 },
    );
  }

  if (!body.preferredDate || !body.preferredTime) {
    return NextResponse.json(
      { ok: false, error: "Pick a preferred date and time." },
      { status: 400 },
    );
  }

  // STRIPE_PLACEHOLDER: no charge. Later, create a PaymentIntent here.
  // CALENDAR_PLACEHOLDER: later, write to Google Calendar / Cal.com / SMS.
  console.info("[booking placeholder]", {
    ...body,
    stripe: "not charged",
  });

  return NextResponse.json({
    ok: true,
    id: `bk_placeholder_${Date.now()}`,
    message: "Request received. No payment was taken.",
  });
}
