import React from 'react';
import './shoppage.css';

const products = [
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/1.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/2.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/3.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/4.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/5.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/6.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/7.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/8.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/9.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/10.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/shoe1.png" },
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", image: "/src/assets/shoe2.png" },
];

const ShopPage = () => {
  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Shop</h1>
          <p className="text-gray-500 mt-2">Home &gt; Shop</p>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              <span>Filter</span>
            </button>
            <div className="flex space-x-2">
              <button><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
              <button><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></button>
            </div>
            <p className="text-gray-600">Showing 1-16 of 32 results</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="show">Show</label>
              <select id="show" className="border rounded p-1">
                <option>16</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" className="border rounded p-1">
                <option>Default</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            <button className="px-4 py-2 bg-black text-white rounded-md">1</button>
            <button className="px-4 py-2 border rounded-md">2</button>
            <button className="px-4 py-2 border rounded-md">3</button>
            <button className="px-4 py-2 border rounded-md">Next</button>
          </nav>
        </div>
      </main>

      <section className="bg-gray-200 mt-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12">
          <div>
            <h4 className="text-xl font-bold">Free Delivery</h4>
            <p className="text-gray-600 mt-2">Worldwide delivery on all orders. Over $150.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">90 Days Return</h4>
            <p className="text-gray-600 mt-2">No question ask. We have an easy return policy.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">Secure Payment</h4>
            <p className="text-gray-600 mt-2">We use the most secure payment gateways.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
