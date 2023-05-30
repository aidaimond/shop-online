import React from 'react';
import { Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Comment} from "../../types";

interface Props {
  comment: Comment;
  onDelete: (com_id: string) => void;
}

const CommentItem: React.FC<Props> = ({comment, onDelete}) => {
  return (
    <Grid item >
      <Button color={"secondary"}
              startIcon={<DeleteIcon />} variant="outlined"
              onClick={() => onDelete(comment._id.toString())}
      >
        Delete
      </Button>
    </Grid>
  );
};

export default CommentItem;