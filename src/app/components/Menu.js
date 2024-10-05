import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Menu = () => {
  const items = [
    {
      id: "a6fa5b1c-5bc5-4741-bb3a-073ba0c93e37",
      Name: "Hot Chocolate",
      Description: "Rich and creamy hot chocolate topped with whipped cream.",
      Price: "3.50",
      Tags: ["beverage", "dessert"],
      "Picture URL":
        "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: "1",
    },
    {
      id: "2e614fe8-6db4-4d56-bcb3-2ae868917a83",
      Name: "Red Wine",
      Description: "A glass of rich red wine, perfect for pairing with dinner.",
      Price: "9.00",
      Tags: ["beverage", "wine", "contains alcohol"],
      "Picture URL":
        "https://images.unsplash.com/photo-1700893417207-99da24343476?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: "1",
    },
    {
      id: "b0b83673-d646-4c71-8326-f4407c802f56",
      Name: "Lemonade",
      Description: "Freshly squeezed lemonade, served chilled.",
      Price: "$2.99",
      Tags: ["beverage", "non-alcoholic"],
      "Picture URL": "https://example.com/images/lemonade.jpg",
      quantity: "2",
    },
  ];
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Our Menu
      </Typography>
      {items.map((item) => (
        <FoodItem item={item} key={"foodItem" + item.id} />
      ))}
    </>
  );
};
const FoodItem = ({ item }) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          padding: 1,
          borderRadius: 4,
          margin: 5,
          minWidth: 250,
        }}
        key={item.id}
      >
        <Grid container>
          <Grid
            size={{ md: 5, sx: 16 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={item["Picture URL"]}
              height={150}
              width={150}
              sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid size={{ md: 4 }}>
            <Typography
              component={"div"}
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              {item.Name}
            </Typography>
            <Typography
              component={"div"}
              variant="h5"
              sx={{ textAlign: "center", marginTop: 5 }}
            >
              {item.Price}
            </Typography>
          </Grid>
          <Grid
            size={{ md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              component={"div"}
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              {item.Description}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
export default Menu;
