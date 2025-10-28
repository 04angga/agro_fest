(() => {
  const tbody = document.getElementById("rekapBody");
  const clearBtn = document.getElementById("clearAllBtn");

  function loadRekap() {
    const data = JSON.parse(localStorage.getItem("akpRekap") || "[]");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">Belum ada data tersimpan.</td></tr>`;
      return;
    }

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.tanggal || "-"}</td>
        <td>${item.blok || "-"}</td>
        <td>${item.akp || "0"}%</td>
        <td>${item.janjang || 0}</td>
        <td>${Number(item.tonase).toLocaleString("id-ID")} ton</td>
        <td>${item.tenaga || 0}</td>
        <td>${item.truk || 0}</td>
      `;
      tbody.appendChild(row);
    });
  }

  clearBtn.addEventListener("click", () => {
    if (confirm("Hapus semua rekapan?")) {
      localStorage.removeItem("akpRekap");
      loadRekap();
    }
  });

  loadRekap();
})();
