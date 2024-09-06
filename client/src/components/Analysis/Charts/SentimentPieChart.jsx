import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const sentiments = ["Negative", "Neutral", "Positive"];
const colors = ["rgb(255, 99, 132)", "rgb(255, 205, 86)", "rgb(75, 192, 192)"];

const generatePieData = (yearData) => ({
  labels: sentiments,
  datasets: [
    {
      data: yearData.slice(1), // Slice to exclude the year and only use sentiment data
      backgroundColor: colors,
      hoverOffset: 4,
    },
  ],
});

// Options without the title
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export function SentimentPieCharts({ brandName, brandData }) {
  const data = brandData;

  return (
    <div className="flex justify-center p-7">
      <div className="card shadow-xl bg-base-200">
        <div className="card-body">
          <div className="flex flex-wrap justify-center gap-10 p-4">
            <div className="w-full text-center">
              <label className="text-3xl font-bold text-gray-600">
                {brandName} Sentiment Analysis Over Years
              </label>
            </div>
            {data &&
              data.map(
                (
                  yearData,
                  index // Check if data is not undefined before mapping
                ) => (
                  <div key={index} className="card bg-base-300 shadow-xl glass">
                    <div className="card-body">
                      <h2 className="card-title justify-center">{`Year: ${yearData[0]}`}</h2>
                      <Pie data={generatePieData(yearData)} options={options} />
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
