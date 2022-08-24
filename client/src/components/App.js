import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import CompanyDetails from "./CompanyDetails";
import CheckoutPage from "./CheckoutPage";
import UserBooking from './UserBooking';
import CompanyBooking from './CompanyBooking';
import ConfirmationPage from "./ConfirmationPage";
import Profile from './Profile';
import ServiceForm from './serviceForm';
import Services from './services';


function App() {

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />}>
        </Route>
        {/* <Route exact path="/login" element={<Login />}>
        </Route> */}
        <Route exact path="/profile" element={<Profile />}>
        </Route>
        <Route exact path="/serviceForm" element={<ServiceForm />}>
        </Route>
        <Route exact path="/services" element={<Services />}>
        </Route>
        <Route exact path="/companies/:companyId" element={<CompanyDetails />}>
        </Route>
        <Route exact path="/bookings-user/:userId" element={<UserBooking />}>
        </Route>
        <Route exact path="/bookings-company/:companyId" element={<CompanyBooking />}>
        </Route>
        <Route exact path="/checkout" element={<CheckoutPage />}>
        </Route>
        <Route exact path="/confirmation" element={<ConfirmationPage />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



