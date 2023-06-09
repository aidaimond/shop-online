import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

const Link = styled(NavLink)({
  color: '#000000',
  textDecoration: 'none',
  '&:hover': {
    color: '#000000',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2, backgroundColor: '#EDEAE0'}}>
      <Toolbar>
        <Grid container justifyContent={'space-between'} alignItems={"center"}>
          <Typography variant="h6" component="div">
            <Link to="/">Shine</Link>
          </Typography>
          <Grid item>
            {user ? (
              <UserMenu user={user}/>
            ) : (
              <AnonymousMenu/>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
