import { IPropsIcon } from "@/types/Icon.type";
import React from "react";

function RedSignIcon({ width = 24, height = 24, styles }: IPropsIcon) {
  return (
    <svg
      width={width}
      height={height}
      //   ariaHidden="true"
      className={`iconify iconify--twemoji ${styles}`}
      viewBox="0 0 36 36"
    >
      <path
        fill="#BE1931"
        d="M17 27a3 3 0 01-3-3v-4a3 3 0 013-3c.603-.006 6-1 6-5 0-2-2-4-5-4-2.441 0-4 2-4 3a3 3 0 11-6 0c0-4.878 4.58-9 10-9 8 0 11 5.982 11 11 0 4.145-2.277 7.313-6.413 8.92-.9.351-1.79.587-2.587.747V24a3 3 0 01-3 3z"
      ></path>
      <circle cx="17" cy="32" r="3" fill="#BE1931"></circle>
    </svg>
  );
}

export default RedSignIcon;
