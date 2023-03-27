import React from "react";
import { useState } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { ArrowUp } from "../../assets/icons/ArrowUp";
import { Typography } from "../Typography/Typography";

// import "./Dropdown.scss";

interface DropdownMenuProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  currentValue?: string;
  // icon?: JSX.Element;
  className?: string;
}

interface DropdownItemProps {
  onClick: () => void;
  name: string;
}

const Item: React.FC<DropdownItemProps> = ({ name, onClick }) => {
  return (
    <Typography 
    variant="BodyL"
    role="listitem"
    className="hover:text-main-purple py-1 pl-4"
    onClick={() => onClick()}>
      {name}
    </Typography>
  );
};

const Menu: React.FC<DropdownMenuProps> = ({
  currentValue,
  children,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  return (
    <div
      onClick={() => setListOpen(!listOpen)}
      className={"w-full relative border border-main-purple rounded-lg"}
    >
      <div
        className={"w-full relative flex flex-row justify-between items-center text-sm rounded p-2 bg-transparents "}
      >
        <Typography variant="BodyL">
          {(currentValue || "Select an option")}
        </Typography>
        {(
          <div>
            {listOpen ? <ArrowUp /> : <ArrowDown />}
          </div>
        )}
      </div>

      {listOpen && (
        <Typography variant="BodyM" role="list" 
        className="absolute w-full flex flex-col mt-0.5 rounded-lg text-gray-600 bg-white overflow-y-scroll cursor-pointer first:pt-4 last:pb-4 "
       >
          {children}
        </Typography>
      )}
    </div>
  );
};

export const Dropdown = {
  Item,
  Menu,
};


