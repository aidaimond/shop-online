import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProducts} from "../products/productsSlice";
import BasketItem from "./BasketItem";
import {fetchProducts} from "../products/productsThunks";

const Basket = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  return (
    <div>
      {products.map((product) => (
        <BasketItem
          key={product._id}
          product={product}
          amount={1}
        />
      ))}
    </div>
  );
};

export default Basket;