import React from "react";
import { supabaseServer } from "../utils/supabaseServerClient";
import Photo from "./Photo";

async function fetchUserPhotos(user) {
  if (!user) return;

  const folderPath = `user_uploads/${user.id}/`;
  const { data, error } = await supabaseServer.storage
    .from("photos")
    .list(folderPath);

  if (error) {
    console.error("Error fetching photos", error);
    return;
  }
  return data;
}

async function getPhotoUrls(photos, user) {
  return Promise.all(
    photos.map(async (photo) => {
      const { data, error } = await supabaseServer.storage
        .from("photos")
        .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);
      if (error) {
        console.error("Error creating signed URL", error);
        return null;
      }
      return { url: data.signedUrl, photoName: photo.name };
    })
  );
}

async function fetchfavoritePhotos(user) {
  const { data, error } = await supabaseServer
    .from("favorites")
    .select("photo_name")
    .eq("user_id", user.id);

  if (error) {
    console.error("error fetching favorites", error);
    return [];
  }
  return data.map((favorite) => favorite.photo_name);
}

export default async function PhotoGrid({ favorites = false }) {
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const photos = await fetchUserPhotos(user);
  const photoObjects = await getPhotoUrls(photos, user);
  const favoritePhotoNames = await fetchfavoritePhotos(user);

  const photosWithFavorites = photoObjects.map((photo) => ({
    ...photo,
    isFavorited: favoritePhotoNames.includes(photo.photoName),
  }));

  const displayPhotos = favorites
    ? photosWithFavorites.filter((photo) => photo.isFavorited)
    : photosWithFavorites;

  return (
    <div className="grid grid-cols-6 gap-8">
      {displayPhotos.map((photo) => (
        <Photo
          key={photo.photoName}
          src={photo.url}
          alt={`Photo ${photo.photoName}`}
          width={200}
          height={200}
          photoName={photo.photoName}
          isFavorited={photo.isFavorited}
        />
      ))}
    </div>
  );
}
