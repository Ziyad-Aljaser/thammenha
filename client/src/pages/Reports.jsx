import React from "react";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Reports = () => {
  const { t } = useTranslation(); // Use the hook to access translations

  return (
    <Layout>
      <div className="bg-base-300 flex justify-center items-center h-screen">
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'El Messiri', sans-serif" }}>
          {t('reports.coming_soon')} {/* Use the translation key */}
        </h1>
      </div>
    </Layout>
  );
};

export default Reports;
