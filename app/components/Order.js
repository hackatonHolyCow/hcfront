"use client"; // Asegúrate de agregar esta línea al principio

import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Grid, Button } from "@mui/material";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
  
    fetchOrders();
  }, []);
  

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 3 }}>
        Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const OrderCard = ({ order }) => {
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

      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Button variant="contained" color="error" sx={{ flexGrow: 1, marginRight: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" color="success" sx={{ flexGrow: 1, marginLeft: 1 }}>
          Done
        </Button>
      </Box>
    </Card>
  );
};

export default Order;
