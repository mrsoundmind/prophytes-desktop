"use client";

import ImgSvg from "@/public/img/icon/ImgSvg";
import Image from "next/image";
import { useRef, useState } from "react";

const UploadCard = ({ label, image, setImage }) => {
  const [imageShow, setImageShow] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageShow({
      url: URL.createObjectURL(file),
      name: file.name,
    });

    setImage(file);
  };

  const handleRemoveImage = () => {
    setImageShow(null);
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <p className="mb-3 text-sm font-normal leading-5 text-white font-inter xs:text-base">
        {label}
      </p>

      {/* Upload Box */}
      <div
        onClick={handleBoxClick}
        className="relative sm:w-[290px] w-full 2xl:h-[242px] h-[150px]
        rounded-[16px] bg-[#383838] flex items-center justify-center
        border border-dashed border-white/30 overflow-hidden group
        cursor-pointer hover:border-white transition-all"
      >
        {/* Upload State */}
        {!imageShow && (
          <div className="pointer-events-none">
            <ImgSvg />
          </div>
        )}

        {/* Image Preview */}
        {imageShow && (
          <>
            <Image
              src={imageShow.url}
              alt="Uploaded image"
              fill
              className="object-cover rounded-[16px]"
            />

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 gap-2 rounded-[8px]
              bg-[#202020] w-[160px] items-center flex text-white shadow-lg"
            >
              <button
                className="text-xs font-normal text-white/70"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBoxClick();
                }}
              >
                Change here
              </button>

              <button
                className="text-xs font-medium text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                or Delete
              </button>
            </div>
          </>
        )}

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default UploadCard;
