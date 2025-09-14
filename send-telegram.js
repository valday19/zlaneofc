// api/send-telegram.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN; // isi di Vercel Environment
  const CHAT_ID = process.env.CHAT_ID;     // isi di Vercel Environment

  try {
    const { textMessage } = req.body;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: textMessage,
        parse_mode: "Markdown"
      })
    });

    const data = await response.json();
    if (!data.ok) {
      return res.status(500).json({ error: "Telegram API error", detail: data });
    }

    res.status(200).json({ success: true, result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
