"use client";

import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PreviewImageProps {
  previewImage: string | null;
  setDescription: (value: string | null) => void;
  handlePinClick: () => void;
  location: Coordinates | null;
  error?: string | null;
  setLocation: (value: Coordinates | null) => void;
  setError?: (value: string | null) => void;
}

const PreviewImage = ({
  previewImage,
  setDescription,
  handlePinClick,
  location,
  setLocation,
  error,
  setError,
}: PreviewImageProps): JSX.Element => {
  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const coords: Coordinates = { latitude, longitude };
      setLocation(coords);
    };

    const handleError = (error: GeolocationPositionError) => {
      if (setError) setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      if (setError) setError("No location found / check your device settings");
    }
  }, []);

  return (
    <div>
      {previewImage && (
        <PreviewCard
          previewImage={previewImage}
          setDescription={setDescription}
          handlePinClick={handlePinClick}
          location={location}
          error={error}
          setLocation={setLocation}
        />
      )}
    </div>
  );
};

const PreviewCard = ({
  previewImage,
  setDescription,
  handlePinClick,
  location,
  error,
}: PreviewImageProps) => {
  return (
    <>
      {previewImage && ( // Ensure previewImage is valid before rendering Image
        <Image src={previewImage} width={500} height={500} alt="Preview" />
      )}
      <Label>
        <span>Story..?</span>
      </Label>

      {location && (
        <Label>
          {error ? (
            <p className="text-destructive">Error: {error}</p>
          ) : (
            <p>
              Location: {location.latitude}, {location.longitude}
            </p>
          )}
        </Label>
      )}
      <Input
        id="description"
        type="text"
        placeholder="How do you want to remember this picture?"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
      />
      <Button onClick={handlePinClick}>Pin it</Button>
    </>
  );
};

export default PreviewImage;
