import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium max-w-sm
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
      {message.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};

export default Toast;
