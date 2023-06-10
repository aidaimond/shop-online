import React, {useState} from 'react';
import {Button, Card, CardContent, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOrders, updateOrderStatus} from "./orderThunks";
import {selectUpdateStatusLoading} from "./orderSlice";

interface Props {
  status: string;
  datetime: string;
  id: string;
}

const OrderItem: React.FC<Props> = ({status, datetime, id}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUpdateStatusLoading);

  const [state, setState] = useState({
    status: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(updateOrderStatus({id: id, mutation: state.status}));
    await dispatch(fetchOrders());
    setIsFormOpen(false);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  return (
    <Card sx={{margin: 5}}>
      <CardContent>
        <Typography variant="h6">Order</Typography>
        <Typography variant="body1">Date: {datetime}</Typography>
        <Typography variant="body1">Status: {status}</Typography>
        <Typography variant="body1">ID: {id}</Typography>
        {isFormOpen ? (
          <form onSubmit={handleSubmit}>
            <Grid item xs>
              <TextField
                select
                label="Status"
                name="status"
                value={state.status}
                onChange={inputChangeHandler}
                required
                id="status"
              >
                <MenuItem value="" disabled>Please select a brand</MenuItem>
                <MenuItem value="collect">Collect</MenuItem>
                <MenuItem value="transit">Transit</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
              </TextField>
            </Grid>
            <Button type="submit">Submit</Button>
          </form>
        ) : (
          <Button onClick={handleOpenForm}>
            {loading ? <CircularProgress/> : 'Change Status'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderItem;
