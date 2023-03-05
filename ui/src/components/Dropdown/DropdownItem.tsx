interface DropdownItemProps {
  onClick?: () => void;
  name: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  name,
  onClick,
}) => {
  return (
    <div role="listitem" className="dropdown-item" onClick={onClick}>
      {name}
    </div>
  );
};
