"use client";
import { ClientOnly } from "@/components/ClientOnly";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";

const DriversRanking = ({
  data,
}: {
  data: { name: string; services: number }[];
}) => {
  return (
    <Card className="col-span-6 p-4 bg-[#2B3544]">
      <CardHeader className="w-full justify-center">
        <h2 className="text-xl font-bold">Top 5 Motoristas</h2>
      </CardHeader>
      <CardBody className="flex justify-center">
        <ClientOnly
          fallback={
            <div className="w-full h-full bg-[#3b4b61] animate-pulse rounded-lg" />
          }
        >
          <ul className="list-none">
            {data.map((driver, index) => (
              <li
                key={index}
                className="mb-3 flex justify-between items-center"
              >
                <h5
                  className={clsx("text-lg font-semibold text-zinc-300", {
                    "!text-2xl !text-[#FFE924]": index === 0,
                  })}
                >
                  {index + 1}º {driver.name}
                </h5>
                <span
                  className={clsx("font-semibold text-zinc-300", {
                    "!text-[#FFE924]": index === 0,
                  })}
                >
                  {driver.services} corridas
                </span>
              </li>
            ))}
          </ul>
        </ClientOnly>
      </CardBody>
    </Card>
  );
};

export default DriversRanking;
