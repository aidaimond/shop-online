import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginMutation } from '../../types';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {selectLoginError, selectLoginLoading} from './usersSlice';
import {googleLogin, login} from './usersThunks';
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
        {error && (
          <Alert
            severity="error"
            sx={{mt: 3, width: '100%'}}
          >
            {error.error}
          </Alert>
        )}

        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                autoComplete="current-email"
                value={state.email}
                type="email"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{mt: 3, mb: 2}}
          >
            {loginLoading ? <CircularProgress/>: "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2" color="secondary">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;