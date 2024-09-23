"use client";

import Image from "next/image";
import { MapPinIcon, CalendarIcon } from "lucide-react";
export default function MemoryWall({
  memories = [],
}: {
  memories: PinnedPicture[];
}) {
  if (!memories || memories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        No memories pinned yet. Start creating some!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-amber-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="relative bg-white p-2 shadow-md transform rotate-[-1deg] hover:rotate-0 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative w-full pb-[100%] overflow-hidden">
              <Image
                src={memory.url}
                alt={memory.description || "Pinned memory"}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300" />
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {memory.description && (
                <p className="font-medium mb-1 line-clamp-2">
                  {memory.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                {memory.location && (
                  <div className="flex items-center">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    <span className="truncate">
                      {memory.location.latitude.toFixed(2)},{" "}
                      {memory.location.longitude.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center ml-auto">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  <span>{new Date(memory.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-200 rounded-full shadow-inner transform rotate-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
