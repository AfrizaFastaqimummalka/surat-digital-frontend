import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Arsip() {
  const [surat, setSurat] = useState([]);
  useEffect(() => {
    api.get("/surat?status=completed").then((res) => setSurat(res.data));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Arsip Surat (Selesai)
      </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No. Surat</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenis</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengirim/Tujuan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Perihal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {surat.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.nomorSurat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-700">{s.jenis}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.pengirimTujuan}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.perihal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
