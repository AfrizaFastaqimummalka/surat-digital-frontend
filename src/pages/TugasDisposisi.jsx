import React, { useEffect, useState } from "react";
import api from "../services/api";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function TugasDisposisi() {
  const [tugas, setTugas] = useState([]);

  useEffect(() => {
    api.get("/disposisi/tugas").then((res) => setTugas(res.data));
  }, []);

  const selesaikan = async (id) => {
    try {
      await api.put(`/disposisi/${id}/selesai`);
      setTugas(tugas.map((t) => (t.id === id ? { ...t, status: "completed" } : t)));
    } catch (err) {
      console.error(err);
      alert("Gagal menyelesaikan disposisi");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tugas Disposisi</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Surat</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Instruksi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Batas Waktu</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tugas.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.surat?.nomorSurat}</td>
                  <td className="px-6 py-4 text-sm text-gray-950">{t.instruksi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(t.batasWaktu).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {t.status === "completed" ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Selesai
                      </span>
                    ) : (
                      <button
                        onClick={() => selesaikan(t.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 flex items-center gap-1 mx-auto text-xs font-semibold"
                      >
                        <CheckCircleIcon className="w-4 h-4" /> Selesai
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
