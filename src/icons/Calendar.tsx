import { SVGProps } from 'react';

export default function Calendar(props: SVGProps<SVGSVGElement>) {
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
      <rect x={4} y={5} width={16} height={16} rx={2} />
      <path d="M16 3v4M8 3v4M4 11h16M11 15h1M12 15v3" />
    </svg>
  );
}
