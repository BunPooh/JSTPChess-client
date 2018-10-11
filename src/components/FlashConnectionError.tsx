import "./Flash.css";

import * as React from "react";

export type FlashType = "warn" | "error";

export function FlashConnectionError(props: { message?: string }) {
  const className = "flash flash-error flash-fixed text-center";
  // if (props.type) {
  //   className += ` flash-${props.type}`;
  // }

  if (!props.message) {
    return null;
  }
  return (
    <div className={className}>
      <span>{props.message}</span>
    </div>
  );
}
