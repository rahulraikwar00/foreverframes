"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { Camera } from "lucide-react";
import PreviewImage from "./PreviewImage";
import PictureList from "./PictureList";
import { Input } from "./ui/input";

export default function Component() {
  const [pictures, setPictures] = useState<PinnedPicture[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePinClick = () => {
    if (previewImage && description) {
      setPictures([
        ...pictures,
        {
          id: Date.now().toString(),
          url: previewImage,
          timestamp: new Date().toISOString(),
          location: location,
          description: description,
        },
      ]);
      setPreviewImage(null);
      setDescription(null);
      setLocation(null);
      setError(null);
    } else {
      setError("Please add an image and a description");
    }
  };

  return (
    <div>
      <main>
        <section className="flex flex-col gap-4">
          {!previewImage && (
            <Button
              className="bg-[#405D72] hover:bg-[#405D72]/90 text-white min-w-1 sm:w-auto"
              onClick={() => document.getElementById("camera-input")?.click()}
            >
              <Camera className="mr-2 h-4 w-4" /> Take Picture
            </Button>
          )}
          {previewImage && (
            <Button
              className="bg-[#405D72] hover:bg-[#405D72]/90 text-white"
              onClick={(): void => setPreviewImage(null)}
            >
              close it{" "}
            </Button>
          )}
          <Input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          <PreviewImage
            handlePinClick={handlePinClick}
            previewImage={previewImage}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            error={error}
            setError={setError}
          />

          <PictureList PinPicture={pictures} />
        </section>
      </main>
    </div>
  );
}
