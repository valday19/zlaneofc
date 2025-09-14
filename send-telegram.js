export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "BOT_TOKEN / CHAT_ID belum diatur" });
    }

    // Kirim pesan ke Telegram
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      })
    });

    const result = await telegramRes.json();

    if (!telegramRes.ok) {
      return res.status(500).json({ error: "Gagal kirim ke Telegram", details: result });
    }

    // ✅ Selalu return JSON
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
