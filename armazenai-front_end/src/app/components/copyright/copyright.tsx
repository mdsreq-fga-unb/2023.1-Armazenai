import { Typography } from "@mui/material";
import Link from "next/link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/mdsreq-fga-unb/2023.1-Armazenai"
      >
        Armazenai
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Copyright;
