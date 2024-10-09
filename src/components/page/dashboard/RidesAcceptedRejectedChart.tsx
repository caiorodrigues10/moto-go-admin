"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RidesAcceptedRejectedChart = ({ data }: { data: IDashboardResponse }) => {
  const chartData = {
    labels: data.graphs.map((g) => g.month),
    datasets: [
      {
        label: "Corridas Aceitas",
        data: data.graphs.map((g) => g.quantity.ride.accepted),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Corridas Recusadas",
        data: data.graphs.map((g) => g.quantity.ride.rejected),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: false,
        text: "Corridas Aceitas vs Recusadas",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      y: {
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
        <h2 className="text-xl font-bold">Corridas Aceitas vs Recusadas</h2>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        <ClientOnly
          fallback={
            <div className="w-full h-full bg-[#3b4b61] animate-pulse rounded-lg" />
          }
        >
          <Bar data={chartData} options={options} />
        </ClientOnly>
      </CardBody>
    </Card>
  );
};

export default RidesAcceptedRejectedChart;
