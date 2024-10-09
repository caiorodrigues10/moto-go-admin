import { useToast } from "@/context/ToastContext";
import { IUser } from "@/services/users/types";
import { inactiveUserAdmin } from "@/services/usersAdmin/client";
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
import { ReactNode, useCallback, useState } from "react";

export default function BlockUser({
  children,
  user,
}: {
  children: ReactNode;
  user: IUser;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addToast, removeToast } = useToast();
  const { refresh } = useRevalidatePath("users");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    onOpen();
  };

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const response = await inactiveUserAdmin(user.id);

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
  }, [addToast, removeToast, user, refresh, onClose]);

  return (
    <>
      <button onClick={handleOpen}>{children}</button>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Bloquear - {user.name}
          </ModalHeader>
          <ModalBody>
            <p>Deseja realmente bloquear este usuário?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Fechar
            </Button>
            <Button color="danger" onPress={onSubmit} isLoading={isLoading}>
              Bloquear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
