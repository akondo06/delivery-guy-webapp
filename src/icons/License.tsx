import { SVGProps } from 'react';

export default function License(props: SVGProps<SVGSVGElement>) {
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
      <path d="M15 21H6a3 3 0 0 1-3-3v-1h10v2a2 2 0 0 0 4 0V5a2 2 0 1 1 2 2h-2m2-4H8a3 3 0 0 0-3 3v11M9 7h4M9 11h4" />
    </svg>
  );
}
