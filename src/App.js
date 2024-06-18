import { useState } from "react";
import "./styles.css";
import Button from "./component/button";
import usePasswordGenerator from "./hook/usePasswordGenerator";
import Checkbox from "./component/checkbox";

export default function App() {
  const [length, setLength] = useState(6);
  const [copy, setCopy] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { title: "Include symbols", status: false },
    { title: "Include upperCase letters", status: false },
    { title: "Include lowercase letters", status: false },
    { title: "Include numbers", status: false },
  ]);

  const handleCheckbox = (index) => {
    const updatedCheckbox = [...checkboxes];
    updatedCheckbox[index].status = !updatedCheckbox[index].status;
    setCheckboxes(updatedCheckbox);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const { password, error, generatePassword } =
    usePasswordGenerator(checkboxes);

  return (
    <div className="App">
      <div className="header">
        <h1>{password}</h1>
        <Button
          text={copy ? "copied" : "copy"}
          className="copy-btn"
          onClick={handleCopy}
        />
      </div>
      <div className="length-info">
        <b> Password length:<span>{length}</span></b> 
      </div>
      <div className="range">
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkbox-container">
        {checkboxes.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              status={checkbox.status}
              onChange={() => handleCheckbox(index)}
            />
          );
        })}
      </div>
      {error && <p className="error">{error}</p>}
      <Button
        text="Generate Password"
        className="generate-btn"
        onClick={() => generatePassword(checkboxes, length)}
      />
    </div>
  );
}
