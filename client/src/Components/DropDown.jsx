// DropDown.js
import React from "react";

const DropDown = ({
  label,
  optionList = [],
  placeHolder,
  selectedOption,
  setSelectedOption,
  required = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 h-15">
      <label className="block mb-1 text-gray-600 text-[18px] mt-1 md:mt-0">
        {label}{" "}
        {required && <span className="text-red-500 font-bold text-md">*</span>}
      </label>
      <select
        className="bg-comp-fill w-full md:w-auto md:min-w-[17vw] px-2 py-1"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" disabled hidden>
          {placeHolder}
        </option>
        {optionList.length > 0 &&
          optionList.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropDown;
