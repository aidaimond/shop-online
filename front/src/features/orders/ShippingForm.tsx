import React, {useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {ShippingMutation} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectCreateOrderLoading} from "./orderSlice";

interface Props {
  onSubmit: (mutation: ShippingMutation) => void;
}

const ShippingForm: React.FC<Props> = ({onSubmit}) => {
  const createLoading = useAppSelector(selectCreateOrderLoading);
  const [state, setState] = useState<ShippingMutation>({
    city: '',
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="city"
            label="City"
            name="city"
            value={state.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="street"
            label="Street"
            name="street"
            value={state.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="house"
            label="House N"
            name="house"
            value={state.house}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="apartment"
            label="Apartment N"
            name="apartment"
            value={state.apartment}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="entrance"
            label="Entrance N"
            name="entrance"
            value={state.entrance}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="floor"
            label="Floor N"
            name="floor"
            value={state.floor}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="notes"
            label="Notes"
            name="notes"
            value={state.notes}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            {createLoading ? <CircularProgress/> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ShippingForm;
