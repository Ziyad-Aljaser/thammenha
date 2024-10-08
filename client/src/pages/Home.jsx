// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import hero_img_ar from "../assets/logo.png";
import hero_img_en from "../assets/logo-en.png";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { currentUser } = useAuth();
  const { t, i18n } = useTranslation(); // Correct use of useTranslation hook

  // Determine the text alignment and image based on the current language
  const isArabic = i18n.language === "ar";
  const heroImg = isArabic ? hero_img_ar : hero_img_en; // Choose the image based on the language

  return (
    <Layout>
      <div className="hero py-12 sm:py-16 bg-base-300">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          {/* Text Block with Creative Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} // Slight slide in from the right with fade-in
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className={`md:order-2 ${isArabic ? "text-right" : "text-left"}`} // Adjust text alignment
          >
            <h1
              className="text-4xl sm:text-5xl font-bold leading-normal"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            >
              {/* For English welcome message */}
              {t("home.welcome").includes("Thammenha") ? (
                <>
                  {t("home.welcome").split("Thammenha")[0]}
                  <span className="text-red-500">Thammenha</span>
                  {t("home.welcome").split("Thammenha")[1]}
                </>
              ) : (
                // For Arabic welcome message
                <>
                  {t("home.welcome").split("ثمنها")[0]}
                  <span className="text-red-500">ثمنها</span>
                  {t("home.welcome").split("ثمنها")[1]}
                </>
              )}
            </h1>

            {/* Image for Small Screens */}
            <div className="order-2 block md:hidden">
              <img src={heroImg} alt="Hero" className="w-4/6 h-auto mx-auto" />
            </div>

            <p
              className="pt-6 text-3xl leading-normal"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            >
              {t("home.description")}
            </p>

            <p
              className="pb-12 text-md leading-normal"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            >
              {t("home.coming_soon")}
            </p>

            <div className="flex justify-center gap-2">
              <Link
                to="/about"
                className="btn btn-neutral flex-grow text-xl"
                style={{ fontFamily: "'El Messiri', sans-serif" }}
              >
                {t("home.about_us")}
              </Link>

              {!currentUser && (
                <Link
                  to="/estimation"
                  className="btn btn-neutral flex-grow text-xl ml-2"
                  style={{ fontFamily: "'El Messiri', sans-serif" }}
                >
                  {t("home.get_started")}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Image Block with Creative Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} // Slight slide in from the right with fade-in
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50 }} // Add a bouncy and springy effect
            className="order-1 hidden md:block ml-auto md:order-1"
          >
            <img src={heroImg} alt="Hero" className="max-w-full h-auto" />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
