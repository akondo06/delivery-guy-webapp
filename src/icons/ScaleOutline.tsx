import { SVGProps } from 'react';

export default function ScaleOutline(props: SVGProps<SVGSVGElement>) {
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
      <rect x={3} y={3} width={18} height={18} rx={4} />
      <path d="M12 7c1.956 0 3.724.802 4.994 2.095l-2.956 2.904A3 3 0 0 0 12 11.2a3 3 0 0 0-2.038.798L7.006 9.095A6.979 6.979 0 0 1 12 7z" />
    </svg>
  );
}
