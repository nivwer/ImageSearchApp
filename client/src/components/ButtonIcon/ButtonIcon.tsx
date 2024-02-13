import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

function ButtonIcon({ children, className }: IProps) {
  return (
    <div className={`transition duration-500 hover:text-white/30 ${className}`}>
      {children}
    </div>
  );
}

export default ButtonIcon;
