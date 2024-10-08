import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface ImageData {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface bounds {
  x: number;
  y: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | any>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [offset, setOffset] = useState<bounds>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to draw all images on the canvas
    const drawImages = () => {
      ctx.clearRect(0, 0, canvas?.width, canvas?.height);
      images.forEach((image: ImageData) => {
        ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
      });
    };

    // Redraw images when state updates
    if (images.length > 0) {
      drawImages();
    }

    // Event listener for pasting images
    const handlePaste = (e: ClipboardEvent) => {
      const clipboardItems: any = e.clipboardData?.items;
      for (const item of clipboardItems) {
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const img = new Image();
          img.onload = () => {
            setImages((prev: ImageData[]) => [
              ...prev,
              { img, x: 50, y: 50, width: img.width, height: img.height },
            ]);
          };
          img.src = URL.createObjectURL(blob);
        }
      }
    };

    // Add paste event listener
    window.addEventListener("paste", handlePaste as EventListener);

    return () => {
      window.removeEventListener("paste", handlePaste as EventListener);
    };
  }, [images]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const img = new Image();
    img.onload = () => {
      setImages((prev: ImageData[]) => [
        ...prev,
        { img, x: 50, y: 50, width: img.width, height: img.height },
      ]);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    images.forEach((image: ImageData, index: number) => {
      if (
        x > image.x &&
        x < image.x + image.width &&
        y > image.y &&
        y < image.y + image.height
      ) {
        setSelectedImageIndex(index);
        setSelectedImage(index);
        setOffset({
          x: x - image.x,
          y: y - image.y,
        }); // Calculate offset properly based on scaled canvas
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedImageIndex !== null) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect(); // Get canvas size
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = {
        ...updatedImages[selectedImageIndex],
        x: x - offset.x,
        y: y - offset.y,
      };
      setImages(updatedImages);
    }
  };

  const handleMouseUp = () => {
    setSelectedImageIndex(null);
    setOffset({ x: 0, y: 0 }); // Reset offset when dragging ends
  };

  // Function to delete selected image
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete" && selectedImage !== null) {
      const updatedImages = images.filter(
        (_: any, index: number) => index !== selectedImage
      );
      setImages(updatedImages);
      setSelectedImageIndex(null);
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, images]);

  // Export functionality to PNG
  const handleExport = () => {
    const canvas: any = canvasRef.current;
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = canvas?.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="p-6 max-w-[800px] w-full mx-auto"
    >
      <button
        onClick={handleExport}
        className="bg-gray-600 text-white rounded-md py-2 px-4 mb-6"
      >
        Export as PNG
      </button>
      <span className="ml-3 text-sm text-gray-500">
        Drop or paste images into canvas
      </span>
      <canvas
        className="bg-gray-400 h-[500px] w-full"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
