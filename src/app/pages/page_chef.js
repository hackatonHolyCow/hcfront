import { Box } from "@mui/material"; // Importar Box para el estilo
import Order from "../components/Order";

export default function ChefPage() {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}> {/* Establecer estilo de fondo */}
      <Order /> {/* Renderizar el componente Order directamente */}
    </Box>
  );
}