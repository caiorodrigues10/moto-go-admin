import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
