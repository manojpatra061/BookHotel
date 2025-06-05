// * This is for buttons - <button> element - For action purpose
type Props = {
  btnText: string;
  btnType: "simple" | "success" | "danger";
  type?: "submit" | "reset";
  additionalClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

const Button = ({
  btnText,
  btnType,
  type,
  additionalClassName,
  onClick,
  disabled,
}: Props) => {
  const commonStyles =
    "cursor-pointer max-w-fit max-h-fit px-2 py-1 rounded-xs capitalize font-medium text-center hover:ring disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 disabled:ring-0";
  return (
    <button
      type={type}
      className={`${commonStyles} ${variantStyles[btnType]} ${additionalClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default Button;

const variantStyles: { [Property in Props["btnType"]]: string } = {
  simple: "bg-white hover:bg-gray-300 text-blue-800",
  success: "bg-blue-600 hover:bg-blue-500 text-white",
  danger: "bg-red-600 hover:bg-red-500 text-white",
};
