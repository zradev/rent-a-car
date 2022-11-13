import React, { useState, useEffect, useRef } from "react";

interface IProps {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IImage {
  name: string;
  url: string;
}

const ImageUploader = ({ images, setImages }: IProps) => {
  const [imageURLs, setImageURLs] = useState<IImage[]>([]);

  const inputRef = useRef<any>(null);
  const MAX_LENGTH = 8;
  const imgPlaceholderArray = new Array(MAX_LENGTH - images.length).fill(true);

  useEffect(() => {
    if (images.length < 1) return;
    if (images.length < 8) {
      const newImageUrls: any = [];
      images.forEach((image: any) =>
        newImageUrls.push({ name: image.name, url: URL.createObjectURL(image) })
      );
      setImageURLs([...newImageUrls]);
    }
  }, [images]);

  const handleClick = (image: any) => {
    setImageURLs(imageURLs.filter((img) => img !== image));
    setImages(() =>
      images.filter((img: any) => {
        return img.name !== image.name;
      })
    );
  };

  const onImageChange = (e: any) => {
    if (images.length < 8 && e.target.files.length < 8) {
      [...e.target.files].map((file: any) => {
        if (!images.includes(file) && images.length < 8) {
          return setImages((old: any) => [...old, file]);
        }
        // eslint-disable-next-line array-callback-return
        return;
      });
    }
  };

  return (
    <>
      <div className=" text-center">
        <label htmlFor="images" className="font-bold text-lg">
          Images:
        </label>
        <p>Please select up to 8 images!</p>
        <input
          type="file"
          id="images"
          ref={inputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={onImageChange}
        />
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-4 my-5 gap-5 justify-items-center m-auto`}
      >
        {imageURLs?.length! > 0 &&
          imageURLs.length < MAX_LENGTH &&
          imageURLs?.map((img: any, idx: number) => (
            <div className="relative" key={idx}>
              <div
                className="absolute top-1 right-1 bg-red-700 rounded-md p-1 inline-flex items-center justify-center text-4xl text-white hover:bg-red-600    hover:text-black"
                onClick={() => handleClick(img)}
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>{" "}
              </div>
              <img
                src={img.url}
                alt="car"
                key={idx}
                className={"bg-cover w-[120px] h-[120px]"}
              />
            </div>
          ))}
        {imgPlaceholderArray.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center text-4xl w-[120px] h-[120px] border select-none cursor-pointer hover:border-sky-900"
            onClick={(e) => inputRef.current && inputRef.current.click()}
          >
            +
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploader;
