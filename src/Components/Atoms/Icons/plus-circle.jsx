import React from "react";

export default function PlusCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="css-i6dzq1"
    >
      {/* <circle cx={12} cy={12} r={10} /> */}
      <line x1={12} y1={8} x2={12} y2={16} />
      <line x1={8} y1={12} x2={16} y2={12} />
    </svg>
  );
}
