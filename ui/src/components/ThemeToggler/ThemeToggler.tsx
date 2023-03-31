import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../assets/icons/Icon";
import { ThemeContext } from "../../contexts/ThemeContext";
import { save } from "../../services/StorageManager";
import { CheckboxSlider } from "../CheckboxSlider/CheckboxSlider";

export const ThemeToggler: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    save("theme", { theme: theme === "light" ? "dark" : "light" });
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <div className={twMerge("flex items-center rounded-md", className)}>
        <div className="w-full flex items-center py-4 mx-4 justify-center gap-4 bg-light-grey dark:bg-very-dark-grey">
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
