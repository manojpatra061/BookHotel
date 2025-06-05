import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

type Props = {
  children: JSX.Element;
  toggleText: string;
};
const Toggle = ({ children, toggleText }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className="cursor-pointer select-none px-1 text-xl font-bold border-black flex flex-row justify-between items-center"
      >
        <span>{toggleText}</span>
        <span>
          {isOpen ? (
            <FaAngleDown className="text-2xl" />
          ) : (
            <FaAngleRight className="text-2xl" />
          )}
        </span>
      </div>
      {isOpen && <div className="p-3 mt-2 border-t border-gray-400">{children}</div>}
    </div>
  );
};

export default Toggle;
