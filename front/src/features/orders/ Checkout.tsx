import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectBasket} from "../basket/basketSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {ShippingMutation} from "../../types";
import ShippingForm from "./ShippingForm";
import {createOrder} from "./orderThunks";

const Checkout = () => {
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (basket.length === 0) {
    return <Navigate to={'/'}/>;
  }

  const onFormSubmit = async (mutation: ShippingMutation) => {
    dispatch(createOrder(mutation));
    navigate('/');
  };
  return (
    <div>
      <ShippingForm onSubmit={onFormSubmit}/>
    </div>
  );
};

export default Checkout;