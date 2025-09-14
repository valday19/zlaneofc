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
  const formBiasa = document.getElementById("formBiasa");
  if (formBiasa) {
    formBiasa.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(formBiasa);

      const payload = {
        produk: localStorage.getItem("currentProduct") || "Produk Biasa",
        nama: formData.get("nama"),
        wa: formData.get("wa"),
        catatan: formData.get("catatan")
      };

      try {
        const res = await fetch("/api/send-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (data.success) {
          alert("✅ Pesanan berhasil dikirim ke admin!");
        } else {
          alert("❌ Gagal: " + JSON.stringify(data.error));
        }
      } catch (err) {
        alert("❌ Error: " + err.message);
      }
    });
  }

  // Form Jasteb
  const formJasteb = document.getElementById("formJasteb");
  if (formJasteb) {
    formJasteb.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(formJasteb);

      const payload = {
        produk: localStorage.getItem("currentProduct") || "Produk JASTEB",
        nama: formData.get("nama"),
        wa: formData.get("wa"),
        gmail: formData.get("gmail"), // form jasteb ada tambahan Gmail
        catatan: formData.get("catatan")
      };

      try {
        const res = await fetch("/api/send-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (data.success) {
          alert("✅ Pesanan JASTEB berhasil dikirim ke admin!");
        } else {
          alert("❌ Gagal: " + JSON.stringify(data.error));
        }
      } catch (err) {
        alert("❌ Error: " + err.message);
      }
    });
  }
});
        
document.addEventListener('DOMContentLoaded', () => {
  // kosong, biarkan logika form ditangani langsung di file HTML form
});
