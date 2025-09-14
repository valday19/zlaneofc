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
  // Fungsi umum untuk handle form
  async function handleSubmit(form, type = "biasa") {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append(
        "produk",
        localStorage.getItem("currentProduct") || (type === "jasteb" ? "Produk JASTEB" : "Produk Biasa")
      );

      try {
        const res = await fetch("/api/send-telegram", {
          method: "POST",
          body: formData, // kirim langsung FormData (ada teks + file)
        });

        const data = await res.json();
        if (data.success) {
          if (type === "biasa") {
            if (confirm("✅ Pesanan *Biasa* berhasil dikirim ke admin!\nKlik OK untuk join grup WhatsApp.")) {
              window.location.href = "https://chat.whatsapp.com/xxxxBiasa"; // ganti dengan link grup Biasa
            }
          } else if (type === "jasteb") {
            if (confirm("✅ Pesanan *JASTEB* berhasil dikirim ke admin!\nKlik OK untuk join grup WhatsApp.")) {
              window.location.href = "https://chat.whatsapp.com/yyyyJasteb"; // ganti dengan link grup JASTEB
            }
          }
          form.reset(); // reset form setelah sukses
        } else {
          if (type === "biasa") {
            alert("❌ Gagal mengirim Pesanan Biasa: " + JSON.stringify(data.error));
          } else if (type === "jasteb") {
            alert("❌ Gagal mengirim Pesanan JASTEB: " + JSON.stringify(data.error));
          }
        }
      } catch (err) {
        if (type === "biasa") {
          alert("❌ Error Pesanan Biasa: " + err.message);
        } else if (type === "jasteb") {
          alert("❌ Error Pesanan JASTEB: " + err.message);
        }
      }
    });
  }

  // Form Biasa
  const formBiasa = document.getElementById("formBiasa");
  if (formBiasa) handleSubmit(formBiasa, "biasa");

  // Form Jasteb
  const formJasteb = document.getElementById("formJasteb");
  if (formJasteb) handleSubmit(formJasteb, "jasteb");
});
        
document.addEventListener('DOMContentLoaded', () => {
  // kosong, biarkan logika form ditangani langsung di file HTML form
});
