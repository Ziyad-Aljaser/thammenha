import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import VisualizationSection from "../components/Analysis/VisualizationSection";
import carModelsUSA from "../data/USA_car_models.json";
import carModelsKSA from "../data/KSA_car_models.json";
import { useTranslation } from "react-i18next";
import { fetchExpectedPrice } from "../utils/PythonAPI";

const Estimation = () => {
  const { t } = useTranslation();
  const [showAnalysisCard, setShowAnalysisCard] = useState(true);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [market, setMarket] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [extCol, setExtCol] = useState("");
  const [intCol, setIntCol] = useState("");
  const [seatNumbers, setSeatNumbers] = useState("");
  const [carOrigins, setCarOrigins] = useState("");
  const [carDrivetrains, setCarDrivetrains] = useState("");
  const [carExtensions, setCarExtensions] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [accidentsOrDamage, setAccidentsOrDamage] = useState(""); // State for accidents or damage

  useEffect(() => {
    if (market === "USA") {
      setAllModels(carModelsUSA);
    } else if (market === "KSA") {
      setAllModels(carModelsKSA);
    } else {
      setAllModels([]);
    }
    // Clear all input fields when the market changes
    setSelectedMake("");
    setSelectedModel("");
    setModels([]);
    setMakes([]);
    setFuelType("");
    setEngineSize("");
    setYear("");
    setMileage("");
    setTransmission("");
    setExtCol("");
    setIntCol("");
    setSeatNumbers("");
    setCarOrigins("");
    setCarDrivetrains("");
    setCarExtensions("");
    setPredictedPrice(null);
    setAccidentsOrDamage(0);
  }, [market]);

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
    setSelectedModel("");
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleKSAGenerateReport = async () => {
    console.log("handleKSAGenerateReport called");
    // setIsLoading(true);
    setShowVisualization(true);
    setShowAnalysisCard(false);
    const carDetails = {
      Car_Brands: selectedMake, // str
      Car_Models: selectedModel, // str
      Car_Years: parseInt(year), // int
      Car_Kilometers: parseInt(mileage), // int
      Car_Fuel_Types: fuelType, // str
      Car_Gear_Types: transmission, // str
      Car_Engine_Sizes: parseFloat(engineSize), // float
      Car_Drivetrains: carDrivetrains, // str
      Car_Extensions: carExtensions, // str
      Car_Exterior_Colors: extCol, // str
      Car_Interior_Colors: intCol, // str
      Car_Seat_Numbers: parseInt(seatNumbers), // int
      Car_Origins: carOrigins, // str
    };

    try {
      console.log("fetchExpectedPrice called");
      const price = await fetchExpectedPrice(carDetails, "ksa");
      setPredictedPrice(price);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUSAGenerateReport = async () => {
    console.log("handleUSAGenerateReport called");
    setShowVisualization(true);
    setShowAnalysisCard(false);

    const carDetails = {
      manufacturer: selectedMake, // Mapping Car_Brands to manufacturer
      model: selectedModel, // Mapping Car_Models to model
      year: parseInt(year), // Mapping Car_Years to year
      mileage: parseInt(mileage), // Mapping Car_Kilometers to mileage
      mpg: fuelType === "Gasoline" ? 30 : 20, // Example MPG value based on fuel type
      drivetrain: carDrivetrains, // Direct mapping of drivetrain
      accidents_or_damage: 0, // Default value; adjust based on data availability
      // Add any additional mappings as required
    };

    try {
      console.log("fetchExpectedPrice called for USA");
      const price = await fetchExpectedPrice(carDetails, "usa"); // Specify 'usa' for the region
      setPredictedPrice(price);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col p-3 bg-base-300">
        <h1
          className="text-4xl p-7 font-semibold flex justify-center mt-6"
          style={{ fontFamily: "'El Messiri', sans-serif" }}
        >
          {showVisualization
            ? t("visualization.prediction_result")
            : t("estimator.estimator_title")}
        </h1>

        {showAnalysisCard && (
          <div className="flex items-center justify-center bg-base-300 p-5">
            <div className="card w-full max-w-xl glass shadow-xl p-6 mb-28">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (market === "KSA") {
                    handleKSAGenerateReport();
                  } else if (market === "USA") {
                    handleUSAGenerateReport();
                  }
                }}
              >
                <div
                  className="card-body items-center"
                  style={{ fontFamily: "'El Messiri', sans-serif" }}
                >
                  {/* Market Selection*/}
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

                  {/* KSA Market */}
                  {market === "KSA" && selectedModel && (
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
                          <option value="Gasoline">
                            {t("estimator.gasoline")}
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
                          step="0.1" // Allows input of decimals
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={engineSize}
                          onChange={(e) => setEngineSize(e.target.value)} // Parses the input as a float
                          placeholder={t("estimator.enter_engine_size")}
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
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={carDrivetrains}
                          onChange={(e) => setCarDrivetrains(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_option")}
                          </option>
                          <option value="RWD">RWD</option>
                          <option value="Double (4x4)">Double (4x4)</option>
                          <option value="FWD">FWD</option>
                          <option value="AWD">AWD</option>
                          <option value="4WD">4WD</option>
                        </select>
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
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={carOrigins}
                          onChange={(e) => setCarOrigins(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_option")}
                          </option>
                          <option value="Saudi">Saudi</option>
                          <option value="GCC">GCC</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Estimate Button */}
                      <button
                        type="submit"
                        className="btn btn-neutral w-full max-w-xs text-xl mt-12"
                        disabled={isLoading}
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        } // Scroll to top when clicked
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          t("estimator.estimate")
                        )}
                      </button>
                    </>
                  )}

                  {/* USA Market */}
                  {market === "USA" && selectedModel && (
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
                          <option value="Gasoline">
                            {t("estimator.gasoline")}
                          </option>
                          <option value="Diesel">
                            {t("estimator.diesel")}
                          </option>
                          <option value="Electric">
                            {t("estimator.electric")}
                          </option>
                        </select>
                      </div>

                      {/* Car Drivetrains Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.car_drivetrains")}
                        </h3>
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={carDrivetrains}
                          onChange={(e) => setCarDrivetrains(e.target.value)}
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_option")}
                          </option>
                          <option value="All-wheel Drive">RWD</option>
                          <option value="All-wheel Drive">FWD</option>
                          <option value="All-wheel Drive">AWD</option>
                          <option value="All-wheel Drive">4WD</option>
                        </select>
                      </div>

                      {/* Accidents or Damage Input */}
                      <div className="w-full max-w-xs mt-4">
                        <h3
                          className="text-2xl font-semibold mb-4"
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          {t("estimator.accidents_or_damage")}
                        </h3>
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={accidentsOrDamage}
                          onChange={(e) =>
                            setAccidentsOrDamage(parseInt(e.target.value))
                          }
                          required
                          style={{ fontFamily: "'El Messiri', sans-serif" }}
                        >
                          <option value="" disabled hidden>
                            {t("estimator.select_option")}
                          </option>
                          <option value="0">{t("estimator.no")}</option>
                          <option value="1">{t("estimator.yes")}</option>
                        </select>
                      </div>

                      {/* Estimate Button */}
                      <button
                        type="submit"
                        className="btn btn-neutral w-full max-w-xs text-xl mt-12"
                        disabled={isLoading}
                        style={{ fontFamily: "'El Messiri', sans-serif" }}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        } // Scroll to top when clicked
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          t("estimator.estimate")
                        )}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {showVisualization && (
          <VisualizationSection
            predictedPrice={predictedPrice}
            currency={market === "USA" ? "USD" : "KSA"}
          />
        )}
      </div>
    </Layout>
  );
};

export default Estimation;
