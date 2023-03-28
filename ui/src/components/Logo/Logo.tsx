import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Icon } from "../../assets/icons/Icon";

export const Logo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className="hidden sm:block">
        {theme === "light" ? <Icon.Logo.Light /> : <Icon.Logo.Dark />}
      </div>
      <Icon.Logo.Mobile className="block sm:hidden" />
    </div>
  );
};
