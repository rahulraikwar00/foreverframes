// Declare global types
declare global {
  interface PinnedPicture {
    id: string;
    url: string;
    location: Coordinates | null;
    timestamp: string | Date;
    description?: string;
  }
  interface Coordinates {
    latitude: number;
    longitude: number;
  }
}

export {};
