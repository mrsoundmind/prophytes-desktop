const SocialSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 13.75a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5ZM1.25 7.5h12.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 1.25A9.563 9.563 0 0 1 10 7.5a9.563 9.563 0 0 1-2.5 6.25A9.563 9.563 0 0 1 5 7.5a9.563 9.563 0 0 1 2.5-6.25Z"
    />
  </svg>
);
export default SocialSvg;
