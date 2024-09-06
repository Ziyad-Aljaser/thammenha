import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from "../hooks/useAuth";

import Layout from "../components/Layout/Layout";

const Reports = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userID = currentUser?.uid;

  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsRef = collection(db, `users/${userID}/user_reports`);
      const q = query(reportsRef);
      
      try {
        const querySnapshot = await getDocs(q);
        const fetchedReports = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const dateSavedString = data.dateSaved.toDate().toLocaleDateString(); // This will format the date as 'MM/DD/YYYY'
          fetchedReports.push({
            id: doc.id,
            brand: data.brand,
            dataset: data.dataset,
            visualization: data.visualization,
            dateSaved: dateSavedString
          });
        });

        setReports(fetchedReports);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching reports:", error);
        setIsLoading(false);

      }
    };

    fetchReports();
  }, [userID]); // Empty dependency array to run once

  const handleRowClick = (reportId) => {
    navigate(`/reports/${reportId}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-base-300">
          <span className="loading loading-spinner text-warning"></span>
        </div>
      </Layout>
    );
  }

  if (reports.length === 0) {
    return (
      <Layout>
        <div className="bg-base-300 flex justify-center items-center h-screen">
          <h1 className="text-4xl sm:text-5xl font-bold">
            There Are No Reports Available
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col p-3 bg-base-300">
        <h1 className="text-4xl p-7 font-semibold flex justify-center">Reports Page</h1>
        <div className="overflow-x-auto p-12 pb-32">
          <table className="table glass text-2xl">
            <thead>
              <tr className="text-xl">
                <th></th>
                <th>Brand</th>
                <th>Dataset</th>
                <th>Visualization</th>
                <th>Date Saved</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id} onClick={() => handleRowClick(report.id)} className="cursor-pointer hover:bg-base-300 transition-colors duration-150">
                  <th>{index + 1}</th>
                  <td className="py-8">{report.brand}</td>
                  <td>{report.dataset}</td>
                  <td>{report.visualization}</td>
                  <td>{report.dateSaved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
