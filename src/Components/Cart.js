import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = ({ cartList, setCardList }) => {
  const deleteProduct = (pid) => {
    alert("Removed from Cart");
    const updatedCartList = cartList.filter((item) => item.pid !== pid);
    setCardList(updatedCartList);
  };
  return (
    <>
      <div className="cart-page">
        <Navbar />
        {console.log(cartList)}
        <div className="products">
          {cartList.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            cartList.map((curr) => (
              <div className="product">
                <img src={curr.img} alt="" />
                <h3>{curr.name}</h3>
                <p>
                  <span>${curr.price}</span>
                </p>
                <button className="btn" onClick={() => deleteProduct(curr.pid)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
