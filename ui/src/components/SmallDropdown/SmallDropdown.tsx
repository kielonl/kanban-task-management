import * as Popover from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../assets/icons/Icon";

interface SmallDropdownProps {
  children: JSX.Element | JSX.Element[];
  size?: number;
  className?: string;
}

//top-12 right-4 fixed flex justify-center items-center

export const SmallDropdown: React.FC<SmallDropdownProps> = ({
  size = 8,
  className,
  children,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={twMerge(`w-${size} h-${size}  cursor-pointer`, className)}
      >
        <Icon.Ellipsis />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white dark:bg-dark-grey p-2 rounded-lg cursor-pointer dark:text-white">
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
