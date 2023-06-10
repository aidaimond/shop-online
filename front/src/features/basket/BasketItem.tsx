import React from 'react';
import Typography from '@mui/material/Typography';
import {Product} from "../../types";
import {apiURL} from "../../constants";
import {styled} from '@mui/system';
import BeigeButton from "../../components/beigeButton/BeigeButton";
import {createBasket, deleteBasketProduct, fetchBasket} from "./basketThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCreateBasketLoading, selectDeleteBasketProductLoading} from "./basketSlice";
import {CircularProgress} from "@mui/material";

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
  const deleteLoading = useAppSelector(selectDeleteBasketProductLoading);
  const createLoading = useAppSelector(selectCreateBasketLoading);

  const addItem = async () => {
    await dispatch(createBasket(product._id));
    await dispatch(fetchBasket());
  };

  const deleteItem = async () => {
    await dispatch(deleteBasketProduct(product._id));
    await dispatch(fetchBasket());
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', marginBottom: '25px'}}>
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
        {deleteLoading ? <CircularProgress/> : <BeigeButton onClick={deleteItem} buttonName={'-'}/>}
        {createLoading ? <CircularProgress/> : <BeigeButton onClick={addItem} buttonName={'+'}/>}
      </StyledButtonWrapper>
    </div>
  );
};

export default BasketItem;
