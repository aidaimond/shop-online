import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={NavLink} to="/register" color="inherit" sx={{ color: '#000000' }}>
        Register
      </Button>
      <Button component={NavLink} to="/login" color="inherit" sx={{ color: '#000000' }}>
        Login
      </Button>
    </>
  );
};

export default AnonymousMenu;
