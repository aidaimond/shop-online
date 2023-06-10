import React from 'react';
import {Button} from '@mui/material';
import {User} from '../../../types';
import {Link as NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        color="inherit" sx={{ color: '#000000' }}
      >
        Hello, {user.displayName}
      </Button>
      {user.role === 'admin' ?
        <Button component={NavLink} to="/new-product"  color="inherit" sx={{ color: '#000000' }}>
        Add
      </Button> : null}
      {user.role === 'admin' ?
        <Button component={NavLink} to="/orders"  color="inherit" sx={{ color: '#000000' }}>
          Orders
        </Button> : null}
      <Button component={NavLink} to="/basket"  color="inherit" sx={{ color: '#000000' }}>
        Basket
      </Button>
      <Button onClick={handleLogout} component={NavLink} to="/"  color="inherit" sx={{ color: '#000000' }}>
        Logout
      </Button>
    </>
  );
};

export default UserMenu;