"use client";

import Image from "next/image";
import React from "react";

const PhotoModal = ({ src, alt, onClose }) => {
  if (!src) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
      aria-label="Photo Modal"
    >
      <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-300 hover:text-white text-[24px] z-50 "
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Image Display */}
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={src}
            alt={alt || "Photo"}
            fill
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
