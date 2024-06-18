import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";

import './App.css'
import CompanyListing from './pages/CompanyListing/CompanyListing';
import CompanyListingDetails from './pages/CompanyDetails/CompanyDetails';

function App() {

  return (
    <>
      <Provider store={store}>
            <Router>
              <Routes>
                <Route path="/login" element={<>Login page</>}></Route>
                <Route path="/register" element={<>Register page</>}></Route>
                <Route path="/" element={<>Home page</>}></Route>
                <Route path="/userDetails" element={<>Register User Details</>}></Route>
                <Route path="/companylisting" element={<CompanyListing/>}></Route>
                <Route path="/companyDetails" element={<CompanyListingDetails/>}></Route>
                <Route path="/storelisting" element={<>Store Create</>}></Route>
                <Route path="/storeDetails" element={<>Store Details</>}></Route>
              </Routes>
            </Router>
          </Provider>
    </>
  )
}

export default App;
