import { Icon } from "../../assets/icons/Icon";

export const Logo = () => {
  let theme = "light";
  return (
    <div className="logo-container">
      {theme === "light" ? <Icon.Logo.Light /> : <Icon.Logo.Dark />}
    </div>
  );
};
