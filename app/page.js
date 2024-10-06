"use client";
import { Box, Button, Grid2, Typography } from "@mui/material";
import Menu from "./components/Menu";
import Chat from "./components/Chat";
import Cart from "./components/Cart";
import { useState } from "react";

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
    <Grid2 container>
      <Grid2 size={6}>
        {isReady ? (
          <>
            <Chat onRequest={updateItemsCart} id={id} messages={messages} />
            <Cart itemsCart={itemsCart} />
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2" component={"div"}>
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
  );
}