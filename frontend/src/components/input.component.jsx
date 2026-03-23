import { useState } from "react";

const InputBox = ({ name, type, id, placeholder, icon }) => {

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputType =
    type === "password"
      ? passwordVisibility
        ? "text"
        : "password"
      : type;

  return (
    <div className="relative w-full mb-4">
      
      <input
        name={name}
        type={inputType}
        id={id}
        placeholder={placeholder}
        className="input-box"
      />

      {/* Left icon */}
      <i className={`fi ${icon} input-icon`}></i>

      {/* Password toggle icon */}
      {type === "password" && (
        <i
          className={`fi fi-rr-eye${!passwordVisibility ? "-crossed" : ""} input-icon left-[auto] right-4 cursor-pointer`}
          onClick={() => setPasswordVisibility((val) => !val)}
        ></i>
      )}

    </div>
  );
};

export default InputBox;