import Link from "next/link";

export const HandleHyperLink = ({ text, mentions = [] }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split text by URLs
  const parts = text.split(urlRegex);
  const cleanText = text?.includes("{")
    ? text?.slice(0, text?.indexOf("{"))?.trim()
    : text;

  if (!cleanText) return;

  const renderWithMentions = (part, index) => {
    // If it's a URL, make it clickable
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          {part}
        </a>
      );
    }

    // Process mentions inside this part
    let elements = [part];

    mentions.forEach((mention) => {
      elements = elements.flatMap((el) => {
        if (typeof el !== "string") return el; // already a JSX element
        const parts = el.split(mention.fullName);
        return parts.flatMap((p, i) =>
          i < parts.length - 1
            ? [
                p,
                <Link
                  href={`/members/${mention.userId}`}
                  key={mention.userId}
                  className="italic font-bold"
                  onClick={() => console.log("Clicked user:", mention.userId)}
                >
                  {mention.fullName}
                </Link>,
              ]
            : [p]
        );
      });
    });

    return elements.map((el, i) => (typeof el === "string" ? el : el));
  };

  return <div>{parts.map((part, i) => renderWithMentions(part, i))}</div>;
};
