import React from "react";
import styles from "./Step.module.css";
import cn from "classnames";

export const Step = ({ className, active, children }) => {
  return (
    <div
      className={cn(styles.step, className, {
        [styles.active]: active,
      })}
    >
      {children}
    </div>
  );
};
