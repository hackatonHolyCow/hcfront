"use client";
import { Box, Button, ButtonGroup, Card, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { MPCheckout } from "./MpCard";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: "a6fa5b1c-5bc5-4741-bb3a-073ba0c93e37",
      name: "Hot Chocolate",
      description: "Rich and creamy hot chocolate topped with whipped cream.",
      price: 4000,
      tags: ["beverage", "dessert"],
      picture:
        "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 1,
    },
    {
      id: "2e614fe8-6db4-4d56-bcb3-2ae868917a83",
      name: "Red Wine",
      description: "A glass of rich red wine, perfect for pairing with dinner.",
      price: 10000,
      tags: ["beverage", "wine", "contains alcohol"],
      picture:
        "https://images.unsplash.com/photo-1700893417207-99da24343476?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 1,
    },
    {
      id: "b0b83673-d646-4c71-8326-f4407c802f56",
      name: "Lemonade",
      description: "Freshly squeezed lemonade, served chilled.",
      price: 9000,
      tags: ["beverage", "non-alcoholic"],
      picture: "https://example.com/images/lemonade.jpg",
      quantity: 2,
    },
  ]);
  const getTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  return (
    <Box sx={{ marginTop: 5, maxHeight: "30vh" }}>
      <Typography component={"div"} variant="h4" sx={{ textAlign: "center" }}>
        Your order
      </Typography>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "auto",
          maxHeight: "40vh",
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id + "cart item"}
            sx={{
              marginTop: 2,
              paddingLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Grid container columns={16} width={"100%"}>
              <Grid
                size={2}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ButtonGroup>
                    {/* <Button variant="primary">
                      <RemoveIcon />
                    </Button> */}
                    <Button
                      variant="primary"
                      sx={{ backgroundColor: "lightgray", marginBottom: 1 }}
                    >
                      <Typography variant="h6">{item.quantity}</Typography>
                    </Button>
                    {/* <Button variant="primary">
                      <AddIcon />
                    </Button> */}
                  </ButtonGroup>
                </Box>
              </Grid>
              <Grid
                size={10}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="h7">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Grid>
              <Grid
                size={1}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="h7">{item.price}</Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 3,
          marginRight: 18,
        }}
      >
        <Typography variant="h6">Total :</Typography>
        <Typography variant="h6" sx={{ marginLeft: 5 }}>
          {getTotal()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <MPCheckout items={items} />
      </Box>
    </Box>
  );
};
export default Cart;
