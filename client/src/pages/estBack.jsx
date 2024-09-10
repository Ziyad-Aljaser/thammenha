const [accident, setAccident] = useState("");
const [vehicleAge, setVehicleAge] = useState("");
const [mileagePerYear, setMileagePerYear] = useState("");
const [horsepower, setHorsepower] = useState("");
const [isLuxuryBrand, setIsLuxuryBrand] = useState("");

const [cleanTitle, setCleanTitle] = useState("");
const [powerToWeightRatio, setPowerToWeightRatio] = useState("");
const [accidentImpact, setAccidentImpact] = useState("");

{
  /* Clean Title Dropdown */
}
<div className="w-full max-w-xs mt-4 pb-6">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.clean_title")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={cleanTitle}
    onChange={(e) => setCleanTitle(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;

{
  /* Power to Weight Ratio Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.power_to_weight_ratio")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={powerToWeightRatio}
    onChange={(e) => setPowerToWeightRatio(e.target.value)}
    placeholder={t("estimator.enter_power_to_weight_ratio")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Accident Impact Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.accident_impact")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={accidentImpact}
    onChange={(e) => setAccidentImpact(e.target.value)}
    placeholder={t("estimator.enter_accident_impact")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Accident Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.accident")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={accident}
    onChange={(e) => setAccident(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;

{
  /* Vehicle Age Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.vehicle_age")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={vehicleAge}
    onChange={(e) => setVehicleAge(e.target.value)}
    placeholder={t("estimator.vehicle_age")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Mileage per Year Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.mileage_per_year")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={mileagePerYear}
    onChange={(e) => setMileagePerYear(e.target.value)}
    placeholder={t("estimator.mileage_per_year")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Horsepower Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.horsepower")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={horsepower}
    onChange={(e) => setHorsepower(e.target.value)}
    placeholder={t("estimator.horsepower")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Is Luxury Brand Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.is_luxury_brand")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={isLuxuryBrand}
    onChange={(e) => setIsLuxuryBrand(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;



import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import VisualizationSection from "../components/Analysis/VisualizationSection";
import { useAuth } from "../hooks/useAuth";
import carModelsUSA from "../data/car_models.json";
import carModelsKSA from "../data/carModels.json";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { fetchExpectedPrice } from "../utils/PythonAPI";

const Estimation = () => {
  const carDetails = {
    Car_Brands: "Lexus", // Must match one of the expected brands
    Car_Models: "LX", // Must match one of the expected models
    Car_Years: 2020, // int: Year of the car
    Car_Kilometers: 15000, // int: Kilometers driven
    Car_Fuel_Types: "Gasoline", // str: Ensure correct fuel type is used
    Car_Gear_Types: "Automatic", // str: Ensure correct gear type
    Car_Engine_Sizes: 1.8, // float: Engine size
    Car_Drivetrains: "FWD", // str: Drivetrain type
    Car_Extensions: "500", // str: Must match one of the expected extensions
    Car_Exterior_Colors: "Black", // str: Must match expected color
    Car_Interior_Colors: "Camel", // str: Must match expected interior color
    Car_Seat_Numbers: 5, // int: Number of seats
    Car_Origins: "Saudi", // str: Must match expected origin
  };

  const { t } = useTranslation(); // Use the hook to access translations
  const [showAnalysisCard, setShowAnalysisCard] = useState(true);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const userID = currentUser?.uid;

  const [market, setMarket] = useState(""); // State for market selection
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]); // State for models dataset
  const [makes, setMakes] = useState([]);

  // Define state variables and their setters
  const [fuelType, setFuelType] = useState("");
  const [engineSize, setEngineSize] = useState("");

  // New state variables for year, mileage, and clean title
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const [transmission, setTransmission] = useState("");
  const [extCol, setExtCol] = useState("");
  const [intCol, setIntCol] = useState("");

  const [seatNumbers, setSeatNumbers] = useState("");
  const [carOrigins, setCarOrigins] = useState("");
  const [carDrivetrains, setCarDrivetrains] = useState("");
  const [carExtensions, setCarExtensions] = useState("");

  // Load models when the market changes
  useEffect(() => {
    if (market === "USA") {
      setAllModels(carModelsUSA);
    } else if (market === "KSA") {
      setAllModels(carModelsKSA);
      fetchExpectedPrice(carDetails)
        .then((price) => console.log("Expected Price:", price))
        .catch((error) => console.error("Error:", error));
    } else {
      setAllModels([]);
    }
    // Reset related states when the market changes
    setSelectedMake("");
    setSelectedModel("");
    setModels([]);
    setMakes([]);
  }, [market]);

  // Update makes when allModels changes
  useEffect(() => {
    if (allModels) {
      const makesFromJson = Object.keys(allModels);
      setMakes(makesFromJson);
    }
  }, [allModels]);

  const handleMakeChange = (e) => {
    const make = e.target.value;
    setSelectedMake(make);
    setModels(allModels[make] || []);
    setSelectedModel(""); // Reset model when make changes
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleGenerateReport = () => {
    setIsLoading(true);

    // Simulating data processing
    setTimeout(() => {
      setShowVisualization(true);
      setShowAnalysisCard(false);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="flex flex-col p-3 bg-base-300">
        <h1
          className="text-4xl p-7 font-semibold flex justify-center mt-14"
          style={{ fontFamily: "'El Messiri', sans-serif" }}
        >
          {t("estimator.estimator_title")}
        </h1>

        {showAnalysisCard && (
          <div className="flex items-center justify-center bg-base-300 p-5">
            <div className="card w-full max-w-xl glass shadow-xl p-6 mb-28">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerateReport();
                }}
              >
                <div
                  className="card-body items-center"
                  style={{ fontFamily: "'El Messiri', sans-serif" }}
                >
                  {/* Market Selection */}
                  <div className="w-full max-w-xs mt-4 mb-6">
                    <h3
                      className="text-2xl font-semibold mb-4 text-center"
                      style={{ fontFamily: "'El Messiri', sans-serif" }}
                    >
                      {t("estimator.select_market")}
                    </h3>
                    <div className="flex justify-center gap-4">
                      <button
                        type="button"
                        className={`btn ${
                          market === "USA" ? "btn-neutral" : "btn-active"
                        }`}
                        onClick={() => setMarket("USA")}
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        {t("estimator.usa_market")}
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          market === "KSA" ? "btn-neutral" : "btn-active"
                        }`}
                        onClick={() => setMarket("KSA")}
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        {t("estimator.ksa_market")}
                      </button>
                    </div>
                  </div>

                  {/* Car Make Selection */}
                  {market && (
                    <div className="w-full max-w-xs mt-4">
                      <h3
                        className="text-2xl font-semibold mb-4"
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        {t("estimator.select_car_make")}
                      </h3>
                      <select
                        className="select select-neutral w-full max-w-xs"
                        value={selectedMake}
                        onChange={handleMakeChange}
                        required
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        <option value="" disabled hidden>
                          {t("estimator.choose_make")}
                        </option>
                        {makes.map((make) => (
                          <option key={make} value={make}>
                            {make}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Car Model Selection based on Make */}
                  {selectedMake && (
                    <div className="w-full max-w-xs mt-4">
                      <h3
                        className="text-2xl font-semibold mb-4"
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        {t("estimator.select_car_model")}
                      </h3>
                      <select
                        className="select select-neutral w-full max-w-xs"
                        value={selectedModel}
                        onChange={handleModelChange}
                        required
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                      >
                        <option value="" disabled hidden>
                          {t("estimator.choose_model")}
                        </option>
                        {models.map((model, index) => (
                          <option key={index} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Additional Fields: Year, Mileage, Clean Title */}
                  {selectedModel && (
                    <>
                      {/* Year Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.year")}
                        </h3>
                        <select
                          className="select select-neutral select-bordered w-full max-w-xs"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled>
                            {t("estimator.select_year")}
                          </option>
                          {Array.from(
                            { length: 2024 - 2000 + 1 },
                            (_, i) => 2000 + i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Mileage Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.mileage")}
                        </h3>
                        <input
                          type="number"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          placeholder={t("estimator.enter_mileage")}
                          min="0"
                          max="1000000"
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Fuel Type Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.fuel_type")}
                        </h3>
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_fuel_type")}
                          </option>
                          <option value="Petrol">
                            {t("estimator.petrol")}
                          </option>
                          <option value="Diesel">
                            {t("estimator.diesel")}
                          </option>
                          <option value="Electric">
                            {t("estimator.electric")}
                          </option>
                        </select>
                      </div>

                      {/* Transmission Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.transmission")}
                        </h3>
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={transmission}
                          onChange={(e) => setTransmission(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_option")}
                          </option>
                          <option value="Automatic">
                            {t("estimator.automatic")}
                          </option>
                          <option value="Manual">
                            {t("estimator.manual")}
                          </option>
                        </select>
                      </div>

                      {/* Engine Size Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.engine_size")}
                        </h3>
                        <input
                          type="number"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={engineSize}
                          onChange={(e) => setEngineSize(e.target.value)}
                          placeholder={t("estimator.enter_engine_size")}
                          min="0"
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Car Drivetrains Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.car_drivetrains")}
                        </h3>
                        <input
                          type="text"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={carDrivetrains}
                          onChange={(e) => setCarDrivetrains(e.target.value)}
                          placeholder={t("estimator.enter_car_drivetrains")}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Car Extensions Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.car_extensions")}
                        </h3>
                        <input
                          type="text"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={carExtensions}
                          onChange={(e) => setCarExtensions(e.target.value)}
                          placeholder={t("estimator.enter_car_extensions")}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Exterior Color Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.ext_col")}
                        </h3>
                        <input
                          type="text"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={extCol}
                          onChange={(e) => setExtCol(e.target.value)}
                          placeholder={t("estimator.ext_col")}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Interior Color Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.int_col")}
                        </h3>
                        <input
                          type="text"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={intCol}
                          onChange={(e) => setIntCol(e.target.value)}
                          placeholder={t("estimator.int_col")}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Car Seat Numbers Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.car_seat_numbers")}
                        </h3>
                        <input
                          type="number"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={seatNumbers}
                          onChange={(e) => setSeatNumbers(e.target.value)}
                          placeholder={t("estimator.enter_car_seat_numbers")}
                          min="1"
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>

                      {/* Car Origins Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.car_origins")}
                        </h3>
                        <input
                          type="text"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={carOrigins}
                          onChange={(e) => setCarOrigins(e.target.value)}
                          placeholder={t("estimator.enter_car_origins")}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn btn-neutral w-full max-w-xs text-xl mt-12"
                    disabled={isLoading}
                    style={{ fontFamily: "'El Messiri', sans-serif" }}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      t("estimator.estimate")
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showVisualization && (
          <VisualizationSection
            userID={userID}
            // Pass additional data as needed
          />
        )}
      </div>
    </Layout>
  );
};

export default Estimation;


import React, { useState } from 'react';
import { fetchExpectedPrice } from "../utils/PythonAPI";

const Estimation = () => {
  
  const [carDetails, setCarDetails] = useState({
    Car_Brands: "Toyota",
    Car_Models: "Camry",
    Car_Years: 2024,
    Car_Kilometers: 500,
    Car_Fuel_Types: "Gasoline",       // Adjusted to match backend expectations
    Car_Gear_Types: "Automatic",
    Car_Engine_Sizes: 2.9,
    Car_Drivetrains: "FWD",
    Car_Extensions: "XLE",
    Car_Exterior_Colors: "Black",
    Car_Interior_Colors: "Camel",
    Car_Seat_Numbers: 5,
    Car_Origins: "Saudi",
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const price = await fetchExpectedPrice(carDetails);
      setPredictedPrice(price);
      setError(null);
    } catch (err) {
      console.error('Error fetching expected price:', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Car Price Estimator</h1>
      <button onClick={handleSubmit}>Get Predicted Price</button>
      {predictedPrice && <p>Predicted Price: {predictedPrice}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Estimation;
