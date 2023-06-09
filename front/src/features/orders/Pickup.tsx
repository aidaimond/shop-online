import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createPickup, fetchAddress} from "./orderThunks";
import {PickupMutation} from "../../types";
import {Button, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {selectAddress, selectAddressLoading, selectPickupLoading} from "./orderSlice";
import {deleteBasket} from "../basket/basketThunks";
import {useNavigate} from "react-router-dom";

const Pickup = () => {
  const [state, setState] = useState<PickupMutation>({
    address: '',
  });
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddress);
  const addressLoading = useAppSelector(selectAddressLoading);
  const createLoading = useAppSelector(selectPickupLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async () => {
    await dispatch(createPickup(state));
    await dispatch(deleteBasket());
    navigate('/');

  };

  return (
    addressLoading ? <CircularProgress/> :
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        <Typography variant={'h4'} sx={{margin: 5}}>
          Please select pickup address
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              select
              label="Address"
              name="address"
              color={'secondary'}
              value={state.address}
              onChange={inputChangeHandler}
              required
              id="address"
            >
              <MenuItem value="" disabled>Please select address</MenuItem>
              {addresses.map((address) => (
                <MenuItem key={address._id} value={address._id}>{address.title}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <Button
              type="submit" color={'secondary'}
              variant="contained"
            >
              {createLoading ? <CircularProgress/> : 'Select'}
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default Pickup;