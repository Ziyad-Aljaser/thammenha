import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import VisualizationSection from "../components/Analysis/VisualizationSection";
import { useAuth } from "../hooks/useAuth";

const Analysis = () => {
  const [showAnalysisCard, setShowAnalysisCard] = useState(true);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const userID = currentUser?.uid;

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [allModels] = useState({
    Toyota: [
      "Corolla",
      "Camry",
      "RAV4",
      "Highlander",
      "Prius",
      "Tacoma",
      "Tundra",
      "4Runner",
      "Sienna",
      "Avalon",
    ],
    Hyundai: [
      "Elantra",
      "Sonata",
      "Tucson",
      "Santa Fe",
      "Kona",
      "Palisade",
      "Veloster",
      "Accent",
      "Ioniq",
      "Genesis",
    ],
  });

  // New state variables for year, mileage, and clean title
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [cleanTitle, setCleanTitle] = useState("");

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
        <h1 className="text-4xl p-7 font-semibold flex justify-center">
          Analysis Page
        </h1>

        {showAnalysisCard && (
          <div className="flex items-center justify-center bg-base-300 p-5">
            <div className="card w-full max-w-xl glass shadow-xl p-6 mb-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerateReport();
                }}
              >
                <div className="card-body items-center">
                  {/* Car Make Selection */}
                  <div className="w-full max-w-xs mt-8">
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
                      <option value="Toyota">Toyota</option>
                      <option value="Hyundai">Hyundai</option>
                    </select>
                  </div>

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
                        <input
                          type="number"
                          className="input input-neutral input-bordered w-full max-w-xs"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="Enter Year"
                          required
                        />
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
                    className="btn btn-neutral w-full max-w-xs text-xl mt-8"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Generate Report"
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
