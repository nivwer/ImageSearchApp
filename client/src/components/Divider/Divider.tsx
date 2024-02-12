import { ReactNode } from "react";

interface IProps {
  children: ReactNode | string;
}

function Divider({ children }: IProps) {
  return (
    <div className="flex w-full py-3 sm:py-6">
      <div className="grow h-14 flex justify-center items-center px-8  opacity-50">
        <div className="w-full border-white/30 border h-0"></div>
      </div>
      <div className="grow-0 h-14 flex justify-center items-center ">
        <div>{children}</div>
      </div>
      <div className="grow h-14 flex justify-center items-center px-8 opacity-50">
        <div className="w-full border-white/30 border h-0"></div>
      </div>
    </div>
  );
}

export default Divider;
