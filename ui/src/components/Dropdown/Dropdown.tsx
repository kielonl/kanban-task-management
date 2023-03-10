import React from "react";
import { useState } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { ArrowUp } from "../../assets/icons/ArrowUp";
import "./Dropdown.scss";

interface DropdownMenuProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  currentValue?: string;
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

const Menu: React.FC<DropdownMenuProps> = ({ currentValue, children }) => {
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
    <div className={`dropdown-wrapper ${listOpen && "list-opened"}`}>
      <div className="dropdown-header" onClick={() => setListOpen(!listOpen)}>
        {currentValue || "Select an option"}
        <div className="dropdown-toggle">
          {listOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>

      {listOpen && (
        <div role="list" className="dropdown-list">
          {children}
        </div>
      )}
    </div>
  );
};

const Dropdown = {
  Item,
  Menu,
};

export default Dropdown;
