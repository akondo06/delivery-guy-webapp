import { SVGProps } from 'react';

export default function Bed(props: SVGProps<SVGSVGElement>) {
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
      <path d="M3 7v11m0-4h18m0 4v-8a2 2 0 0 0-2-2h-8v6M6 10a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
    </svg>
  );
}
