import * as Popover from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../assets/icons/Icon";

interface SmallDropdownProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export const SmallDropdown: React.FC<SmallDropdownProps> = ({
  className,
  children,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={twMerge(`w-8 h-8  cursor-pointer`, className)}
      >
        <Icon.Ellipsis />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white dark:bg-dark-grey p-2 rounded-lg cursor-pointer dark:text-white [&>*]:p-1">
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
