import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import VisualizationSection from "../components/Analysis/VisualizationSection";
import { useAuth } from "../hooks/useAuth";
import carModelsUSA from "../data/car_models.json";
import carModelsKSA from "../data/carModels.json";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Estimation = () => {
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
