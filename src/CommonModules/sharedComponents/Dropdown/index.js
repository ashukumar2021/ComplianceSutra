import React, { useState } from "react";
import { useEffect } from "react";
import check from "../../../assets/Icons/check.png";
import uncheck from "../../../assets/Icons/uncheck.png";
import "./style.css";

function MultiSelectDropdown({
  lableTitle,
  options,
  inputTitle,
  dispatchType,
  dispatch,
}) {
  const [selectTitle, setSelectTitle] = useState(inputTitle);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const numOfSelected = options.filter(
      (option) => option.selected === true
    ).length;
    if (numOfSelected > 0) {
      setSelectTitle(numOfSelected + " Selected");
    } else {
      setSelectTitle(inputTitle);
    }
  }, [options]);
  return (
    <>
      <div
        className="form-group mt-3"
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
      >
        <label htmlFor="lable-title">{lableTitle}:</label>
        <div className="form-control select-container" id="lable-title">
          <span className="select-title">{selectTitle}</span>
          <span
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
              height: "0",
              width: "0",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: "5px solid #000",
              backgroundColor: "transparent",
              transition: " all 400ms ease-in-out",
            }}
          ></span>
        </div>
        <div className="dropdown-container" onBlur={() => setIsOpen(false)}>
          <div className={`dropdown ${isOpen && "dropdown--open"}`}>
            {options.map((option) => {
              const id = option.id;
              return (
                <div
                  className="dropdown-item d-flex"
                  key={id}
                  onClick={() => {
                    dispatch({ type: dispatchType, payload: id });
                  }}
                >
                  <span className="dropdown-item__title">{option.name}</span>
                  <span className="dropdown-item--selected">
                    {option.selected ? (
                      <img src={check} />
                    ) : (
                      <img src={uncheck} />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MultiSelectDropdown;
