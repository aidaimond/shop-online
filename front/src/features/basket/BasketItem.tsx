import React from 'react';
import Typography from '@mui/material/Typography';
import {Product} from "../../types";

interface Props {
  product: Product;
  amount: number;
}

const BasketItem: React.FC<Props> = ({product, amount}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
      <img
        src={product.image}
        alt={product.title}
        style={{marginRight: 16, width: 80, height: 80, objectFit: 'cover'}}
      />
      <div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body1">Price: ${product.price}</Typography>
        <Typography variant="body2">Quantity: {amount}</Typography>
      </div>
    </div>
  );
};

export default BasketItem;

