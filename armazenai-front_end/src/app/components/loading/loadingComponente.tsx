import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingComponente() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
      <CircularProgress />
    </Box>
  );
}
