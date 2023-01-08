import React, { useRef } from "react";

export type notificationStatus = "SUCCESS" | "INFO" | "ERROR" | "DEFAULT";

const notificationStatusConfig = {
  SUCCESS: "text-green-600",
  INFO: "text-blue-600",
  ERROR: "text-red-600",
  DEFAULT: "invisible",
};

const Notification = ({
  status = "DEFAULT",
  message,
}: {
  status: notificationStatus;
  message: string;
}) => {
  const errorFocus = useRef<HTMLInputElement>(null); //set focus on error for screen reader to read

  return (
    <p ref={errorFocus} className={notificationStatusConfig[status]}>
      {`${status}: ${message}`}
    </p>
  );
};

export default Notification;
