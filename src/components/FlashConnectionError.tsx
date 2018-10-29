import "./Flash.css";

import * as React from "react";

export function FlashConnectionError(props: {
  message?: string | JSX.Element;
}) {
  const className = "flash flash-error text-center";

  if (!props.message) {
    return null;
  }
  return (
    <div className={className}>
      <span>{props.message}</span>
    </div>
  );
}
