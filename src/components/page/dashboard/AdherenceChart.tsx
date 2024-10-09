"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ClientOnly } from "@/components/ClientOnly";

ChartJS.register(ArcElement, Tooltip, Legend);

export function AdherenceChart({ adherence }: { adherence: number }) {
  const chartData = {
    labels: ["Aderência", "Faltante"],
    datasets: [
      {
        label: "Aderência",
        data: [adherence, 100 - adherence],
        backgroundColor: [
          "rgba(255, 247, 99, 0.6)",
          "rgba(125, 125, 125, 0.6)",
        ],
        borderColor: ["rgba(255, 247, 99, 1)", "#959595"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      title: {
        display: false,
        text: "Aderência (%)",
      },
    },
  };

  return (
    <Card className="col-span-6 h-[340px] p-4 bg-[#2B3544]">
      <CardHeader className="w-full justify-center">
        <h2 className="text-xl font-bold">Aderência (%)</h2>
      </CardHeader>
      <CardBody className="flex justify-center items-center overflow-hidden">
        <ClientOnly
          fallback={
            <div className="w-full h-[285px] bg-[#3b4b61] animate-pulse rounded-lg" />
          }
        >
          <Doughnut data={chartData} options={options} />
        </ClientOnly>
      </CardBody>
    </Card>
  );
}
