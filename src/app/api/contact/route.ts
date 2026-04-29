import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── SMTP transporter ────────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Email templates ─────────────────────────────────────────────────────────

function managerEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
  timestamp: string;
}) {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Нова заявка — Military Auto</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7CB518,#A4D620);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:12px;letter-spacing:3px;text-transform:uppercase;">Military Auto</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">🚗 Нова заявка!</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#1a1a1a;padding:32px;border-radius:0 0 12px 12px;">

            <p style="margin:0 0 24px;color:#A0A0A0;font-size:14px;">
              Нова заявка від <strong style="color:#ffffff;">${data.name}</strong> — отримано ${data.timestamp}.
            </p>

            <!-- Data rows -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("👤 Ім'я", data.name)}
              ${row("📞 Телефон", `<a href="tel:${data.phone}" style="color:#A4D620;text-decoration:none;">${data.phone}</a>`)}
              ${row("📧 Email", `<a href="mailto:${data.email}" style="color:#A4D620;text-decoration:none;">${data.email}</a>`)}
              ${data.message ? row("💬 Повідомлення", data.message) : ""}
            </table>

            <!-- CTA -->
            <div style="margin-top:28px;text-align:center;">
              <a href="tel:${data.phone}"
                style="display:inline-block;background:linear-gradient(135deg,#7CB518,#A4D620);color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:100px;">
                Зателефонувати клієнту
              </a>
            </div>

            <p style="margin:28px 0 0;color:#444;font-size:12px;text-align:center;">
              Military Auto · <a href="https://militaryauto.net" style="color:#555;text-decoration:none;">militaryauto.net</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;vertical-align:top;">
      <p style="margin:0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${label}</p>
      <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:500;">${value}</p>
    </td>
  </tr>`;
}

function clientEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Заявку прийнято — Military Auto</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7CB518,#A4D620);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:12px;letter-spacing:3px;text-transform:uppercase;">Military Auto</p>
            <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:700;">Заявку прийнято ✓</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#1a1a1a;padding:36px 32px;border-radius:0 0 12px 12px;">

            <p style="margin:0 0 16px;color:#ffffff;font-size:16px;font-weight:600;">
              Вітаємо, ${name}!
            </p>
            <p style="margin:0 0 24px;color:#A0A0A0;font-size:14px;line-height:1.7;">
              Ми отримали вашу заявку і зв'яжемося з вами <strong style="color:#A4D620;">протягом 30 хвилин</strong> у робочий час&nbsp;(Пн–Сб, 9:00–20:00).
            </p>

            <!-- Steps -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              ${step("01", "Консультація", "Відповімо на всі ваші питання щодо пригону авто зі США")}
              ${step("02", "Підбір авто", "Знайдемо оптимальний варіант на аукціонах Copart та IAAI")}
              ${step("03", "Доставка", "Організуємо логістику та розмитнення під ключ")}
            </table>

            <p style="margin:0 0 8px;color:#555;font-size:13px;">Маєте термінове питання?</p>
            <div style="text-align:left;">
              <a href="https://militaryauto.net/#контакти"
                style="display:inline-block;background:linear-gradient(135deg,#7CB518,#A4D620);color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:100px;">
                Зв'язатися з нами
              </a>
            </div>

            <p style="margin:28px 0 0;color:#444;font-size:12px;">
              Military Auto · <a href="https://militaryauto.net" style="color:#555;text-decoration:none;">militaryauto.net</a><br/>
              <span style="color:#333;">Цей лист надіслано автоматично — відповідати на нього не потрібно.</span>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function step(num: string, title: string, desc: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;padding-right:14px;">
            <div style="width:28px;height:28px;background:linear-gradient(135deg,#7CB518,#A4D620);border-radius:50%;text-align:center;line-height:28px;font-size:11px;font-weight:700;color:#fff;">${num}</div>
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;line-height:28px;">${title}</p>
            <p style="margin:2px 0 0;color:#666;font-size:13px;line-height:1.5;">${desc}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body as {
      name: string;
      phone: string;
      email: string;
      message?: string;
    };

    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Ім'я, телефон та email обов'язкові" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const transporter = createTransporter();
    const FROM = `"Military Auto" <${process.env.SMTP_USER}>`;
    const MANAGER = process.env.SMTP_USER!;

    await Promise.all([
      // 1. Notification to manager
      transporter.sendMail({
        from: FROM,
        to: MANAGER,
        subject: `🚗 Нова заявка від ${name}`,
        html: managerEmailHtml({ name, phone, email, message: message ?? "", timestamp }),
      }),

      // 2. Confirmation to client
      transporter.sendMail({
        from: FROM,
        to: email,
        subject: "Military Auto — Вашу заявку прийнято",
        html: clientEmailHtml(name),
      }),
    ]);

    console.log(`✓ Emails sent for: ${name} <${email}> ${phone}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
