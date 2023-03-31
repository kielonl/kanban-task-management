import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Icon } from "../../assets/icons/Icon";
import { twMerge } from "tailwind-merge";

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className={twMerge("hidden sm:block", className)}>
        {theme === "dark" ? <Icon.Logo.Dark /> : <Icon.Logo.Light />}
      </div>
      <Icon.Logo.Mobile className="block sm:hidden" />
    </div>
  );
};
