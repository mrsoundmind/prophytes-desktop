const WebSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.5 20a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM1 10.5h19"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.503 1a14.535 14.535 0 0 1 3.8 9.5 14.535 14.535 0 0 1-3.8 9.5 14.535 14.535 0 0 1-3.8-9.5 14.535 14.535 0 0 1 3.8-9.5v0Z"
    />
  </svg>
);
export default WebSvg;
