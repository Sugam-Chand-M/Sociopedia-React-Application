import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage from "./scenes/homePage"; // Always use a component beginning with a capital letter as When an element type starts with a lowercase letter, it refers to a built-in component like or and results in a string 'div' or 'span' passed to React.createElement. Types that start with a capital letter like compile to React.createElement(Foo) and correspond to a component defined or imported in your JavaScript file.
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import React,{ useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode=useSelector((state)=>state.mode); // grab the value created during the initial state i.e., store
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]); // setup the theme
  // CssBaseline - resets the CSS to the basic version i.e., CSS reset. MUI has its own version of basic CSS
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
