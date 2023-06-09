import React from 'react';
import Typography from '@mui/material/Typography';
import {Product} from "../../types";
import {apiURL} from "../../constants";
import {styled} from '@mui/system';
import BeigeButton from "../../components/beigeButton/BeigeButton";
import {createBasket, deleteBasket, fetchBasket} from "./basketThunks";
import {useAppDispatch} from "../../app/hooks";

const StyledButtonWrapper = styled('div')`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

interface Props {
  product: Product;
  amount: number;
}

const BasketItem: React.FC<Props> = ({product, amount}) => {

  const dispatch = useAppDispatch();

  const addItem = async () => {
    await dispatch(createBasket(product._id));
    await dispatch(fetchBasket());
  };

  const deleteItem = async () => {
    await dispatch(deleteBasket(product._id));
    await dispatch(fetchBasket());
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
      <img
        src={apiURL + '/' + product.image}
        alt={product.title}
        style={{marginRight: 16, width: 80, height: 80, objectFit: 'cover'}}
      />
      <div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body1">Price: ${product.price}</Typography>
        <Typography variant="body2">Quantity: {amount}</Typography>
      </div>
      <StyledButtonWrapper>
        <BeigeButton onClick={deleteItem} buttonName={'-'}/>
        <BeigeButton onClick={addItem} buttonName={'+'}/>
      </StyledButtonWrapper>
    </div>
  );
};

export default BasketItem;
