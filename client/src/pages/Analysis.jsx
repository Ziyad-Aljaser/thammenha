// TODO: Handle the form submission when the Python is not running

import React, { useState } from "react";

import Layout from "../components/Layout/Layout";

import StaticData from "../data/Brand_Data_Analyzed";

import VisualizationSection from "../components/Analysis/VisualizationSection";
import BrandNotFoundModal from "../components/Analysis/BrandNotFoundModal";
import PythonNotRunningModal from "../components/Analysis/PythonNotRunningModal";

import { fetchProcessedWord } from "../utils/PythonAPI";

import { useAuth } from "../hooks/useAuth";

const Analysis = () => {
  const [showAnalysisCard, setShowAnalysisCard] = useState(true); // New state to control analysis card visibility
  const [showVisualization, setShowVisualization] = useState(false); // New state to control visualization visibility
  const [keyword, setKeyword] = useState("");
  const [brandName, setBrandName] = useState(""); // State to store the brand name
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [useStaticData, setUseStaticData] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false); // New state to control brand modal visibility if it is not found
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false); // New state to control Python modal visibility if it is not running
  const [brandData, setBrandData] = useState([]); // State to store the brand data

  const [dataset, setDataset] = useState('');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  const { currentUser } = useAuth();

  const userID = currentUser?.uid;

  // Function to capitalize the first letter of a word
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const handleGenerateReport = () => {
    setIsLoading(true);
    const capitalizedBrand = capitalizeFirstLetter(keyword);
    setBrandName(capitalizedBrand); // Update the brand name

    if (useStaticData) {
      // Using timeout to simulate the API call
      setTimeout(() => {
        const currentBrandData = StaticData[capitalizedBrand]; // Use the local variable directly
        setBrandData(currentBrandData); // Update the brand data state
        if (currentBrandData && currentBrandData.length > 0) {
          // The brand exists, you can proceed to generate the report
          console.log("Generating report data:", currentBrandData);
          setShowVisualization(true);
          setShowAnalysisCard(false);
        } else {
          // The brand does not exist, handle the error appropriately
          console.log("Brand not found for:", capitalizedBrand);
          setIsBrandModalOpen(true); // Open the modal
        }

        setIsLoading(false);
      }, 2000);
      // Here is the API call to fetch the data from the Python server if not using static data
    } else {
      console.log("Generating report from API for brand:", capitalizedBrand);
      fetchProcessedWord(capitalizedBrand)
        .then((data) => {
          console.log("API Data:", data);
          setBrandData(data); // Assuming 'data' is the array or object you need
          if (data && data.length > 0) {
            // Adjust this condition based on the actual data structure
            setShowVisualization(true);
            setShowAnalysisCard(false);
          } else {
            console.log("No data returned for brand:", capitalizedBrand);
            setIsBrandModalOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching from API:", error);

          if (error.message === "Failed to fetch") {
            setIsPythonModalOpen(true);
          } else {
            setIsBrandModalOpen(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col p-3 bg-base-300">
        <h1 className="text-4xl p-7 font-semibold flex justify-center">
          Analysis Page
        </h1>

        {/* Conditional rendering based on showAnalysisCard state */}
        {showAnalysisCard && (
          <div className="flex items-center justify-center bg-base-300 p-5">
            <div className="card w-full max-w-xl glass shadow-xl p-6 mb-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevents the default form submission behavior
                  handleGenerateReport(); // Call your function to handle the submission
                }}
              >
                <div className="card-body items-center">
                  {/* Adjusted Search bar and dataset selection */}
                  <div className="flex items-center justify-between w-full max-w-xs">
                    <h3 className="text-2xl font-semibold">Enter Keyword</h3>
                    <span
                      className="tooltip"
                      data-tip="Brands Available: Gucci, Nike, Tesla"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    className="input input-warning input-bordered w-full max-w-xs mt-2"
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    required
                  />

                  {/* Brand not found modal */}
                  <BrandNotFoundModal
                    isOpen={isBrandModalOpen}
                    onClose={() => setIsBrandModalOpen(false)}
                  />

                  {/* Python not running modal */}
                  <PythonNotRunningModal
                    isOpen={isPythonModalOpen}
                    onClose={() => setIsPythonModalOpen(false)}
                  />

                  {/* Dataset selection aligned to the left */}
                  <div className="w-full max-w-xs mt-8">
                    <h3 className="text-2xl font-semibold mb-4">
                      Select Dataset
                    </h3>
                    <select
                      className="select select-warning w-full max-w-xs"
                      value={dataset}
                      onChange={handleDatasetChange}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Choose Dataset
                      </option>
                      <option value="Twitter">Twitter</option>
                      <option disabled value="facebook">
                        Facebook (Soon)
                      </option>
                    </select>
                  </div>

                  {/* Checkbox to use static data */}
                  <div className="form-control mt-8">
                    <label className="label cursor-pointer mr-40">
                      <span className="label-text mr-4">Use Static Data</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-warning"
                        checked={useStaticData}
                        onChange={(e) => setUseStaticData(e.target.checked)}
                      />
                    </label>
                  </div>

                  {/* Generate report button */}
                  <button
                    type="submit"
                    className="btn btn-warning w-full max-w-xs text-xl mt-8"
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

        {/* Conditional rendering based on showVisualization state */}
        {showVisualization && (
          console.log("User ID:", userID),
          <VisualizationSection userID={userID} brand={brandName} dataset={dataset} brandData={brandData} />
        )}
      </div>
    </Layout>
  );
};

export default Analysis;
