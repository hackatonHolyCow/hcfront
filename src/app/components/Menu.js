"use client"; // Asegúrate de que el componente sea un Client Component

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

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
        console.log("Respuesta del servidor:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          marginTop: 4,
          marginBottom: 4,
          fontWeight: "bold",
          fontSize: "2.5rem",
          color: "#333",
        }}
      >
        Nuestro Menú
      </Typography>

      {/* Contenedor con scroll y diseño */}
      <Box
        sx={{
          maxHeight: 600, // Aumentamos la altura máxima a 600px
          overflowY: "auto", // Habilita el scroll vertical
          padding: 3,
          margin: "0 auto",
          width: "90%", // Ajustamos el ancho al 90%
          backgroundColor: "#f7f7f7",
          borderRadius: 8, // Bordes redondeados
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
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
    </>
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
        maxHeight:"100vh",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra más definida
        transition: "transform 0.2s ease-in-out", // Animación al pasar el mouse
        "&:hover": {
          transform: "scale(1.02)", // Efecto zoom al pasar el mouse
        },
      }}
      key={item.id}
    >
      <Grid container>
        <Grid
          size={{ md: 5, xs: 16 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={item.picture || "https://via.placeholder.com/200"} // Imagen por defecto
            height={180} // Imagen más grande
            width={180}
            sx={{ borderRadius: 6 }}
          />
        </Grid>
        <Grid size={{ md: 4 }}>
          <Typography
            component={"div"}
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
          >
            {item.name}
          </Typography>
          <Typography
            component={"div"}
            variant="h5"
            sx={{ textAlign: "center", marginTop: 2, color: "#666" }}
          >
            ${item.price}
          </Typography>
        </Grid>
        <Grid
          size={{ md: 3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography
            component={"div"}
            variant="body1"
            sx={{ textAlign: "center", color: "#777" }}
          >
            {item.description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Menu;
