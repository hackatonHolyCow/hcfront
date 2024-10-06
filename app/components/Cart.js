"use client";
import { Box, Button, ButtonGroup, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import ModalMP from "./ModalMP";

const Cart = ({ itemsCart, id }) => {
  const [buttonMP, setButtonMP] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const getTotal = () => {
    let total = 0;
    itemsCart.forEach((item) => {
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
        {itemsCart.map((item) => (
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
                    <Button
                      variant="primary"
                      sx={{ backgroundColor: "lightgray", marginBottom: 1 }}
                    >
                      <Typography variant="h6">{item.quantity}</Typography>
                    </Button>
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
                {item.modifications?.length > 0 && (
                  <Typography variant="body2">{item.modifications}</Typography>
                )}
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
          justifyContent: "space-around",
          marginTop: 3,
        }}
      >
        <Button onClick={() => setOpenSnackbar(true)}>Need help?</Button>
        <Button onClick={() => setButtonMP(true)}>Finish order</Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="A waiter is on their way!"
      />
      <ModalMP
        open={buttonMP}
        handleClose={() => setButtonMP(false)}
        items={itemsCart}
        id={id}
      />
    </Box>
  );
};
export default Cart;
