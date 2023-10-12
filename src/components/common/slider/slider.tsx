import { ChangeEventHandler, useState } from "react";
import styles from "./slider.module.css";

type SliderProps = {
  handleChange: (value: string) => void;
};

const Slider: React.FC<SliderProps> = ({ handleChange }) => {
  const [currentValue, setCurrentValue] = useState(2022);

  const domain = [2000, 2022];
  return (
    <div className={styles.customSlider}>
      <input
        className={styles.slider_input}
        type="range"
        min="1994"
        max="2022"
        step={1}
        value={currentValue}
        onChange={({ target: { value } }) => {
          setCurrentValue(Number(value));
          handleChange(value);
        }}
      />
      <div className="buble" style={{ position: "absolute" }}>
        {currentValue}
      </div>
    </div>
  );
};

export default Slider;
