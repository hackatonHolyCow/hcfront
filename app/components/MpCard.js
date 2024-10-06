import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { PostOrder } from "../api/audio";

initMercadoPago("TEST-bdbff110-dc0c-488d-bff3-4b9346273e33");

export const MPCheckout = (props) => {
  const getTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const onsubmit = async (param) => {
    try {
      const itemsPayment = props.items.map((item) => ({
        id: item.id,
        comments: item.modifications,
        quantity: item.quantity,
        price: item.price,
      }));
      // TODO : meter random en table
      const resp = await PostOrder({
        payment: param,
        table: "1",
        items: itemsPayment,
        id: props.id,
      });

      props.onSuccess();
      console.log(resp);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <CardPayment
      initialization={{ amount: getTotal(props.items) }}
      onSubmit={onsubmit}
    />
  );
};
