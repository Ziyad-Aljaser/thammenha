import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";

import Layout from "../components/Layout/Layout";

import { SentimentStackedBarChart } from "../components/Analysis/Charts/SentimentStackedBarChart";
import { SentimentLineChart } from "../components/Analysis/Charts/SentimentLineChart";
import { SentimentPieCharts } from "../components/Analysis/Charts/SentimentPieChart";

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate(); // Initialize navigate function
  const { currentUser } = useAuth();
  const userID = currentUser?.uid;

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false); // State to manage access denial

  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); // Reference to the modal element

  useEffect(() => {
    const fetchReport = async () => {
      const reportRef = doc(db, `users/${userID}/user_reports`, reportId);

      try {
        const docSnap = await getDoc(reportRef);

        if (docSnap.exists()) {
          const reportData = docSnap.data();
          setReport(reportData);
        } else {
          console.log("No such report!");
        }
      } catch (error) {
        console.error("Error fetching report:", error.code);
        if (error.code === "permission-denied") {
          setAccessDenied(true);
        }
      }
    };

    fetchReport();
  }, [reportId, userID]); // Dependency array includes reportId to refetch if it changes

  // Function to delete a report
  const handleDeleteReport = async () => {
    const reportRef = doc(db, `users/${userID}/user_reports`, reportId);
    try {
      setIsLoading(true);
      await deleteDoc(reportRef);
      console.log("Report deleted successfully");
      setIsLoading(false);
      navigate("/reports"); // Navigate back to the reports page
    } catch (error) {
      console.error("Error deleting report:", error);
      setIsLoading(false);
    }
  };
  if (accessDenied) {
    return (
      <Layout>
        <div className="bg-base-300 flex justify-center items-center h-screen">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600">
            Access Denied
          </h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {showModal && (
        <dialog ref={modalRef} id="delete_modal" className="modal" open>
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Remove Confirmation</h3>
            <p className="py-4">Are you sure you want to remove this report?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDeleteReport}>
                Confirm
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
      <div className="flex flex-col p-3 bg-base-300">
        <h1 className="text-4xl p-7 font-semibold flex justify-center">
          Report Details
        </h1>
        {report ? (
          <div>
            {/* Breadcrumbs Section */}
            <div className="border-b py-6">
              <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
                <div className="text-sm breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/reports">Reports</Link>
                    </li>
                    <li>{reportId}</li>
                  </ul>
                </div>
              </div>
            </div>
            {report.visualization === "Stacked Bar Chart" && (
              <SentimentStackedBarChart
                brandName={report.brand}
                brandData={report.data.map((item) => [item.year, ...item.data])}
              />
            )}
            {report.visualization === "Line Chart" && (
              <SentimentLineChart
                brandName={report.brand}
                brandData={report.data.map((item) => [item.year, ...item.data])}
              />
            )}
            {report.visualization === "Pie Chart" && (
              <SentimentPieCharts
                brandName={report.brand}
                brandData={report.data.map((item) => [item.year, ...item.data])}
              />
            )}

            <div className="flex justify-center p-2 py-10">
              <button
                className="btn btn-error w-1/4 text-xl"
                onClick={() => setShowModal(true)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Delete Report"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen bg-base-300">
            <span className="loading loading-spinner text-warning"></span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportDetail;
