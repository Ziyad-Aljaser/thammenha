import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./VisualizationSection.css"; // Import CSS file for animations

const VisualizationSection = ({ predictedPrice, currency }) => {
  const { t } = useTranslation(); // Use the hook to access translations
  const navigate = useNavigate(); // Initialize navigate
  const [displayPrice, setDisplayPrice] = useState(
    Math.floor(Math.random() * 100000)
  ); // Set initial random value
  const [animationRunning, setAnimationRunning] = useState(true); // State to control the animation
  const [showFinalPrice, setShowFinalPrice] = useState(false); // State to trigger final price animation

  useEffect(() => {
    let interval; // Declare interval variable outside of useEffect
    if (animationRunning) {
      interval = setInterval(() => {
        // Generate random numbers within a realistic range
        const randomPrice = Math.floor(Math.random() * 100000) + 50000; // Random value within a range
        setDisplayPrice(randomPrice);
      }, 100); // Update every 100 milliseconds
    }

    if (predictedPrice && !animationRunning) {
      clearInterval(interval);
      setTimeout(() => {
        setShowFinalPrice(true); // Trigger the final price animation
      }, 100); // Small delay to ensure the animation is visible
      setDisplayPrice(predictedPrice);
    }

    // Cleanup interval on component unmount or when animation stops
    return () => clearInterval(interval);
  }, [predictedPrice, animationRunning]);

  useEffect(() => {
    // Stop the animation and display the final predicted price after 3 seconds
    const timeout = setTimeout(() => {
      setAnimationRunning(false);
    }, 3000); // Runs for 3 seconds

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  // Calculate the range prices with a 5% decrease and increase
  const priceLowerLimit = predictedPrice * 0.95;
  const priceUpperLimit = predictedPrice * 1.05;

  // Determine the currency symbol based on the currency prop
  const currencySymbol = currency === "USD" ? "USD" : "SAR";

  return (
    <div className="flex items-center justify-center bg-base-300 p-5">
      <div className="card w-1/2 glass shadow-xl p-6 mb-6 bg-base-200">
        <div className="card-body items-center">
          <p
            className="text-2xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("visualization.estimated_price")}
          </p>
          <div
            className={`text-6xl py-16 flex items-baseline ${
              showFinalPrice ? "final-price-animation" : ""
            }`}
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {animationRunning ? (
              <span dir="ltr" className="ml-2">
                {Math.round(displayPrice).toLocaleString()} {currencySymbol}
              </span>
            ) : (
              <span
                dir="ltr"
                className="ml-2"
                style={{ color: "red" }} // Set text color to red
              >
                {Math.round(priceLowerLimit).toLocaleString()} -{" "}
                {Math.round(priceUpperLimit).toLocaleString()} {currencySymbol}
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-neutral w-full max-w-xs text-xl mt-12"
            onClick={() => navigate("/")} // Navigate back to home
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("visualization.go_home")}{" "}
            {/* Translation key for the button text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationSection;
