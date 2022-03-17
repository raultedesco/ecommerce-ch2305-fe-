import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import Error from "./components/Error";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Chat from "./components/Chat";
// Styles
import "./App.css";
// Fake Data
import data from "./data";
import axios from "axios";

function App() {
  const [dataProducts, setDataProducts] = useState();
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get("https://ecommerce-ch2305.herokuapp.com/api/productos/");
      console.log(response);
      setDataProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header countCartItems={cartItems.length}></Header>
          <div className="row">
            <Routes>
              <Route
                index="/"
                element={
                  <>
                    <Home products={dataProducts} onAdd={onAdd} />
                    <div>
                      <div>
                        <Carrito
                          cartItems={cartItems}
                          onAdd={onAdd}
                          onRemove={onRemove}
                        />
                      </div>
                      <div className="block col-1">
                        <Chat></Chat>
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/carrito"
                element={
                  <Carrito
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                }
              />

              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
