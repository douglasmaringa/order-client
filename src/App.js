import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import SingleFood from "./screens/SingleFood";
import Checkout from "./screens/Checkout"
import Account from "./screens/Account";
import AdminType from "./screens/AdminType";
import AdminOrders from "./screens/AdminOrders";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CookiesProvider } from 'react-cookie';
import Details from "./screens/Details";



function App() {
  const stripePromise = loadStripe('pk_test_51KMqGsDBtXSb4FLsmDPlRTmzqfEWjabkis9gEM6JrWDTXr4rtb41Ex7w1A26ekSIRJiNlhS5mhtLBtdw9UqQB882009rzq4BfN');
    
  return (
    <BrowserRouter>
      <CookiesProvider>
       <Elements stripe={stripePromise}>
    <Routes> 
      <Route path="/" element={<SingleFood />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<Details />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admintype" element={<AdminType/>} />
      <Route path="/adminorders" element={<AdminOrders/>} />
    </Routes>
    </Elements>
    </CookiesProvider>
  </BrowserRouter>
  );
}

export default App;
