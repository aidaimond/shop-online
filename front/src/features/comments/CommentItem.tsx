import React from 'react';
import {Button, CircularProgress, Grid} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Comment} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectDeleteCommentsLoading} from "./CommentSlice";

interface Props {
  comment: Comment;
  onDelete: (com_id: string) => void;
}

const CommentItem: React.FC<Props> = ({comment, onDelete}) => {
  const deleteCommentLoading = useAppSelector(selectDeleteCommentsLoading);

  return (
    <Grid item >
      <p><strong>{comment.user.displayName}</strong>  : {comment.description}</p>
      <Button color={"secondary"}
              startIcon={<DeleteIcon />} variant="outlined"
              onClick={() => onDelete(comment._id.toString())}
      >
        {deleteCommentLoading ? <CircularProgress/> : 'Delete'}
      </Button>
    </Grid>
  );
};

export default CommentItem;