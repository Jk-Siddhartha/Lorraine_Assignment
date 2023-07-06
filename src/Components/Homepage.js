import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Homepage = ({ cartList, setCardList }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { login, userName } = location.state || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const addCart = (pid) => {
    alert("Added to Cart");
    setCardList([...cartList, products[pid]]);
  };

  return (
    <>
      <div className="homepage">
        <Navbar />
        <marquee behavior="" direction="">
          Welcome to the E-Commerce website. Here you will find whatever u want
          in just few clicks....
        </marquee>
        <div className="products">
          {products.map((curr) => {
            return (
              <div className="product">
                <img src={curr.img} alt="" />
                <h3>{curr.name}</h3>
                <p>
                  <span>${curr.price}</span>
                  <button
                    className="btn add-to-card-btn"
                    onClick={() => addCart(curr.pid)}
                  >
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
