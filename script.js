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

const res = await fetch("/send-telegram.js", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: pesan })
});

let data;
try {
  data = await res.json();
} catch (err) {
  alert("❌ Server tidak membalas JSON.");
  return;
}

if (data.success) {
  alert("✅ Pesanan berhasil dikirim!");
} else {
  alert("❌ Gagal: " + (data.error || "Tidak diketahui"));
}

// Attach event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // This part ensures the correct form submission handler is attached
  // It's crucial for the form pages (form_jasteb.html and form_biasa.html)
  // The sendToTelegram function is now called directly from the form's submit event listener
  // defined within each form's HTML file.
});
