import { cartActions } from "./cart-slice";

import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-c6acd-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();

      return data;
    };
    try {
      let cartData = await fetchData();

      if (cartData.item) {
        cartData.item.map((item) => {
          item.database = true;
          dispatch(cartActions.addItem(item));
          return null;
        });
      }
    } catch (error) {
      dispatch(
        uiActions.notify({
          response: "Error",
          title: "Something went wrong",
          message: error.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        "https://react-http-c6acd-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            item: cart.item,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      dispatch(
        uiActions.notify({
          response: "Loading",
          title: "Loading...",
          message: "Please wait",
        })
      );
      await sendData();
      dispatch(
        uiActions.notify({
          response: "Successful",
          title: "Successfully Completed",
          message: "Data Send",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notify({
          response: "Error",
          title: "Something went wrong",
          message: error.message,
        })
      );
    }
  };
};
