import React from "react";
import Navigation from "../../Components/Navbar/Navigation";
import Intro from "./Intro/Intro";
import About from "./About/About";
import ProductExample from "./ProductExample/ProductExample"
import Feature from "./Feature/Feature"
import Promotion from "./Promotion/Promotion"
import QuestionAnswer from "./QuestionAnswer/QuestionAnswer"
import Footer from "../../Components/Footer/Footer"

import "../../assets/Style/Home.css";

const Home = () => {
  return (
    <>
      <div className="p-x-16 bg-img-orange text-white pb-5 pt-4">
        <Navigation />
        <Intro />
      </div>
      <div className="p-x-16 pt-5 pb-5">
        <About />
      </div>
      <div className="p-x-16 pt-5 pb-5 bg-img-orange-2 text-white">
        <ProductExample />
      </div>
      <div className="p-x-16 pt-5 pb-5 ">
        <Feature />
      </div>
      <div className="p-x-16 pt-5 pb-5 bg-img-orange text-white">
        <Promotion />
      </div>
      <div className="p-x-16 pt-5 pb-5 ">
        <QuestionAnswer />
      </div>
      <div className="p-x-16 pt-5 pb-5 bg-dark text-white">
        <Footer />
      </div>
    </>
  );
};

export default Home;
