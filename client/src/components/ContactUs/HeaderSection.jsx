import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const HeaderSection = () => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <h1 className="text-5xl mb-7 font-bold leading-normal">
      {t('contact_us.title')}
    </h1>
  );
};

export default HeaderSection;
