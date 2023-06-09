import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {apiURL} from '../../constants';
import {Product} from '../../types';
import {Link} from 'react-router-dom';
import {useAppDispatch} from "../../app/hooks";
import {createBasket} from "../basket/basketThunks";
import BeigeButton from "../../components/beigeButton/BeigeButton";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({product}) => {
  const dispatch = useAppDispatch()

  const handleAddToBasket = async () => {
    await dispatch(createBasket(product._id));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <CardActionArea component={Link} to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            height="auto"
            image={apiURL + '/' + product.image}
            alt={product.title}
            sx={{maxHeight: 400, objectFit: 'cover'}}
          />
        </CardActionArea>
        <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
          <Typography variant="h6" component="div" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginBottom: 1}}>
            Price: {product.price} $
          </Typography>
          <BeigeButton onClick={() => handleAddToBasket()} buttonName={'Add to cart'}/>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductItem;
