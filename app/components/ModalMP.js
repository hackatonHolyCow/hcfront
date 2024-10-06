import { Modal } from "@mui/material";
import { MPCheckout } from "./MpCard";

const ModalMP = ({ open, handleClose, items }) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <MPCheckout items={items} />
    </Modal>
  );
};

export default ModalMP;
