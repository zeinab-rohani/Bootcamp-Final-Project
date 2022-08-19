import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import CompanyDetails from "./CompanyDetails";
import CheckoutPage from "./CheckoutPage";
import UserBooking from './UserBooking';
import CompanyBooking from './CompanyBooking';
import ConfirmationPage from "./ConfirmationPage";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />}>
          {/* <HomePage /> */}
        </Route>
        <Route exact path="/companies/:companyId" element={<CompanyDetails />}>
          {/* <CompanyDetails /> */}
        </Route>
        <Route exact path="/bookings-user/:userId" element={<UserBooking />}>
          {/* <UserBooking /> */}
        </Route>
        <Route exact path="/bookings-company/:companyId" element={<CompanyBooking />}>
          {/* <CompanyBooking /> */}
        </Route>
        <Route exact path="/checkout" element={<CheckoutPage />}>
          {/* <CheckoutPage /> */}
        </Route>
        <Route exact path="/confirmation" element={<ConfirmationPage />}>
          {/* <ConfirmationPage /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



