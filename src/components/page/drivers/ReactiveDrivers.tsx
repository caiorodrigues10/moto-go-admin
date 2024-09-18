import { useToast } from "@/context/ToastContext";
import { reactiveDriver } from "@/services/drivers/client";
import { IDriver } from "@/services/drivers/types";
import { reactiveUserAdmin } from "@/services/usersAdmin/client";
import { useRevalidatePath } from "@/utils/revalidate";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";

export default function ReactiveDriver({
  children,
  driver,
}: {
  children: ReactNode;
  driver: IDriver;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addToast, removeToast } = useToast();
  const { push } = useRouter();
  const { refresh } = useRevalidatePath("adminUsers");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    onOpen();
  };

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const response = await reactiveDriver(driver.id);

    if (response?.result === "success") {
      addToast({
        type: "success",
        message:
          response?.message ||
          "Serviço indisponível tente novamente mais tarde",
        onClose: removeToast,
      });
      refresh();
      onClose();
    } else {
      addToast({
        type: "error",
        message:
          response?.message ||
          "Serviço indisponível tente novamente mais tarde",
        onClose: removeToast,
      });
    }
    setIsLoading(false);
  }, [addToast, push, removeToast, driver, refresh, onClose]);

  return (
    <>
      <button onClick={handleOpen}>{children}</button>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Reativar - {driver?.name}
          </ModalHeader>
          <ModalBody>
            <p>Deseja realmente reativar este motorista?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Fechar
            </Button>
            <Button color="success" onPress={onSubmit} isLoading={isLoading}>
              Reativar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
