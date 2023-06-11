import { Backdrop, Fade, Modal, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type ModalFormProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({
  openModal,
  setOpenModal,
  children,
}: ModalFormProps) {
  return (
    <>
      <Modal
        aria-labelledby="Modal de formulário"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Paper sx={style}>{children}</Paper>
        </Fade>
      </Modal>
    </>
  );
}
