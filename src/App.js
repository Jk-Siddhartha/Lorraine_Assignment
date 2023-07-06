import React, { createContext, useReducer, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Logout from "./Components/Logout";

import { initialState, reducer } from "./Reducer/UseReducer";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cartList, setCardList] = useState([]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Homepage cartList={cartList} setCardList={setCardList} />
              }
              exact
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={<Cart cartList={cartList} setCardList={setCardList} />}
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
