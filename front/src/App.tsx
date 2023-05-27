import React from 'react';
import './App.css';
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="*" element={(<h1>Not found!</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
