import { Input, InputProps } from "@nextui-org/react";

export function TextInput({ ...rest }: InputProps) {
  const styles = {
    label: "!text-white text-sm",
    input: [
      "!bg-transparent",
      "!text-white/90 text-sm",
      "placeholder:text-zinc-500 dark:placeholder:text-white/60",
    ],
    inputWrapper: [
      "shadow-xl",
      "!bg-transparent",
      "border-2",
      "border-[#606369]",
      "!cursor-text",
      "group-data-[focus=true]:!bg-transparent group-data-[hover=true]:!bg-transparent",
    ],
    clearButton: "text-red-400",
  };

  return <Input classNames={{ ...styles }} {...rest} />;
}
