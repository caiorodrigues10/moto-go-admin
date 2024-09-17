import { ClientOnly } from "@/components/ClientOnly";
import { FormCreateDriver } from "@/components/page/drivers/FormCreateDriver";

export default function NewDriverPage() {
  return (
    <ClientOnly>
      <FormCreateDriver />
    </ClientOnly>
  );
}
