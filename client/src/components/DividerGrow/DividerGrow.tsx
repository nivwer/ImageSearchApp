import React, { ReactNode } from "react";

interface IProps {
  rightSide?: ReactNode | string;
  leftSide?: ReactNode | string;
}

function DividerGrow({ rightSide, leftSide }: IProps) {
  return (
    <div className="flex w-full py-3 sm:py-6  px-4">
      <div className="flex-none h-14 flex justify-center items-center">
        <div>{leftSide}</div>
      </div>
      <div className="grow h-14 flex justify-center items-center px-8  opacity-50">
        <div className="w-full border-white/30 border h-0"></div>
      </div>
      <div className="flex-none h-14 flex justify-center items-center">
        <div>{rightSide}</div>
      </div>
    </div>
  );
}

export default DividerGrow;
