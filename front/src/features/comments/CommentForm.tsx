import React, {useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {CommentsMutation} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectCreateCommentsLoading} from "./CommentSlice";

interface Props {
  onSubmit: (mutation: CommentsMutation) => void;
}

const CommentForm: React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<CommentsMutation>({
    description: '',
  });
  const createCommentLoading = useAppSelector(selectCreateCommentsLoading);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      description: '',
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (

    <form autoComplete="off" onSubmit={onFormSubmit}>
      <Grid>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              color="secondary"
              multiline rows={3}
              id="description" label="Description"
              value={state.description}
              onChange={onInputChange}
              name="description"
              required
            />
          </Grid>
        </Grid>
        <Grid item xs>
          <Button type="submit" color="secondary" variant="contained" sx={{marginTop: '10px'}}
                  disabled={state.description === ''}>
            {createCommentLoading ? <CircularProgress/> : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
    ;
};

export default CommentForm;