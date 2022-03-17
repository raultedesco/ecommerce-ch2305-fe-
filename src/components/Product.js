import React from 'react';

export default function Product(props) {
  // const prefixPath='http://localhost:3001/images/products/'
  const prefixPath='https://ecommerce-ch2305.herokuapp.com/images/products/'
  const { product, onAdd } = props;
  return (
    <div className='card'>
      <img className="small" src={prefixPath+product.image} alt={product.name} />
      <h3>{product.description}</h3>
      <div>${product.price}</div>
      <div>{product._id}</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}