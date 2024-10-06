"use client"; // Asegúrate de agregar esta línea al principio

import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Grid, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje del Snackbar

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/orders');
      const data = await response.json();

      console.log(data); // Mantén el log para verificar la estructura

      // Transformar la data para que coincida con la estructura esperada
      const transformedOrders = data.filter(order => order.items).map(order => {
        // Calcular el totalPrice basándose en los items
        const totalPrice = order.items.reduce((acc, item) => acc + (item.price * 1), 0); // Multiplica por la cantidad de cada ítem

        return {
          id: order.id,
          items: order.items.map(item => ({
            item_id: item.id,
            name: item.name,
            quantity: 1, // O ajustar según tus necesidades
            price: item.price,
            comments: item.comments || "", // Asegúrate de capturar los comentarios de la respuesta
          })),
          totalPrice: totalPrice, // Usar el totalPrice calculado
        };
      });

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 3 }}>
        Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} onUpdate={fetchOrders} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
          </Grid>
        ))}
      </Grid>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

const OrderCard = ({ order, onUpdate, setSnackbarOpen, setSnackbarMessage }) => {
  const handleDone = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }), // Cambiar el estado a "completed"
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Cambiar el estado del Snackbar
      setSnackbarMessage(`Order ${order.id} updated to completed`);
      setSnackbarOpen(true);
      
      onUpdate(); // Llamar a la función para actualizar la lista de órdenes
    } catch (error) {
      console.error("Error updating order status:", error);
      // Opcional: puedes manejar el error de alguna manera (ej. mostrar un Snackbar de error)
    }
  };

  return (
    <Card
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "auto",
        minHeight: 350,
        backgroundColor: "#ffffff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        Order ID: {order.id}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Items:
      </Typography>
      <ul style={{ padding: 0, listStyleType: "none", margin: 0 }}>
        {order.items.map((item, index) => (
          <li key={index} style={{ marginBottom: 8, fontSize: "1.2rem" }}>
            {item.quantity} x {item.name} - ${item.price / 100} <br />
            <span style={{ fontStyle: "italic", color: "#777" }}>{item.comments}</span>
          </li>
        ))}
      </ul>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff5722", fontSize: "1.5rem" }}>
        Total Price: ${order.totalPrice / 100}
      </Typography>

      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center", width: "100%" }}>
        <Button variant="contained" color="success" sx={{ flexGrow: 1 }} onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Card>
  );
};

export default Order;
