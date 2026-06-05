import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  DocumentTextIcon,
  InboxIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get("/dashboard").then((res) => setStats(res.data));
  }, []);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  let cards = [];
  if (role === "admin") {
    cards = [
      {
        name: "Total Surat",
        value: stats.totalSurat || 0,
        icon: DocumentTextIcon,
        color: "bg-blue-500",
      },
      {
        name: "Draft",
        value: stats.draft || 0,
        icon: InboxIcon,
        color: "bg-yellow-500",
      },
      {
        name: "Disposisi",
        value: stats.disposition || 0,
        icon: ClockIcon,
        color: "bg-orange-500",
      },
      {
        name: "Proses",
        value: stats.process || 0,
        icon: ClockIcon,
        color: "bg-purple-500",
      },
      {
        name: "Selesai",
        value: stats.completed || 0,
        icon: CheckCircleIcon,
        color: "bg-green-500",
      },
    ];
  } else if (role === "pimpinan") {
    cards = [
      {
        name: "Total Disposisi",
        value: stats.totalDisposisi || 0,
        icon: DocumentTextIcon,
        color: "bg-blue-500",
      },
      {
        name: "Selesai",
        value: stats.selesai || 0,
        icon: CheckCircleIcon,
        color: "bg-green-500",
      },
    ];
  } else if (role === "staff") {
    cards = [
      {
        name: "Tugas Belum Selesai",
        value: stats.tugasBelum || 0,
        icon: ClockIcon,
        color: "bg-yellow-500",
      },
      {
        name: "Tugas Selesai",
        value: stats.tugasSelesai || 0,
        icon: CheckCircleIcon,
        color: "bg-green-500",
      },
    ];
  }

  const colsCount = Math.min(cards.length, 5);
  const gridColsClass =
    colsCount === 1
      ? "lg:grid-cols-1"
      : colsCount === 2
      ? "lg:grid-cols-2"
      : colsCount === 3
      ? "lg:grid-cols-3"
      : colsCount === 4
      ? "lg:grid-cols-4"
      : "lg:grid-cols-5";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-4`}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className={`${card.color} p-4 flex justify-between items-center`}
            >
              <card.icon className="w-8 h-8 text-white" />
              <span className="text-white text-3xl font-bold">
                {card.value}
              </span>
            </div>
            <div className="p-3 text-center font-semibold text-gray-700">
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
