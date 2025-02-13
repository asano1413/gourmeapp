import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page.</p>
      </div>
    </div>
  );
};

export default Home;