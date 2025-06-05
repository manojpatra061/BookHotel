// * This is for anchor tags - <a> element - <Link to=''> - For navigation purpose
import { Link } from "react-router-dom";

type Props = {
  linkTo: string;
  linkText: string;
  linkType: "simple" | "success" | "danger";
  additionalClassName?: string;
  onClick?: () => void;
};

const LinkButton = ({
  linkTo,
  linkText,
  linkType,
  additionalClassName,
  onClick,
}: Props) => {
  const commonStyles =
    "cursor-pointer max-w-fit max-h-fit px-2 py-1 rounded-xs capitalize font-medium text-center hover:ring";
  return (
    <Link
      to={linkTo}
      className={`${commonStyles} ${variantStyles[linkType]} ${additionalClassName}`}
      onClick={onClick}
    >
      {linkText}
    </Link>
  );
};

export default LinkButton;

const variantStyles: { [Property in Props["linkType"]]: string } = {
  simple: "bg-white hover:bg-gray-300 text-blue-800",
  success: "bg-blue-600 hover:bg-blue-500 text-white",
  danger: "bg-red-600 hover:bg-red-500 text-white",
};
