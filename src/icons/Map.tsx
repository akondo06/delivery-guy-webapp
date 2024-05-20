import { SVGProps } from 'react';

export default function Map(props: SVGProps<SVGSVGElement>) {
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
      <path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3V7M9 4v13M15 7v13" />
    </svg>
  );
}
