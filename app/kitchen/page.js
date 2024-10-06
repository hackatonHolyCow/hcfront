import { AppBar, Box, Toolbar, Typography } from "@mui/material"; // Importar los componentes necesarios
import Order from "../components/Order";
import Image from "next/image"; // Asegúrate de importar el componente Image

export default function ChefPage() {
  return (
    <Box sx={{ padding: 0, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#FFF5E1" }}> {/* Cambiar el color de fondo a crema */}
        <Toolbar>
          <Image src="/static/logo.png" alt="Logo" width={100} height={50} />
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2, color: "black", fontWeight: "bold"  }}> {/* Cambiar el color del texto a negro */}
            Chef Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4 }}>
        <Order /> {/* Renderizar el componente Order directamente */}
      </Box>
    </Box>
  );
}
