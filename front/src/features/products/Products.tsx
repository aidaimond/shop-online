import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectProducts, selectProductsFetching} from './productsSlice';
import {fetchProducts} from './productsThunks';
import ProductItem from './ProductItem';
import {useParams} from "react-router-dom";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productLoading = useAppSelector(selectProductsFetching);

  const {categoryId} = useParams();

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId]);

  return (
    productLoading ?
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box> :
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Products
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {products.map(product => (
          <ProductItem
            key={Math.random()}
            product={product}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Products;