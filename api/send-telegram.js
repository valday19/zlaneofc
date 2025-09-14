export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { produk, nama, wa, gmail, catatan } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "BOT_TOKEN / CHAT_ID belum diatur" });
  }

  let textMessage = `🛒 Pesanan Baru
📦 Produk: ${produk}
👤 Nama: ${nama}
📱 WA: ${wa}`;

  // kalau form JASTEB ada Gmail, tambahkan
  if (gmail) {
    textMessage += `\n📧 Gmail: ${gmail}`;
  }

  textMessage += `\n📝 Catatan: ${catatan || "-"}`;

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: textMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await tgResponse.json();

    if (!data.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
