import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import VisualizationSection from "../components/Analysis/VisualizationSection";
import { useAuth } from "../hooks/useAuth";
import carModelsUSA from "../data/car_models.json";
import carModelsKSA from "../data/carModels.json";

const Analysis = () => {
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

  // New state variables for year, mileage, and clean title
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [cleanTitle, setCleanTitle] = useState("");

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
        <h1 className="text-4xl p-7 font-semibold flex justify-center mt-14">
          Prediction Page
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
                <div className="card-body items-center">
                  {/* Market Selection */}
                  <div className="w-full max-w-xs mt-4 mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-center">
                      Select Market
                    </h3>
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        className={`btn ${
                          market === "USA" ? "btn-active" : "btn-neutral"
                        }`}
                        onClick={() => setMarket("USA")}
                      >
                        USA Market
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          market === "KSA" ? "btn-active" : "btn-neutral"
                        }`}
                        onClick={() => setMarket("KSA")}
                      >
                        KSA Market
                      </button>
                    </div>
                  </div>

                  {/* Car Make Selection */}
                  {market && (
                    <div className="w-full max-w-xs mt-4">
                      <h3 className="text-2xl font-semibold mb-4">
                        Select Car Make
                      </h3>
                      <select
                        className="select select-neutral w-full max-w-xs"
                        value={selectedMake}
                        onChange={handleMakeChange}
                        required
                      >
                        <option value="" disabled hidden>
                          Choose Make
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
                      <h3 className="text-2xl font-semibold mb-4">
                        Select Car Model
                      </h3>
                      <select
                        className="select select-neutral w-full max-w-xs"
                        value={selectedModel}
                        onChange={handleModelChange}
                        required
                      >
                        <option value="" disabled hidden>
                          Choose Model
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
                        <h3 className="text-2xl font-semibold mb-4">Year</h3>
                        <select
                          className="select select-neutral select-bordered w-full max-w-xs"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                        >
                          <option value="" disabled>
                            Select Year
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
                        <h3 className="text-2xl font-semibold mb-4">Mileage</h3>
                        <input
                          type="number"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          placeholder="Enter Mileage"
                          min="0"
                          max="1000000" // Adjust this limit based on typical mileage ranges
                          required
                        />
                      </div>

                      {/* Clean Title Dropdown */}
                      <div className="w-full max-w-xs mt-4 pb-6">
                        <h3 className="text-2xl font-semibold mb-4">
                          Clean Title
                        </h3>
                        <select
                          className="select select-neutral w-full max-w-xs"
                          value={cleanTitle}
                          onChange={(e) => setCleanTitle(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Option
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn btn-neutral w-full max-w-xs text-xl mt-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Estimate"
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

export default Analysis;
