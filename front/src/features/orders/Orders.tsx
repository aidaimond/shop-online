import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOrders} from "./orderThunks";
import {selectOrderLoading, selectOrders} from "./orderSlice";
import OrderItem from "./OrderItem";
import {CircularProgress} from "@mui/material";

const Orders = () => {

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectOrderLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    loading ? <CircularProgress/> :
      <div>
        {orders.map((item) => (
          <OrderItem status={item.status} key={item._id} datetime={item.datetime}
                     id={item._id}/>
        ))}
      </div>
  );
};

export default Orders;