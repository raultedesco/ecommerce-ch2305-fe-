import React, { useContext } from "react";
import Product from "./Product";
import {userContext} from '../context/userContext';

export default function Home(props) {
  const { products, onAdd } = props;
  const [userGlobal, setUserGlobal] = useContext(userContext);
  // console.log('productos'+products)
  console.log(userGlobal)
  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        {products ? (
          products.map((product) => (
            <Product
              key={product._id}
              product={product}
              onAdd={onAdd}
            ></Product>
          ))
        ) : (
          <h2>No se encontraron productos</h2>
        )}

        {/* {products.map((product) => (
          <Product key={product._id} product={product} onAdd={onAdd}></Product>
        ))} */}
      </div>
    </main>
  );
}
