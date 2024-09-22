import React, { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationComponentProps {
  setLocation: (value: Coordinates | null) => void;
}

const GeolocationComponent: React.FC<GeolocationComponentProps> = ({
  setLocation,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [location, setLocalLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const coords: Coordinates = { latitude, longitude };
      setLocation(coords);
      setLocalLocation(coords); // Set local state for display
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [setLocation]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
