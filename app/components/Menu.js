"use client"; // Asegúrate de que el componente sea un Client Component
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MPCheckout } from "./MpCard";

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/items/");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: 4,
          marginBottom: 4,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Our Menu
      </Typography>

      {/* Contenedor con scroll y diseño */}
      <Box
        sx={{
          maxHeight: 600, // Aumentamos la altura máxima a 600px
          overflowY: "auto", // Habilita el scroll vertical
          padding: 3,
          margin: "0 auto",
          width: "90%", // Ajustamos el ancho al 90%
          borderRadius: 8, // Bordes redondeados
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
        }}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <FoodItem item={item} key={item.id} /> // Muestra cada ítem
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Cargando el menú...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const FoodItem = ({ item }) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        borderRadius: 5,
        margin: 3, // Mayor espaciado entre las tarjetas
        minWidth: 300, // Un poco más ancha
        backgroundColor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra más definida
        transition: "transform 0.2s ease-in-out", // Animación al pasar el mouse
        "&:hover": {
          transform: "scale(1.02)", // Efecto zoom al pasar el mouse
        },
      }}
      key={item.id}
    >
      <Grid container alignItems="flex-start">
        <Grid size={{ md: 4, xs:12 }} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            image={item.picture || "https://via.placeholder.com/200"} // Imagen por defecto
            height={140} // Imagen más grande
            width={140}
            sx={{ borderRadius: 6 ,
              width: "140px",
              objectFit: 'cover', // Use 'contain' if you want to show the entire image

            }}
          />
        </Grid>
        <Grid size={{ md: 6, xs:12 }}  sx={{marginLeft: "15px", justifyContent: "start"}}>
          <Typography
            component={"div"}
            variant="h5"
            sx={{ height: '50px', display: 'flex', alignItems: 'center' }} 
          >
            {item.name}
          </Typography>

          <Typography
            component={"div"}
            variant="h6"
            sx={{ height: '50px', display: 'flex', alignItems: 'center' }} 
          >
            ${item.price}
          </Typography>

          <Typography
            component={"div"}
            variant="body1"
            sx={{ height: '50px', display: 'flex', alignItems: 'center' }} 
          >
            {item.description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Menu;
