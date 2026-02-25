"use client";

import React, { useEffect, useState, useRef } from "react";

const InputWithTypingAnimation = ({ placeholders = [], onChange, value }) => {
  const [placeholder, setPlaceholder] = useState("");
  const currentIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef(null);

  const type = () => {
    const currentText = placeholders[currentIndex.current] || "";

    if (!isDeleting.current) {
      // Typing forward
      setPlaceholder(currentText.substring(0, charIndex.current + 1));
      charIndex.current++;

      if (charIndex.current === currentText.length) {
        isDeleting.current = true;
        timeoutRef.current = setTimeout(type, 1500); // pause before deleting
        return;
      }
    } else {
      // Deleting
      setPlaceholder(currentText.substring(0, charIndex.current - 1));
      charIndex.current--;

      if (charIndex.current === 0) {
        isDeleting.current = false;
        currentIndex.current = (currentIndex.current + 1) % placeholders.length;
        timeoutRef.current = setTimeout(type, 1000); // pause before next word
        return;
      }
    }

    timeoutRef.current = setTimeout(type, isDeleting.current ? 80 : 120); // smooth typing/deleting speed
  };

  useEffect(() => {
    if (placeholders.length > 0) {
      type();
    }

    return () => clearTimeout(timeoutRef.current);
  }, [placeholders]);

  return (
    <input
      className="text-base text-white  sm:leading-[22px] leading-5 sm:pl-3 pl-[6px] sm:flex-1  w-full sm:h-[64px] h-12 bg-transparent rounded-full focus:outline-none placeholder:text-base  "
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputWithTypingAnimation;
