import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import BasketItem from "./BasketItem";
import BeigeButton from "../../components/beigeButton/BeigeButton";
import {fetchBasket} from "./basketThunks";
import {selectBasket} from "./basketSlice";

const Basket = () => {
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const checkout = () => {

  };


  return (
    <div>
      {basket.map((item) => (
        <BasketItem
          key={item.product._id}
          product={item.product}
          amount={item.amount}
        />
      ))}
      <BeigeButton onClick={checkout} buttonName={'Checkout'}/>
    </div>
  );
};

export default Basket;