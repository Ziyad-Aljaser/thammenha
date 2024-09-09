import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const ContactFormSection = () => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <div className="card w-full shadow-xl mt-4 sm:mt-0 glass">
      <div className="card-body">
        {/* Form Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Full Name Input */}
          <div className="form-control flex-grow">
            <label className="label">
              <span className="label-text">{t("contact_us.full_name")}</span>
            </label>
            <input
              type="text"
              placeholder={t("contact_us.full_name_placeholder")}
              className="input input-bordered"
            />
          </div>

          {/* Email Input */}
          <div className="form-control flex-grow">
            <label className="label">
              <span className="label-text">{t("contact_us.email")}</span>
            </label>
            <input
              type="email"
              placeholder={t("contact_us.email_placeholder")}
              className="input input-bordered"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("contact_us.message")}</span>
          </label>
          <textarea
            placeholder={t("contact_us.message_placeholder")}
            className="input input-bordered w-full h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-neutral">{t("contact_us.submit")}</button>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
