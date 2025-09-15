function startOrder(product) {
  localStorage.setItem('currentProduct', product);
  window.location.href = 'payment.html';
}

function goToForm() {
  const fileInput = document.getElementById("buktiPembayaran");
  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Silakan upload bukti transfer terlebih dahulu!");
    return;
  }

  const currentProduct = localStorage.getItem('currentProduct');
  const isJasteb = currentProduct.toLowerCase().includes("jasteb vvip");

  if (isJasteb) {
    window.location.href = 'form_jasteb.html';
  } else {
    window.location.href = 'form_biasa.html';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Form Biasa
  document.getElementById("formBiasa").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("produk", "Produk Biasa");

    const res = await fetch("/api/send-telegram", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(data.success ? "✅ Pesanan Biasa + bukti berhasil dikirim!" : "❌ Gagal: " + data.error);
  });

  // Form Jasteb
  document.getElementById("formJasteb").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("produk", "Produk JASTEB");

    const res = await fetch("/api/send-telegram", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(data.success ? "✅ Pesanan JASTEB + bukti berhasil dikirim!" : "❌ Gagal: " + data.error);
  });
            
