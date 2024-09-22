import React, { useState, useRef, useEffect } from "react";

const CameraClick: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStreaming(true);
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    getCamera();

    return () => {
      if (videoRef.current && streaming) {
        const stream = videoRef.current.srcObject;
        if (stream instanceof MediaStream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, [streaming]);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);

        const imageDataUrl = canvas.toDataURL("image/png");
        console.log(imageDataUrl); // You can use this URL as per your requirement
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={handleCapture}>Capture Photo</button>
    </div>
  );
};

export default CameraClick;
