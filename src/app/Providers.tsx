import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastProvider } from "@/context/ToastContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ToastProvider>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </ToastProvider>
  );
}
