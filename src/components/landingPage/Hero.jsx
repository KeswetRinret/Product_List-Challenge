
import React, { useState } from "react";
import { FaTimes, FaCartPlus } from "react-icons/fa";

const desserts = [
  { name: "Baklava", description: "Pistachio Baklava", price: "$4.00", imgSrc: "https://img.freepik.com/free-photo/top-view-assorted-turkish-baklava-with-cup-tea-turkish-delight-wooden-plank_176474-3287.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "baklava dessert" },
  { name: "Macaron", description: "Macaron mix of 8", price: "$11.50", imgSrc: "https://img.freepik.com/premium-photo/photography-tasty-macarons_1288657-58543.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "macaron dessert" },
  { name: "Brownie", description: "Salted Caramel Brownie", price: "$4.00", imgSrc: "https://img.freepik.com/premium-photo/yummy-chocolate-brownie-photo-white-plate_1229564-157.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "brownie dessert" },
  { name: "Cake", description: "Red Velvet Cake", price: "$4.50", imgSrc: "https://img.freepik.com/free-photo/zoom-view-little-round-cake-decorated-with-strawberries-white-plate_176474-120149.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "cake" },
  { name: "Creme Brulee", description: "Vanilla Creme Brulee", price: "$7.00", imgSrc: "https://img.freepik.com/premium-photo/creme-brulee-with-side-vanilla-ice-cream-realisti_1114068-22594.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "creme-brulee dessert" },
  { name: "Pie", description: "Lemon Meringue Pie", price: "$5.00", imgSrc: "https://img.freepik.com/premium-photo/piece-delicious-lemon-meringue-pie-plate_392895-339940.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "meringue dessert" },
  { name: "Waffle", description: "Strawberry Cranberry Waffle", price: "$6.00", imgSrc: "https://img.freepik.com/free-photo/high-angle-waffles-with-strawberry-cranberries_23-2148297915.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "waffle dessert" },
  { name: "tiramisu", description:"Classic Tiramisu", price: "$5.50", imgSrc:"https://img.freepik.com/free-photo/close-up-fancy-dessert_23-2150527567.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "tiramisu dessert" },
  { name: "Panna-cotta", description:"Vanilla Panna-cotta", price: "$4.00", imgSrc: "https://img.freepik.com/premium-photo/creamy-panna-cotta-with-mango-garnish-delicious-food-photography_1020697-541252.jpg?ga=GA1.1.69646999.1714102091&semt=ais_hybrid", alt: "Panna-cotta dessert" },
];

const Hero = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(desserts.map(() => 0));
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAdd = (index) => {
    setActiveIndex(index);
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    updateCart(index, newQuantities[index]);
  };

  const handleSubtract = (index) => {
    if (quantities[index] > 0) {
      setActiveIndex(index);
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      updateCart(index, newQuantities[index]);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const updateCart = (index, quantity) => {
    const newCart = [...cart];
    const dessert = desserts[index];

    if (quantity > 0) {
      const existingItemIndex = newCart.findIndex((item) => item.name === dessert.name);
      if (existingItemIndex >= 0) {
        newCart[existingItemIndex].quantity = quantity;
      } else {
        newCart.push({ ...dessert, quantity });
      }
    } else {
      const updatedCart = newCart.filter((item) => item.name !== dessert.name);
      setCart(updatedCart);
      return;
    }
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.price.replace("$", "")) * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="flex flex-col md:flex-row mt-4">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {desserts.map((dessert, index) => (
            <div
              key={index}
              className="relative w-80 hover:cursor-pointer"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img
                className="w-72 h-64 rounded-md border-2 hover:border-orange-600 hover:scale-95 duration-300"
                src={dessert.imgSrc}
                alt={dessert.alt}
              />
              {hoverIndex === index && (
                <div className="absolute bottom-6 left-36 font-semibold transform -translate-y-12 -translate-x-1/2 flex items-center justify-center space-x-2">
                  <button
                    className={`text-black text-lg rounded-full w-8 h-8 flex justify-center items-center border border-gray-600 ${activeIndex === index ? "bg-orange-600" : "bg-white"}`}
                    onClick={() => handleSubtract(index)}
                  >
                    -
                  </button>
                  <span className={`text-black rounded-full px-2 ${activeIndex === index ? "bg-orange-600" : "bg-white"}`}>{quantities[index]}</span>
                  <button
                    className={`text-black text-lg rounded-full w-8 h-8 flex justify-center items-center border border-gray-600 ${activeIndex === index ? "bg-orange-600" : "bg-white"}`}
                    onClick={() => handleAdd(index)}
                  >
                    +
                  </button>
                </div>
              )}
              {hoverIndex !== index && (
                <button className="absolute font-sans font-semibold text-slate-600 text-sm items-center bottom-6 left-36 transform -translate-y-12 -translate-x-1/2 border border-gray-600 rounded-full w-32 p-1 flex justify-center bg-white">
                  <FaCartPlus className="mr-2 text-orange-600" />
                  Add to cart
                </button>
              )}
              <div className="mt-5">
                <p className="font-sans text-sm text-gray-950 flex justify-start">
                  {dessert.name}
                </p>
                <p className="font-sans text-lg font-semibold flex justify-start">
                  {dessert.description}
                </p>
                <p className="font-sans text-sm font-semibold text-orange-600 flex justify-start">
                  {dessert.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-[20%] bg-white p-4 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between mb-2 items-center">
              <p>{item.name}</p>
              <div className="flex items-center space-x-2">
                <p>
                  {item.quantity} x {item.price}
                </p>
                <button onClick={() => handleRemove(index)} className="text-red-600">
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-semibold">
            Total: ${getTotal()}
          </p>
          <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
