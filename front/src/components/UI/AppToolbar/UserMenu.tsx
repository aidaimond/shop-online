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
      <Button component={NavLink} to="/new-product"  color="inherit" sx={{ color: '#000000' }}>
        Add new item
      </Button>
      <Button onClick={handleLogout} component={NavLink} to="/"  color="inherit" sx={{ color: '#000000' }}>
        Logout
      </Button>
    </>
  );
};

export default UserMenu;