"use client";

import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PreviewImageProps {
  previewImage: string | null;
  setDescription: (value: string | null) => void;
  handlePinClick: () => void;
}

const PreviewImage = ({
  previewImage,
  setDescription,
  handlePinClick,
}: PreviewImageProps): JSX.Element => {
  return (
    <div>
      {previewImage && (
        <PreviewCard
          previewImage={previewImage}
          setDescription={setDescription}
          handlePinClick={handlePinClick}
        />
      )}
    </div>
  );
};

const PreviewCard = ({
  previewImage,
  setDescription,
  handlePinClick,
}: PreviewImageProps) => {
  return (
    <>
      {previewImage && ( // Ensure previewImage is valid before rendering Image
        <Image
          src={previewImage}
          width={500}
          height={500}
          alt="Preview"
          className="object-cover"
        />
      )}
      <Label>
        <span>Story..?</span>
      </Label>
      <Input
        id="description"
        type="text"
        placeholder="How do you want to remember this picture?"
        className="w-full sm:w-auto"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
      />
      <Button onClick={handlePinClick}>Pin it</Button>
    </>
  );
};

export default PreviewImage;
