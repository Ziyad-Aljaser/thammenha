const [accident, setAccident] = useState("");
const [vehicleAge, setVehicleAge] = useState("");
const [mileagePerYear, setMileagePerYear] = useState("");
const [horsepower, setHorsepower] = useState("");
const [isLuxuryBrand, setIsLuxuryBrand] = useState("");

const [cleanTitle, setCleanTitle] = useState("");
const [powerToWeightRatio, setPowerToWeightRatio] = useState("");
const [accidentImpact, setAccidentImpact] = useState("");

{
  /* Clean Title Dropdown */
}
<div className="w-full max-w-xs mt-4 pb-6">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.clean_title")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={cleanTitle}
    onChange={(e) => setCleanTitle(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;

{
  /* Power to Weight Ratio Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.power_to_weight_ratio")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={powerToWeightRatio}
    onChange={(e) => setPowerToWeightRatio(e.target.value)}
    placeholder={t("estimator.enter_power_to_weight_ratio")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Accident Impact Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.accident_impact")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={accidentImpact}
    onChange={(e) => setAccidentImpact(e.target.value)}
    placeholder={t("estimator.enter_accident_impact")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Accident Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.accident")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={accident}
    onChange={(e) => setAccident(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;

{
  /* Vehicle Age Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.vehicle_age")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={vehicleAge}
    onChange={(e) => setVehicleAge(e.target.value)}
    placeholder={t("estimator.vehicle_age")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Mileage per Year Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.mileage_per_year")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={mileagePerYear}
    onChange={(e) => setMileagePerYear(e.target.value)}
    placeholder={t("estimator.mileage_per_year")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Horsepower Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.horsepower")}
  </h3>
  <input
    type="number"
    className="input input-neutral input-bordered w-full max-w-xs"
    value={horsepower}
    onChange={(e) => setHorsepower(e.target.value)}
    placeholder={t("estimator.horsepower")}
    min="0"
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  />
</div>;

{
  /* Is Luxury Brand Input */
}
<div className="w-full max-w-xs mt-4">
  <h3
    className="text-2xl font-semibold mb-4"
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    {t("estimator.is_luxury_brand")}
  </h3>
  <select
    className="select select-neutral w-full max-w-xs"
    value={isLuxuryBrand}
    onChange={(e) => setIsLuxuryBrand(e.target.value)}
    required
    style={{ fontFamily: "'El Messiri', sans-serif" }}
  >
    <option value="" disabled hidden>
      {t("estimator.select_option")}
    </option>
    <option value="Yes">{t("estimator.yes")}</option>
    <option value="No">{t("estimator.no")}</option>
  </select>
</div>;
