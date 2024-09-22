"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const AllPinnedPictures = ({ PinPicture }: { PinPicture: PinnedPicture[] }) => {
  if (PinPicture.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {PinPicture.map((picture) => (
        <div className="w-full rounded-sm border border-gray-300">
          <PinnedPictureCard picture={picture} />
        </div>
      ))}
    </div>
  );
};
const PinnedPictureCard = ({ picture }: { picture: PinnedPicture }) => {
  const timestampString = new Date(picture.timestamp).toLocaleString();
  return (
    <Card className="w-full rounded-sm border border-gray-300">
      {picture.location && (
        <CardHeader>
          <CardTitle>
            location:
            {picture.location.latitude}, {picture.location.longitude}
          </CardTitle>
        </CardHeader>
      )}
      <CardHeader>
        <CardTitle>{picture.description}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={picture.url}
          width={500}
          height={500}
          alt="Preview"
          className="object-cover"
        />
      </CardContent>
      <CardFooter>
        <CardDescription className="text-sm text-gray-500">
          {timestampString}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AllPinnedPictures;
