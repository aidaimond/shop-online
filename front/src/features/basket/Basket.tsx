import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import BasketItem from "./BasketItem";
import BeigeButton from "../../components/beigeButton/BeigeButton";
import {fetchBasket} from "./basketThunks";
import {selectBasket} from "./basketSlice";
import {Typography} from "@mui/material";
import Modal from "../../components/Modal/ModalCheckout";

const Basket = () => {
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const total = basket.reduce((sum, cartItem) => {
    return sum + cartItem.amount * cartItem.product.price;
  }, 0);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    basket.length === 0 ? <Typography variant={"h4"}>Cart is empty! Add something!</Typography> :
      <div>
        {basket.map((item) => (
          <BasketItem
            key={item.product._id}
            product={item.product}
            amount={item.amount}
          />
        ))}
        <BeigeButton onClick={handleOpen} buttonName={'Checkout'}/>
        <div style={{textAlign: 'right'}}>
          <strong>Total: {total}</strong> $
        </div>
        <Modal onClose={handleClose} open={openModal}/>
      </div>
  );
};

export default Basket;