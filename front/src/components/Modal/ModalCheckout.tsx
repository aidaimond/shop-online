import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({open, onClose}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle id="modal-title">Order</DialogTitle>
        <DialogContent>
          <DialogContentText id="modal-description">
            Choose a shipping method
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={'secondary'} onClick={() => navigate('/checkout')}>Courier</Button>
          <Button color={'secondary'} onClick={() => navigate('/pickup')}>Pickup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;



