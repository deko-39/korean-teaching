import { NextResponse } from "next/server";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  className: string;
  message: string;
};

const isValidPayload = (value: unknown): value is BookingPayload => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return ["name", "email", "phone", "className", "message"].every(
    (key) => typeof candidate[key] === "string",
  );
};

export async function POST(request: Request) {
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!sheetsWebhookUrl) {
    return NextResponse.json(
      {
        error:
          "Biểu mẫu chưa được cấu hình hoàn chỉnh. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email/Facebook.",
      },
      { status: 500 },
    );
  }

  const payload = await request.json().catch(() => null);

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      { error: "Dữ liệu biểu mẫu không hợp lệ" },
      { status: 400 },
    );
  }

  const normalizedPayload = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    className: payload.className.trim(),
    message: payload.message.trim(),
    submittedAt: new Date().toISOString(),
  };

  if (
    !normalizedPayload.name ||
    !normalizedPayload.email ||
    !normalizedPayload.phone ||
    !normalizedPayload.className
  ) {
    return NextResponse.json(
      {
        error:
          "Vui lòng điền đầy đủ họ tên, số điện thoại, email và lớp mong muốn",
      },
      { status: 400 },
    );
  }

  const response = await fetch(sheetsWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalizedPayload),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json(
      {
        error:
          "Không thể gửi yêu cầu đến Google Sheets lúc này. Vui lòng thử lại sau.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
