import React from "react";

const CLoader = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cloader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#82b1ff" />
        <stop offset="50%" stopColor="#448aff" />
        <stop offset="100%" stopColor="#002f6c" />
      </linearGradient>
    </defs>

    <path
      d="M160,50 A70,70 0 1,0 160,150"
      fill="none"
      stroke="url(#cloader-grad)"
      strokeWidth="15"
      strokeLinecap="round"
      strokeDasharray="400"
      strokeDashoffset="400"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="400"
        to="0"
        dur="2s"
        fill="freeze"
      />
    </path>

    <path
      d="M140,60 A60,60 0 1,0 140,140"
      fill="none"
      stroke="#ffffff"
      strokeWidth="12"
      strokeOpacity="0.3"
      strokeLinecap="round"
      strokeDasharray="400"
      strokeDashoffset="400"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="400"
        to="0"
        dur="2.5s"
        fill="freeze"
      />
      <animate
        attributeName="stroke-opacity"
        values="0.2;0.5;0.2"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>

    <circle cx="0" cy="0" r="2" fill="white">
      <animateMotion
        dur="3s"
        repeatCount="indefinite"
        path="M160,50 A70,70 0 1,0 160,150"
      />
    </circle>
  </svg>
);

export { CLoader };
