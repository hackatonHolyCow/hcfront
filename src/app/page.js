import { Grid2 } from "@mui/material";
import Menu from "./components/Menu";
import Chat from "./components/Chat";
import Cart from "./components/Cart";

export default function Home() {
  return (
    <Grid2 container>
      <Grid2 size={6}>
        <Chat />
        <Cart />
      </Grid2>
      <Grid2
        size={{ xs: 10, md: 6 }}
        sx={{ backgroundColor: "#e8eaf6", height: "100vh" }}
      >
        <Menu />
      </Grid2>
    </Grid2>
  );
}
