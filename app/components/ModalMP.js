import { Box, Button, Modal, Typography } from "@mui/material";
import { MPCheckout } from "./MpCard";
import { useState } from "react";

const ModalMP = ({ open, handleClose, items, id }) => {
  const [finished, setFinished] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 650,
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    maxHeight: "100vh",
    overflow: "auto",
  };
  console.log("items", items);
  if (finished) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            backgroundColor: "white",
            minHeight: 450,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Typography variant="h2" component={"div"} id="modal-modal-title">
              Finish your order
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 250,
            }}
          >
            <Typography
              variant="h4"
              component={"div"}
              id="modal-modal-description"
            >
              Thank you for your order!
            </Typography>
          </div>
          <Button
            onClick={() => {
              handleClose();
              setFinished(false);
            }}
            variant="contained"
            color="error"
            sx={{ marginTop: "auto", marginRight: "auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    );
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={{ ...style, backgroundColor: "white", minHeight: 450 }}>
        <Typography variant="h2" component={"div"} id="modal-modal-title">
          Finish your order
        </Typography>
        <MPCheckout
          items={items}
          id={id}
          onSuccess={() => {
            setFinished(true);
          }}
        />
        <Button onClick={handleClose} variant="contained" color="error">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalMP;
