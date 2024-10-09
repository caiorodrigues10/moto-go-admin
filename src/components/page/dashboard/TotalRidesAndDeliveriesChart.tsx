"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { IDashboardResponse } from "@/services/dashboard/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ClientOnly } from "@/components/ClientOnly";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TotalRidesAndDeliveriesChart({
  data,
}: {
  data: IDashboardResponse;
}) {
  const chartData = {
    labels: data.graphs.map((g) => g.month),
    datasets: [
      {
        label: "Total de Corridas",
        data: data.graphs.map(
          (g) => g.quantity.ride.accepted + g.quantity.ride.rejected
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Total de Entregas",
        data: data.graphs.map(
          (g) => g.quantity.delivery.accepted + g.quantity.delivery.rejected
        ),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        text: "Total de Corridas e Entregas por Mês",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
  };

  return (
    <Card className="col-span-6 p-4 bg-[#2B3544]">
      <CardHeader className="w-full justify-center">
        <h2 className="text-xl font-bold">
          Total de Corridas e Entregas por Mês
        </h2>
      </CardHeader>
      <CardBody className="flex justify-center items-center p-4">
        <ClientOnly
          fallback={
            <div className="w-full h-[285px] bg-[#3b4b61] animate-pulse rounded-lg" />
          }
        >
          <Line data={chartData} options={options} />
        </ClientOnly>
      </CardBody>
    </Card>
  );
}
