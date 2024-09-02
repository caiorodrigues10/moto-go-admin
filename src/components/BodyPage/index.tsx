import { PropsWithChildren } from "react";
import { NavBar } from "../NavBar";

export function BodyPage({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-full h-full">
      <NavBar />
      <div className="w-full h-full flex justify-center mt-12">{children}</div>
    </div>
  );
}
