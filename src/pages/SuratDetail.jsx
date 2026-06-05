import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function SuratDetail() {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  useEffect(() => {
    api.get(`/surat/${id}`).then((res) => setSurat(res.data));
  }, [id]);

  if (!surat) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/surat" className="text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Detail Surat</h1>
        </div>
        {(role === "admin" || role === "pimpinan") && surat.status !== "completed" && (
          <Link
            to={`/disposisi/buat/${surat.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Buat Disposisi
          </Link>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold">Nomor Surat</dt>
            <dd>{surat.nomorSurat}</dd>
          </div>
          <div>
            <dt className="font-semibold">Jenis</dt>
            <dd className="capitalize">{surat.jenis}</dd>
          </div>
          <div>
            <dt className="font-semibold">Pengirim/Tujuan</dt>
            <dd>{surat.pengirimTujuan}</dd>
          </div>
          <div>
            <dt className="font-semibold">Tanggal Surat</dt>
            <dd>{new Date(surat.tanggalSurat).toLocaleDateString()}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold">Perihal</dt>
            <dd>{surat.perihal}</dd>
          </div>
          <div>
            <dt className="font-semibold">Status</dt>
            <dd>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  surat.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {surat.status}
              </span>
            </dd>
          </div>
          {surat.fileUrl && (
            <div>
              <dt className="font-semibold">File</dt>
              <dd>
                <a
                  href={surat.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 flex items-center gap-1"
                >
                  <DocumentTextIcon className="w-4 h-4" /> Lihat file
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {surat.disposisi && surat.disposisi.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Riwayat Disposisi</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Dari</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Kepada</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Instruksi</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Batas Waktu</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {surat.disposisi.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{d.dariUser?.nama || "Admin/Pimpinan"}</td>
                    <td className="px-4 py-3 text-sm">{d.kepadaUser?.nama}</td>
                    <td className="px-4 py-3 text-sm">{d.instruksi}</td>
                    <td className="px-4 py-3 text-sm">{new Date(d.batasWaktu).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          d.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {d.status === "completed" ? "Selesai" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
