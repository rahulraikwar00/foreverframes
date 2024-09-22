"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { Camera } from "lucide-react";
import PreviewImage from "./PreviewImage";
import PictureList from "./PictureList";
import { Input } from "./ui/input";
import GeolocationComponent from "./GeoLocation";

export default function Component() {
  const [pictures, setPictures] = useState<PinnedPicture[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const [location, setLocation] = useState<Coordinates | null>(null);
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
    }
  };

  return (
    <div>
      <main>
        <section className="flex flex-col gap-4">
          <GeolocationComponent setLocation={setLocation} />
          {!previewImage && (
            <Button
              className="bg-[#405D72] hover:bg-[#405D72]/90 text-white min-w-1 sm:w-auto"
              onClick={() => document.getElementById("camera-input")?.click()}
            >
              <Camera className="mr-2 h-4 w-4" /> Take Picture
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
          />

          <PictureList PinPicture={pictures} />
        </section>
      </main>
    </div>
  );
}
