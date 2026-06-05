import React, { useState } from "react";
import api from "../services/api";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function LaporanExport() {
  const [loading, setLoading] = useState(false);
  const [periode, setPeriode] = useState({ start: "", end: "" });

  const exportPDF = async () => {
    if (!periode.start || !periode.end) {
      alert("Silakan pilih periode tanggal terlebih dahulu");
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(
        `/surat?startDate=${periode.start}&endDate=${periode.end}`
      );
      const suratList = res.data;

      if (!suratList || suratList.length === 0) {
        alert("Tidak ada data surat pada periode ini");
        return;
      }

      const doc = new jsPDF();

      // Title & Metadata
      doc.setFontSize(16);
      doc.text("LAPORAN DATA SURAT DIGITAL", 14, 20);
      doc.setFontSize(10);
      doc.text(`Periode: ${periode.start} s/d ${periode.end}`, 14, 28);
      doc.text(`Dicetak pada: ${new Date().toLocaleString("id-ID")}`, 14, 34);

      // Generate Table
      autoTable(doc, {
        startY: 40,
        head: [["No. Surat", "Jenis", "Pengirim/Tujuan", "Perihal", "Tanggal Surat", "Status"]],
        body: suratList.map((s) => [
          s.nomorSurat,
          s.jenis === "masuk" ? "Masuk" : "Keluar",
          s.pengirimTujuan,
          s.perihal,
          new Date(s.tanggalSurat).toLocaleDateString("id-ID"),
          s.status.toUpperCase(),
        ]),
        theme: "striped",
        headStyles: { fillColor: [30, 64, 175] },
        styles: { fontSize: 9, cellPadding: 3 },
      });

      doc.save(`laporan_surat_${periode.start}_to_${periode.end}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Gagal export PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Export Laporan PDF
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={periode.start}
              onChange={(e) =>
                setPeriode({ ...periode, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={periode.end}
              onChange={(e) => setPeriode({ ...periode, end: e.target.value })}
            />
          </div>
          <button
            onClick={exportPDF}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />{" "}
            {loading ? "Memproses..." : "Export PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
