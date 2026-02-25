const SvgMarkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={23} height={23} x={0.5} y={0.5} fill="#fff" rx={11.5} />
    <rect width={23} height={23} x={0.5} y={0.5} stroke="#000" rx={11.5} />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17.33 8-7.333 7.333L6.664 12"
    />
  </svg>
);
export default SvgMarkIcon;
