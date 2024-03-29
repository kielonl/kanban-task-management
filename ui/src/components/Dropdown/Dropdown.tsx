import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { ArrowUp } from "../../assets/icons/ArrowUp";
import { Typography } from "../Typography/Typography";

interface DropdownMenuProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  currentValue?: string;
  className?: string;
}

interface DropdownItemProps {
  onClick?: () => void;
  name: string;
}

const Item: React.FC<DropdownItemProps> = ({ name, onClick }) => {
  return (
    <Typography
      variant="BodyL"
      role="listitem"
      id="listitem"
      className="hover:text-main-purple py-1 pl-4 dark:text-white dark:hover:text-main-purple"
      onClick={() => onClick && onClick()}
    >
      {name}
    </Typography>
  );
};

const Menu: React.FC<DropdownMenuProps> = ({
  currentValue,
  className,
  children,
  label,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const ref = useRef<any>(null);
  //close list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setListOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <label htmlFor="dropdown" className="w-full">
      <Typography variant="BodyM">{label}</Typography>
      <div
        ref={ref}
        onClick={() => setListOpen(!listOpen)}
        id="dropdown"
        className={twMerge(
          "w-full relative border border-main-purple dark:border-dark-lines rounded-lg",
          className
        )}
      >
        <div
          className={
            "w-full relative flex flex-row justify-between items-center text-sm rounded p-2 bg-transparent"
          }
        >
          <Typography variant="BodyL">
            {currentValue || "Select an option"}
          </Typography>
          {<div>{listOpen ? <ArrowUp /> : <ArrowDown />}</div>}
        </div>

        {listOpen && (
          <Typography
            variant="BodyM"
            role="list"
            className="absolute w-full flex flex-col mt-0.5 rounded-lg text-gray-600 bg-white z-[1]  overflow-y-scroll cursor-pointer first:pt-4 last:pb-4  dark:bg-very-dark-grey"
          >
            {children}
          </Typography>
        )}
      </div>
    </label>
  );
};

export const Dropdown = {
  Item,
  Menu,
};
