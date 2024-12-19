import { useEffect } from "react";
import { ToastMessage } from "../contexts/AppContext";

type ToastProps = ToastMessage & { onClose: () => void };

const Toast = (props: ToastProps) => {
  const { message, type, onClose } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const style =
    type === "SUCCESS"
      ? "fixed top-8 right-8 text-white px-4 py-2 font-semibold rounded-sm bg-green-500"
      : "fixed top-8 right-8 text-white px-4 py-2 font-semibold rounded-sm bg-red-500";
  return (
    <div className={style}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
