import { SVGProps } from 'react';

export default function CurrencyEuro(props: SVGProps<SVGSVGElement>) {
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
      <path d="M17.2 7a6 7 0 1 0 0 10" />
      <path d="M13 10h-8m0 4h8" />
    </svg>
  );
}
