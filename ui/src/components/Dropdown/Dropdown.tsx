import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { ArrowUp } from "../../assets/icons/ArrowUp";
import { Typography } from "../Typography/Typography";

import "./Dropdown.scss";

interface DropdownMenuProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  currentValue?: string;
  icon?: JSX.Element;
  className?: string;
}

interface DropdownItemProps {
  onClick: () => void;
  name: string;
}

const Item: React.FC<DropdownItemProps> = ({ name, onClick }) => {
  return (
    <div role="listitem" className="dropdown-item" onClick={() => onClick()}>
      {name}
    </div>
  );
};

const Menu: React.FC<DropdownMenuProps> = ({
  currentValue,
  children,
  icon,
  className,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);

  window.addEventListener("click", (e) => {
    if (!listOpen) return;

    if (e.target instanceof HTMLElement) {
      if (!e.target.classList.contains("dropdown-header")) {
        setListOpen(false);
      }
    }
  });

  return (
    <div
      onClick={() => setListOpen(!listOpen)}
      className={classNames(
        "dropdown-wrapper",
        listOpen && "list-opened",
        icon && "dropdown-icon",
        className
      )}
    >
      <div
        className={classNames(
          icon ? "dropdown-header--icon" : "dropdown-header"
        )}
      >
        <Typography variant="BodyL">
          {icon}
          {!icon && (currentValue || "Select an option")}
        </Typography>
        {!icon && (
          <div className="dropdown-toggle">
            {listOpen ? <ArrowUp /> : <ArrowDown />}
          </div>
        )}
      </div>

      {listOpen && (
        <Typography variant="BodyM" role="list" className="dropdown-list">
          {children}
        </Typography>
      )}
    </div>
  );
};

const Dropdown = {
  Item,
  Menu,
};

export default Dropdown;
