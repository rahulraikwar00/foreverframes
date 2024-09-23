"use client";

import MemoryWall from "./ImageGallary";

const AllPinnedPictures = ({ PinPicture }: { PinPicture: PinnedPicture[] }) => {
  if (PinPicture.length === 0) {
    return null;
  }

  return <MemoryWall memories={PinPicture} />;
};

export default AllPinnedPictures;
