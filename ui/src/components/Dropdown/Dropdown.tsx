import React from "react";
import { useState } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { ArrowUp } from "../../assets/icons/ArrowUp";
import "./Dropdown.scss";

interface DropdownProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

interface ChildrenWithProps extends React.ReactElement {
  props: {
    onClick: () => void;
    name: string;
  };
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Select an option");
  const theme = "light";

  window.addEventListener("click", (e) => {
    if (!listOpen) return;

    if (e.target instanceof HTMLElement) {
      if (!e.target.classList.contains("dropdown-header")) {
        setListOpen(false);
      }
    }
  });

  //fix this later
  // @ts-ignore
  const childrenWithProps: ChildrenWithProps[] = React.Children.map(
    children,
    (child, index) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child, {
        onClick: () => selectItem(index),
      });
    }
  );

  const selectItem = (index: number) => {
    setListOpen(false);
    if (!childrenWithProps) return;
    setSelected(childrenWithProps[index].props.name);
  };

  return (
    <div
      className={`dropdown-wrapper ${
        listOpen && "list-opened"
      } dropdown-${theme}`}
    >
      <div className="dropdown-header" onClick={() => setListOpen(!listOpen)}>
        {selected}
        <div className="dropdown-toggle">
          {listOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>

      {listOpen && (
        <div role="list" className="dropdown-list">
          {childrenWithProps?.map((child) => {
            return child;
          })}
        </div>
      )}
    </div>
  );
};
