import { ClientOnly } from "@/components/ClientOnly";
import { FormCreateUserAdmin } from "@/components/page/usersAdmin/FormCreateUserAdmin";

export default function NewAdminPage() {
  return (
    <ClientOnly>
      <FormCreateUserAdmin />
    </ClientOnly>
  );
}
