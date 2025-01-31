import { cn, ICommons } from "@utils/utils";
import React from "react";

interface IButtonDefault extends ICommons {
  onClick?: (e: any) => void;
}

export default function ButtonDefault({
  className,
  children,
  onClick,
}: IButtonDefault) {
  return (
    <button onClick={onClick} className={cn(`button title`, className)}>
      {children}
    </button>
  );
}
