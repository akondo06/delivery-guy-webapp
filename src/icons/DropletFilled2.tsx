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
      <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197-8-5.2 8zM6 14h12M7.305 17.695 11 14" />
      <path d="M10.26 19.74 16 14l-5.74 5.74z" />
    </svg>
  );
}
