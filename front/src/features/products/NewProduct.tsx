import { Typography } from '@mui/material';
import ProductForm from './ProductForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import { createProduct } from './productsThunks';
import { ProductMutation } from '../../types';
import {selectUser} from "../users/usersSlice";

const NewProduct = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to={"/login"}/>
  }

  const onFormSubmit = async (productMutation: ProductMutation) => {
    await dispatch(createProduct(productMutation));
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New product</Typography>
      <ProductForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewProduct;