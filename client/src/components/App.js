import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from './Profile';
import ServiceForm from './ServiceForm';
import Services from './AllServicesPage';
import UserServicesPage from './UserServicesPage';
import ServiceDetail from './ServiceDetail'; 
import ServiceProviderPage from './ServiceProviderPage';
import Offers from './Offers';

function App() {

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />}>
        </Route>
        <Route exact path="/profile" element={<Profile />}>
        </Route>
        <Route exact path="/serviceForm" element={<ServiceForm />}>
        </Route>
        <Route exact path="/service-provider/services" element={<Services />}>
        </Route>
        <Route exact path="/service-provider/offers" element={<Offers />}>
        </Route>
        <Route exact path="/service-provider" element={<ServiceProviderPage />}>
        </Route>
        <Route exact path="/services/:_id" element={<ServiceDetail />}>
        </Route>
        <Route exact path="/user-services" element={<UserServicesPage />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



