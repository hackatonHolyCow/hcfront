"use client";
import { AppBar, Box, Button, Grid, Grid2, Toolbar, Typography } from "@mui/material";
import Menu from "./components/Menu";
import Chat from "./components/Chat";
import Cart from "./components/Cart";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [itemsCart, setItemsCart] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState(0);
  const updateItemsCart = (response) => {
    let output = [];
    let allChat = [];
    let userChat = "";
    let agentChat = "";
    setId(response.id);
    response.response.forEach((item) => {
      if (item.User != null) {
        userChat = item.User;
        return;
      }
      agentChat = item.Agent;
      let agentMessage = agentChat.message;
      if (agentMessage == null)
        agentMessage = "Sorry, I don't understand that. Can you try again?";
      allChat.push({ user: userChat, agent: agentMessage });

      let agentItems = item.Agent.items;
      if (agentItems != null && agentItems.length > 0)
        output = output.concat(agentItems);
    });
    setMessages(allChat);
    console.log("output", output);
    setItemsCart(output);
  };
  return (
    <div>
    <AppBar position="static" sx={{ backgroundColor: "#FFF5E1" }}> {/* Cambiar el color de fondo a crema */}
    <Toolbar>
      <Image src="/static/logo.png" alt="Logo" width={100} height={50} />
      <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2, color: "black", fontWeight: "bold"  }}> {/* Cambiar el color del texto a negro */}
        Chef Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
    <Grid2 container justifyContent={"center"}>
      <Grid2 size={{ xs: 10, md: 6 }}>
        {isReady ? (
          <Grid2 container alignContent={"center"} alignItems={"center"} justifyContent={"center"}> 
            <Grid2 size={{ xs:10 }}>

            <Chat onRequest={updateItemsCart} id={id} messages={messages} />
            <Cart itemsCart={itemsCart} id={id} />
            </Grid2>
              
          </Grid2>
          
        ) : (
          <Box
            sx={{
              margin: "auto",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" component={"div"} justifyItems={"center"}>
              Are you ready to order?
            </Typography>
            <Button
              color="primary"
              variant="contained"
              sx={{ margin: 3, fontSize: 25 }}
              onClick={() => {
                setIsReady(true);
              }}
            >
              Order now
            </Button>
          </Box>
        )}
      </Grid2>
      <Grid2
        size={{ xs: 10, md: 6 }}
        sx={{ backgroundColor: "#e8eaf6", height: "100vh" }}
      >
        <Menu />
      </Grid2>
    </Grid2>
    </div>
  );
}
