import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sentiment Analysis Over Years',  // The title will be set dynamically in the options below
      font: {
        size: 30,
      }
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// Function to transform imported data into chart's data format
const transformData = (brandData) => {
  const labels = brandData.map(item => item[0].toString());
  const negativeData = brandData.map(item => item[1]);
  const naturalData = brandData.map(item => item[2]);
  const positiveData = brandData.map(item => item[3]);

  return {
    labels,
    datasets: [
      {
        label: 'Negative',
        data: negativeData,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Neutral', // Changed 'Natural' to 'Neutral' for conventional naming
        data: naturalData,
        backgroundColor: 'rgb(255, 205, 86)',
      },
      {
        label: 'Positive',
        data: positiveData,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
};

export function SentimentStackedBarChart({ brandName, brandData }) {
  const data = transformData(brandData);  // Ensure data is accessed correctly
  options.plugins.title.text = `${brandName} Sentiment Analysis Over Years`; // Set dynamic title

  return (
    <div className="flex justify-center p-7">
      <div className="card shadow-xl bg-base-200 w-3/4">
        <div className="card-body">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

