"use client";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Backdrop,
  Badge,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import UsuarioFormAtualizacao, {
  Usuario,
} from "../components/formulario/usuarioFormAtualizacao";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PerfilInfo({
  usuario,
  setUsuario,
}: {
  usuario: Usuario;
  setUsuario: Dispatch<SetStateAction<Usuario | null>>;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container sx={{ textAlign: "center" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Button onClick={() => setOpenModal(true)}>
            <EditIcon color="action" />
          </Button>
        }
      >
        <Avatar
          alt="Imagem de perfil"
          src="/static/images/avatar/2.jpg"
          sx={{ width: 56, height: 56 }}
        />
      </Badge>
      <Typography variant="h6">{usuario.nome}</Typography>
      <Grid container justifyContent="center" mt={3}>
        <Grid
          item
          xs={6}
          sm={6}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <Typography variant="h5" mr={1}>
            Telefone:
          </Typography>
          <Typography variant="h6">{usuario.telefone}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <Typography variant="h5" mr={1}>
            CPF:
          </Typography>
          <Typography variant="h6">{usuario.cpf}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}></Grid>
      </Grid>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
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
            <Paper sx={style}>
              <UsuarioFormAtualizacao
                usuario={usuario}
                setUsuario={setUsuario}
              />
            </Paper>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
}
