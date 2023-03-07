import "./Typography.scss";

type Variant = "XL" | "L" | "M" | "S" | "BodyL" | "BodyM";
type Component = "h2" | "h3" | "h4" | "h5" | "p" | "span";

interface TypographyProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const variantsMapping: { [key in Variant]: Component } = {
  XL: "h2",
  L: "h3",
  M: "h4",
  S: "h5",
  BodyL: "p",
  BodyM: "span",
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  const Component: Component = variant ? variantsMapping[variant] : "p";

  return (
    <Component
      className={`typography--variant-${variant} ${className}`}
      color="red"
    >
      {children}
    </Component>
  );
};
