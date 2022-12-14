import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddbookScreen,
  AllBooksScreen,
  Authorization,
  FavouriteBooksScreen,
  SignUpScreen,
  SignInScreen,
  InfoBookScreen
} from "./pages";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Authorization />}>
      <Route path="sign-up" element={<SignUpScreen />} />
      <Route path="sign-in" element={<SignInScreen />} />
      </Route>

      <Route path="app" element={<App />}>
        <Route path="add-book" element={<AddbookScreen />} />
        <Route path="all-books" element={<AllBooksScreen />} />
        <Route path="favourite-books" element={<FavouriteBooksScreen />} />
        <Route path="info-book/:id" element={<InfoBookScreen />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
