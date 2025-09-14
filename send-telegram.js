export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "Missing BOT_TOKEN or CHAT_ID" });
    }

    // Kirim ke Telegram
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      })
    });

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      return res.status(500).json({ error: "Telegram API error", details: errText });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
