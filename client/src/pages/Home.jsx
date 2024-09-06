import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../hooks/useAuth";

import hero_img from "../assets/logo.png";

import Layout from "../components/Layout/Layout";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <Layout>
      {/* The padding is smaller when the screen is smal */}
      <div className="hero py-12 sm:py-16 bg-base-300">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          {/* The image for large screen */}
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="order-2 hidden md:block ml-auto"
          >
            <img src={hero_img} alt="Hero" />
          </motion.div>

          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }} // Adjusted properties
          >
            <h1 className="text-4xl sm:text-5xl font-bold leading-normal">
              Welcome to Thammenha, Your Personal Used Car Price Estimator!
            </h1>

            {/* The image for small screen */}
            <div className="order-2 block md:hidden">
              <img src={hero_img} alt="Hero" className="w-4/6 h-auto mx-auto" />
            </div>

            <p className="pt-6 text-3xl leading-normal">
              Easily Estimate Your Car's Value with Just a Few Clicks! Input Key
              Details and Let Our AI Do the Rest.
            </p>
            <p className="pb-12 text-md leading-normal">
              Coming Soon: Photo Assessment for Accidents!
            </p>

            <div className="flex justify-center gap-2">
              <Link to="/about" className="btn btn-neutral flex-grow text-xl">
                About us
              </Link>
              {!currentUser && (
                <Link
                  to="/signup"
                  className="btn btn-neutral flex-grow text-xl ml-2"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
