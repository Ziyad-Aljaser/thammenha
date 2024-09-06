import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Sentiment Analysis Over Years', // We will dynamically update this below
      font: {
        size: 30,
      },
    },
  },
};

const transformData = (brandData) => {
  const labels = brandData.map(item => item[0].toString());
  const negativeData = brandData.map(item => item[1]);
  const neutralData = brandData.map(item => item[2]); // Change 'Natural' to 'Neutral' for clarity
  const positiveData = brandData.map(item => item[3]);

  return {
    labels,
    datasets: [
      {
        label: 'Negative',
        data: negativeData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Neutral',
        data: neutralData,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
      {
        label: 'Positive',
        data: positiveData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
};

export function SentimentLineChart({ brandName, brandData }) {
  const data = transformData(brandData);
  options.plugins.title.text = `${brandName} Sentiment Analysis Over Years`;

  return (
    <div className="flex justify-center p-7">
      <div className="card shadow-xl bg-base-200 w-3/4">
        <div className="card-body">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
