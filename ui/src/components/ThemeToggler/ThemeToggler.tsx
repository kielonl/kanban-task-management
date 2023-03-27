import { useContext } from "react";
import { Icon } from "../../assets/icons/Icon";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CheckboxSlider } from "../CheckboxSlider/CheckboxSlider";

export const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="flex items-center rounded-md ">
        <div className="w-full flex items-center py-4 mx-4 justify-center gap-4 bg-light-grey">
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
