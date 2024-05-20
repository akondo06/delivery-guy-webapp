import { SVGProps } from 'react';

export default function Plug(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M7 7h10v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V7M9 3v4M15 3v4M12 16v2a2 2 0 0 0 2 2h3" />
    </svg>
  );
}
