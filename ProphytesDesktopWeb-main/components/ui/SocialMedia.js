import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialMedia({ href, icon, target = "_blank" }) {
  return (
    <Link
      href={href}
      target={target}
      className="group grid place-content-center sm:size-10 size-8 bg-[#E7E7EB] rounded-full transition-all duration-500 ease-out hover:bg-[#ED1A36]"
    >
      <FontAwesomeIcon
        icon={icon}
        className="size-4 text-[#ED1A36] group-hover:text-white"
      />
    </Link>
  );
}
