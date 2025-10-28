document.addEventListener("DOMContentLoaded", () => {
  let janjangCount = 0;

  const tambahBtn = document.getElementById("tambahBtn");
  const kurangiBtn = document.getElementById("kurangiBtn");
  const janjangDisplay = document.getElementById("janjangMatang");
  const hitungAkp = document.getElementById("hitungAkp");
  const hasilBox = document.getElementById("hasil");
  const simpanBtn = document.getElementById("simpanRekapan");

  function updateDisplay() {
    janjangDisplay.textContent = janjangCount;
  }

  tambahBtn.addEventListener("click", () => {
    janjangCount++;
    updateDisplay();
  });

  kurangiBtn.addEventListener("click", () => {
    if (janjangCount > 0) janjangCount--;
    updateDisplay();
  });

  hitungAkp.addEventListener("click", () => {
    const blok = document.getElementById("blokName").value.trim() || "-";
    const totalPokok = parseFloat(document.getElementById("totalPokok").value);
    const sampel = parseFloat(document.getElementById("pokokSensus").value);
    const bjr = parseFloat(document.getElementById("bjr").value);
    const manual = parseFloat(document.getElementById("manualJanjang").value);
    const basisPanen = parseFloat(document.getElementById("basisPanen").value);
    const kapasitasTruk = parseFloat(
      document.getElementById("kapasitasTruk").value
    );

    const janjang = !isNaN(manual) && manual > 0 ? manual : janjangCount;

    if (!totalPokok || !sampel || !bjr || !basisPanen || !kapasitasTruk) {
      alert("Isi semua data terlebih dahulu!");
      return;
    }

    // ✅ Rumus AKP
    const akp = (janjang / sampel) * 100;
    const totalJanjang = (akp / 100) * totalPokok;
    const produksiKg = totalJanjang * bjr;
    const produksiTon = produksiKg / 1000;
    const tenagaKerja = totalJanjang / basisPanen;
    const jumlahTruk = produksiTon / kapasitasTruk;

    // Tombol Simpan
    const tanggal = new Date().toLocaleDateString("id-ID");
    window.hasilAKP = {
      tanggal,
      blok,
      luas: "-",
      akp: akp.toFixed(2),
      janjang: Math.round(totalJanjang),
      tonase: produksiTon,
      tenaga: Math.ceil(tenagaKerja),
      truk: Math.ceil(jumlahTruk),
    };

    // Tampilkan hasil
    hasilBox.innerHTML = `
      <p>📅 <b>Tanggal:</b> ${tanggal}</p>
      <p>🌴 <b>Blok:</b> ${blok}</p>
      <p>📊 <b>AKP:</b> ${akp.toFixed(2)}%</p>
      <p>🥥 <b>Total Janjang (Blok):</b> ${Math.round(
        totalJanjang
      ).toLocaleString("id-ID")}</p>
      <p>⚖️ <b>Estimasi Produksi:</b> ${produksiTon.toLocaleString(
        "id-ID"
      )} ton</p>
      <p>🚛 <b>Estimasi Truk:</b> ${Math.ceil(jumlahTruk)} unit</p>
      <p>👷‍♂️ <b>Estimasi Tenaga Kerja:</b> ${Math.ceil(tenagaKerja)} orang</p>
    `;
  });

  // ✅ Tombol simpan ke rekapan
  simpanBtn.addEventListener("click", () => {
    if (!window.hasilAKP) {
      alert("Hitung dulu datanya sebelum disimpan!");
      return;
    }

    const data = window.hasilAKP;
    const rekap = JSON.parse(localStorage.getItem("akpRekap") || "[]");
    rekap.push(data);
    localStorage.setItem("akpRekap", JSON.stringify(rekap));

    alert("✅ Data berhasil disimpan ke Rekapan!");
  });
});
