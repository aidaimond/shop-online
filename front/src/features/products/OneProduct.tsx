import React, {useEffect} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOneLoading, selectOneProduct} from './productsSlice';
import {deleteProduct, fetchOne, fetchProducts} from './productsThunks';
import {apiURL} from '../../constants';
import {selectUser} from '../users/usersSlice';
import {selectCategoriesLoading} from '../categories/categoriesSlice';
import dayjs from 'dayjs';
import CommentItem from '../comments/CommentItem';
import {selectComments, selectCommentsLoading} from '../comments/CommentSlice';
import CommentForm from "../comments/CommentForm";
import {CommentsMutation, CommentWithProduct} from "../../types";
import {createComments, deleteComments, fetchComments} from "../comments/CommentThunks";
import BeigeButton from "../../components/beigeButton/BeigeButton";

const OneProduct = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const user = useAppSelector(selectUser);
  const oneLoading = useAppSelector(selectOneLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const navigate = useNavigate();
  const comments = useAppSelector(selectComments);
  const commentsLoading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOne(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const removeProduct = async () => {
    if (id) {
      await dispatch(deleteProduct(id));
      await dispatch(fetchProducts());
      navigate('/');
    }
  };

  const onFormSubmit = async (mutation: CommentsMutation) => {
    if (id) {
      const feedback: CommentWithProduct = {...mutation, product: id}
      await dispatch(createComments(feedback));
      await dispatch(fetchComments(id));
    }
  };

  const onDelete = async (com_id: string) => {
    await dispatch(deleteComments(com_id));
    if (id) {
      await dispatch(fetchComments(id));
    }
  };

  return (
    <Box sx={{backgroundColor: '#FFF5EE', minHeight: '100vh', py: 3}}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} p={2}>
          <Card sx={{maxWidth: 400, mx: 'auto'}}>
            {oneLoading || categoriesLoading ? (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                <CircularProgress/>
              </Box>
            ) : (
              <>
                <CardMedia
                  component="img"
                  height="300"
                  image={apiURL + '/' + product?.image}
                  alt={product?.title}
                />
                <CardContent>
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
                  {user?._id === product?.user._id && (
                    <BeigeButton onClick={removeProduct} buttonName={'Delete'}/>
                  )}
                </CardContent>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          {commentsLoading ? <CircularProgress/> :
            <Box sx={{maxHeight: '550px', overflowY: 'auto'}}>
              <Typography variant="h4">Feedbacks</Typography>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} onDelete={onDelete}/>
              ))}
            </Box>
          }
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <Grid item sx={{marginY: '20px'}} xs={12}>
            <Typography variant="h4">Add Feedback</Typography>
          </Grid>
          <Grid item sx={{marginY: '30px'}}>
            <CommentForm onSubmit={onFormSubmit}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OneProduct;


