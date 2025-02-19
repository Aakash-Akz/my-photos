"use client";
import React, { useState } from "react";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

const PhotoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter(); // Correctly initialize the useRouter hook

  async function handleFileUpload(event) {
    try {
      setUploading(true);

      const file = event.target.files[0];
      if (!file) {
        throw new Error("No file selected for upload");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Get the authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("User not authenticated for photo upload");
      }

      // Define the file path in the storage bucket
      const filepath = `user_uploads/${user.id}/${fileName}`;

      // Upload the file to Supabase Storage
      const { error } = await supabase.storage
        .from("photos")
        .upload(filepath, file);

      if (error) {
        throw error;
      }

      await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: "/photos" }),
      });

      // Refresh the page or trigger a re-render of the photos
      router.refresh(); // Trigger a refresh to update the UI with the new photo
    } catch (err) {
      console.error("Error uploading photo:", err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <label
      htmlFor="photo-upload"
      className="cursor-pointer w-[150px] h-[50px] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4"
    >
      {uploading ? "Uploading..." : "Upload Photo"}
      <input
        type="file"
        id="photo-upload"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
};

export default PhotoUploader;
