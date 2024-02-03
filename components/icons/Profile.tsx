import { IPropsIcon } from "@/types/Icon.type";
import React from "react";

function ProfileIcon({ width = 24, height = 24 }: IPropsIcon) {
  return (
    <svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <path
        className="stroke-[black] dark:stroke-[white]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      ></path>
    </svg>
  );
}

export default ProfileIcon;
