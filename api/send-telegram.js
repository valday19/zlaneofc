export const config = {
  api: {
    bodyParser: false, // penting biar FormData bisa diproses
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "BOT_TOKEN / CHAT_ID belum diatur" });
    }

    // Ambil FormData dari request
    const formData = await req.formData();

    const produk = formData.get("produk");
    const nama = formData.get("nama");
    const wa = formData.get("wa");
    const gmail = formData.get("gmail");
    const catatan = formData.get("catatan");
    const bukti = formData.get("buktiPembayaran"); // file foto

    // Buat caption pesan
    let caption = `🛒 Pesanan Baru
📦 Produk: ${produk || "-"}
👤 Nama: ${nama || "-"}
📱 WA: ${wa || "-"}`;

    if (gmail) caption += `\n📧 Gmail: ${gmail}`;
    caption += `\n📝 Catatan: ${catatan || "-"}`;

    let tgRes;
    if (bukti) {
      // Kalau ada foto, kirim dengan sendPhoto
      const photoData = new FormData();
      photoData.append("chat_id", CHAT_ID);
      photoData.append("caption", caption);
      photoData.append("photo", bukti);

      tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: photoData,
      });
    } else {
      // Kalau tidak ada foto, kirim teks saja
      tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: caption,
          parse_mode: "Markdown",
        }),
      });
    }

    const data = await tgRes.json();
    if (!data.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
