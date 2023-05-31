import React from 'react';
import {Button, CircularProgress} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectDeleteLoading} from "../../features/products/productsSlice";

interface Props {
  onClick: () => void;
}

const BeigeButton: React.FC<Props> = ({onClick}) => {

  const deleteLoading = useAppSelector(selectDeleteLoading);

  return (
    <Button
      variant="contained"
      color="inherit"
      sx={{
        mb: 2,
        backgroundColor: '#EDEAE0',
        color: 'black',
        mx: 'auto',
        display: 'block',
        '&:hover': {
          backgroundColor: '#EDCDC2',
        },
      }}
      onClick={onClick}
    >
      {deleteLoading ? <CircularProgress size={20} color="secondary" /> : 'Delete'}
    </Button>
  );
};

export default BeigeButton;