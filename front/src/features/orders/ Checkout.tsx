import React from 'react';
import {useAppSelector} from "../../app/hooks";
import {selectBasket} from "../basket/basketSlice";
import {Navigate} from "react-router-dom";

const Checkout = () => {
  const basket = useAppSelector(selectBasket);

  if(basket.length === 0) {
    return <Navigate to={'/'}/>;
  }

  return (
    <div>

    </div>
  );
};

export default Checkout;