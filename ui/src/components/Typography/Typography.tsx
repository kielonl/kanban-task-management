import { twMerge } from "tailwind-merge";

type Variant = "XL" | "L" | "M" | "S" | "BodyL" | "BodyM";
type Component = "h2" | "h3" | "h4" | "h5" | "p" | "span";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
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
  ...props
}) => {
  const Component: Component = variant ? variantsMapping[variant] : "p";

  const variantClass = {
    XL: "font-bold text-2xl leading-7",
    L: "font-bold text-lg leading-6",
    M: "font-bold text-sm leading-5",
    S: "font-bold text-xs leading-4 tracking-[2.4px]",
    BodyL: "font-normal text-xs leading-6 text-grey dark:text-white",
    BodyM: "font-normal text-xs leading-4 text-dark-grey dark:text-medium-grey",
  };

  return (
    <Component
      className={twMerge(variantClass[variant || "BodyL"], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
