import { useContext } from "react";
import { Icon } from "../../assets/icons/Icon";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CheckboxSlider } from "../CheckboxSlider/CheckboxSlider";

import "./ThemeToggler.scss";

export const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="theme-toggler-container">
        <div className="theme-toggler-items">
          <Icon.Theme.Light />
          <CheckboxSlider
            id="slider"
            isChecked={theme === "dark"}
            setChecked={() => toggleTheme()}
          />
          <Icon.Theme.Dark />
        </div>
      </div>
    </>
  );
};
