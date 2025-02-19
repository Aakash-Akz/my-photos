"use client";

import Image from "next/image";
import React, { useState } from "react";
import PhotoModal from "./PhotoModal";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { deletePhoto } from "../actions/deletePhoto";
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";

const Photo = ({ src, alt, width, height, photoName, isFavorited = false }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div
        style={{ width, height }}
        className="relative w-[200px] h-[200px] shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer mt-8"
      >
        <form
          action={deletePhoto}
          className="absolute bottom-2.5 right-10 z-10"
        >
          <input type="hidden" name="photoPath" value={src} />
          <button
            type="submit"
            className="bg-transparent border-none text-gray-300 cursor-pointer hover:text-red-500 "
          >
            <Delete />
          </button>
        </form>

        <form
          action={addOrRemoveFromFavorites}
          className="absolute bottom-2.5 right-2.5 z-10"
        >
          <input type="hidden" name="photoName" value={photoName} />
          <input type="hidden" name="isFavorited" value={isFavorited} />
          <button
            type="submit"
            className="bg-transparent border-none text-red-500 cursor-pointer hover:text-green-400 "
          >
            {isFavorited ? <Favorite /> : <FavoriteBorder />}
          </button>
        </form>

        <Image
          src={src}
          alt={alt}
          layout="fill"
          style={{ objectFit: "cover", objectPosition: "center" }}
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
    </>
  );
};

export default Photo;
