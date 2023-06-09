import React from 'react';
import {Button, CircularProgress} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectDeleteLoading} from "../../features/products/productsSlice";

interface Props {
  onClick: () => void;
  buttonName: string;
}

const BeigeButton: React.FC<Props> = ({onClick, buttonName}) => {

  const deleteLoading = useAppSelector(selectDeleteLoading);

  return (
    <Button
      variant="contained"
      color="inherit"
      sx={{
        mb: 2,
        backgroundColor: '#EDCDC2',
        color: 'black',
        mx: 'auto',
        display: 'block',
        '&:hover': {
          backgroundColor: '#EDEAE0',
        },
      }}
      onClick={onClick}
    >
      {deleteLoading ? <CircularProgress size={20} color="secondary" /> : buttonName}
    </Button>
  );
};

export default BeigeButton;