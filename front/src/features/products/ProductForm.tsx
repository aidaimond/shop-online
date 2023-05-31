import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, MenuItem, TextField} from '@mui/material';
import {ProductMutation} from '../../types';
import FileInput from '../../components/UI/FileInput/FileInput';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectCategoriesLoading} from '../categories/categoriesSlice';
import {fetchCategories} from '../categories/categoriesThunks';
import {selectError, selectProductsCreating} from "./productsSlice";
import {selectSubcategories} from "../subcategories/SubcategoriesSlice";
import {fetchSubcategories} from "../subcategories/SubcategoriesThunks";
import {selectBrands} from "../brands/brandsSlice";
import {fetchBrands} from "../brands/brandsThunks";

interface Props {
  onSubmit: (mutation: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const createLoading = useAppSelector(selectProductsCreating);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const subcategories = useAppSelector(selectSubcategories);
  const error = useAppSelector(selectError);
  const brands = useAppSelector(selectBrands);

  const [state, setState] = useState<ProductMutation>({
    title: '',
    price: '',
    image: null,
    category: '',
    color: '',
    composition: '',
    subcategory: '',
    brand: '',
  });

  console.log(state);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      onSubmit(state);
    } catch (e) {
      throw new Error();
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    categoriesLoading ?
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box> :
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              select
              label="Brand"
              name="brand"
              value={state.brand}
              onChange={inputChangeHandler}
              required
              id="category"
              error={Boolean(getFieldError('brand'))}
              helperText={getFieldError('brand')}
            >
              <MenuItem value="" disabled>Please select a brand</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>{brand.title}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              select
              label="Category"
              name="category"
              value={state.category}
              onChange={inputChangeHandler}
              required
              id="category"
              error={Boolean(getFieldError('category'))}
              helperText={getFieldError('category')}
            >
              <MenuItem value="" disabled>Please select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              select
              label="Subcategory"
              name="subcategory"
              value={state.subcategory}
              onChange={inputChangeHandler}
              id="subcategory"
              error={Boolean(getFieldError('subcategory'))}
              helperText={getFieldError('subcategory')}
            >
              <MenuItem value="" disabled>Please select a category</MenuItem>
              {subcategories.map((subcategory) => (
                <MenuItem
                  key={subcategory._id}
                  value={subcategory._id}>{subcategory.category._id === state.category ? subcategory.title : null}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              id="title" label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              name="title"
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
              required
            />
          </Grid>

          <Grid item xs>
            <TextField
              id="price" label="Price"
              value={state.price}
              onChange={inputChangeHandler}
              name="price"
              type='number'
              error={Boolean(getFieldError('price'))}
              helperText={getFieldError('price')}
              inputProps={{min: 1, max: 10000000}}
              required
            />
          </Grid>

          <Grid item xs>
            <TextField
              multiline rows={3}
              id="composition" label="Composition"
              value={state.composition}
              onChange={inputChangeHandler}
              name="composition"
              error={Boolean(getFieldError('composition'))}
              helperText={getFieldError('composition')}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="color" label="Color"
              value={state.color}
              onChange={inputChangeHandler}
              name="color"
              error={Boolean(getFieldError('color'))}
              helperText={getFieldError('color')}
              required
            />
          </Grid>

          <Grid item xs>
            <FileInput onChange={fileInputChangeHandler} name="image" label="Image"/>
          </Grid>

          <Grid item xs>
            <Button type="submit" color="primary" variant="contained"
                    disabled={state.image === null}
            >
              {createLoading ? <CircularProgress/> : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default ProductForm;

