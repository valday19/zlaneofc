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
  const formBiasa = document.getElementById("formBiasa");
  const formJasteb = document.getElementById("formJasteb");

  async function handleSubmit(form, isJasteb = false) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("produk", localStorage.getItem("currentProduct") || (isJasteb ? "Produk JASTEB" : "Produk Biasa"));

      try {
        const res = await fetch("https://zlaneofc.vercel.app/api/send-telegram", {
          method: "POST",
          body: formData, // langsung kirim FormData
        });

        const data = await res.json();
        if (data.success) {
          alert("✅ Pesanan berhasil dikirim ke admin via Telegram!");
        } else {
          alert("❌ Gagal: " + JSON.stringify(data.error));
        }
      } catch (err) {
        alert("❌ Error: " + err.message);
      }
    });
  }

  if (formBiasa) handleSubmit(formBiasa, false);
  if (formJasteb) handleSubmit(formJasteb, true);
});
            
