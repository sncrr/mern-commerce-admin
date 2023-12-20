import { SvgProps, defaultColor, defualtSize, } from "..";

export function MenuTransactions({
  color = defaultColor,
  size = defualtSize
}: SvgProps) {

  return (
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
  <path d="M11.6667 12.5C16.269 12.5 20 10.6345 20 8.33332C20 6.03214 16.269 4.16666 11.6667 4.16666C7.0643 4.16666 3.33334 6.03214 3.33334 8.33332C3.33334 10.6345 7.0643 12.5 11.6667 12.5Z" />
  <path d="M3.33334 8.33331V14.1666C3.33334 16.4678 7.0643 18.3333 11.6667 18.3333C16.269 18.3333 20 16.4678 20 14.1666C20 12.8036 20 8.33331 20 8.33331" />
  <path d="M3.33334 14.1667V20C3.33334 22.3012 7.0643 24.1667 11.6667 24.1667C16.269 24.1667 20 22.3012 20 20C20 18.637 20 14.1667 20 14.1667" />
  <path d="M3.33334 20V25.8333C3.33334 28.1345 7.0643 30 11.6667 30C16.269 30 20 28.1345 20 25.8333C20 24.4703 20 20 20 20" />
  <path d="M3.33334 25.8333V31.6666C3.33334 33.9678 7.0643 35.8333 11.6667 35.8333C16.269 35.8333 20 33.9678 20 31.6666C20 30.3036 20 25.8333 20 25.8333" />
  <path d="M28.3333 24.1666C32.9357 24.1666 36.6667 22.3012 36.6667 20C36.6667 17.6988 32.9357 15.8333 28.3333 15.8333C23.731 15.8333 20 17.6988 20 20C20 22.3012 23.731 24.1666 28.3333 24.1666Z" />
  <path d="M20 20V25.8333C20 28.1345 23.731 30 28.3333 30C32.9357 30 36.6667 28.1345 36.6667 25.8333C36.6667 24.4703 36.6667 20 36.6667 20" />
  <path d="M20 25.8333V31.6666C20 33.9678 23.731 35.8333 28.3333 35.8333C32.9357 35.8333 36.6667 33.9678 36.6667 31.6666C36.6667 30.3036 36.6667 25.8333 36.6667 25.8333" />
</svg>
  );
}
