import React, {useEffect} from 'react';
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDeleteLoading, selectOneLoading, selectOneProduct} from "./productsSlice";
import {deleteProduct, fetchOne, fetchProducts} from "./productsThunks";
import {apiURL} from "../../constants";
import {selectUser} from "../users/usersSlice";
import {selectCategoriesLoading} from "../categories/categoriesSlice";
import dayjs from "dayjs";
import CommentItem from "../comments/CommentItem";
import {selectComments} from "../comments/CommentSlice";

const OneProduct = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const oneLoading = useAppSelector(selectOneLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const navigate = useNavigate();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    if(id) {
      dispatch(fetchOne(id));
    }
  }, [dispatch, id]);

  const removeProduct = async () => {
    if(id) {
      await dispatch(deleteProduct(id));
      await dispatch(fetchProducts());
      navigate('/');
    }
  };

  return (
    oneLoading || categoriesLoading ?
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box> :
  <Grid item xs={12} md={12} xl={12} lg={12}>
    <Card sx={{display: 'flex', marginBottom: 5}}>
      <CardContent sx={{flex: 1}}>
        <Typography variant="subtitle1" color="text.secondary" sx={{marginY: 2}}>
          {dayjs(product?.datetime).format('DD.MM.YYYY HH:mm')}
        </Typography>
        <Typography component="h2" variant="h6" sx={{opacity: 0.8}}>
          {'Author: ' + product?.user.displayName}
        </Typography>
        <Typography component="h2" variant="h5" sx={{marginY: 2}}>
          {product?.title}
        </Typography>
        <Typography component="h2" variant="h5" sx={{marginY: 2}}>
          {product?.price + ' $'}
        </Typography>
        <Typography component="h2" variant="h6" sx={{marginY: 2}}>
          {product?.category.title}
        </Typography>
        <Typography variant="subtitle1" paragraph sx={{marginY: 2}}>
          {product?.composition}
        </Typography>
      </CardContent>
      <CardMedia component="img" sx={{width: '400px'}} image={apiURL + '/' + product?.image} alt={product?.title}/>
    </Card>
    {user?._id === product?.user._id ?
      <Button variant="outlined" onClick={removeProduct}>
        {deleteLoading ? <CircularProgress/> : 'Delete'}
      </Button> :
    null}

    <Grid item container spacing={2}>
      <Grid item sx={{marginTop: '20px'}}>
        <Typography variant="h4">Comments</Typography>
      </Grid>
      <Grid item xs={12}>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} onDelete={()=> console.log('ne zabud fnc na udalenie')}/>
        ))}
      </Grid>
    </Grid>
  </Grid>
  );
};

export default OneProduct;