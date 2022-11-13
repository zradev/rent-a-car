import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { v4 } from "uuid";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { handleAxiosErrors } from "../../utils/helpfulFunctions";

const AddCar = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2022);
  const [type, setType] = useState("economy");
  const [price, setPrice] = useState(0);
  const [fuel, setFuel] = useState("petrol");
  const [seats, setSeats] = useState(4);
  const [images, setImages] = useState([] as string[]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<any>();
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await uploadImages().then(async (res) => {
      if (!res) {
        throw new Error("No images selected");
      }
      try {
        await axios.post(`http://localhost:8080/cars/create`, {
          brand,
          model,
          year,
          type,
          price,
          fuel,
          seats,
          images: res as string[],
          location,
          description,
          count,
        });
        navigate("/cars");
      } catch (error: any) {
        if (error.response.status === 500) {
          setError("Error: All fields are required.");
        } else {
          setError(handleAxiosErrors(error));
        }
        window.scrollTo(0, 0);
      }
    });
  };

  const decreaseCount = (e: any) => {
    e.preventDefault();
    count > 0 && setCount((count) => count - 1);
  };

  const increaseCount = (e: any) => {
    e.preventDefault();
    setCount((count) => count + 1);
  };

  const uploadImages = async () => {
    if (images.length === 0) {
      setError("Error: At least 1 image is required!");
      return window.scrollTo(0, 0);
    }

    try {
      const result = await Promise.all(
        images.map((image: any) => {
          return new Promise((resolve, reject) => {
            const imageName = image.name + v4();
            const sotrageRef = ref(storage, `images/cars/${imageName}`);
            const uploadTask = uploadBytesResumable(sotrageRef, image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              (err) => {
                console.log(err);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        })
      );
      return result as string[];
    } catch (error: any) {
      setError(error);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <form
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col  w-full p-3 lg:px-[250px] md:px-[200px] my-2"
        autoComplete="off"
      >
        <h2 className="text-2xl text-center border-b mb-6">Add New Car</h2>
        {error && (
          <div className="text-center text-2xl text-rose-400">{error}</div>
        )}
        <ImageUploader images={images} setImages={setImages} />
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="brand" className="font-bold text-lg">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="model" className="font-bold text-lg">
            Model:
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="year" className="font-bold text-lg">
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            min={1980}
            onChange={(e) => setYear(+e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="type" className="font-bold text-lg">
            Type:
          </label>
          <select
            id="fuel"
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          >
            <option value="economy">Economy</option>
            <option value="estate">Estate</option>
            <option value="luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="cargo">Cargo</option>
          </select>
        </div>

        <div className=" flex justify-between items-center m-3">
          <label htmlFor="price" className="font-bold text-lg">
            Price / day:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            min={0}
            onChange={(e) => setPrice(+e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="fuel" className="font-bold text-lg">
            Fuel:
          </label>
          <select
            id="fuel"
            onChange={(e) => setFuel(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          >
            <option value="petrol">Petrol</option>
            <option value="disel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="seats" className="font-bold text-lg">
            Seats:
          </label>
          <input
            type="text"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(+e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="location" className="font-bold text-lg">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="description" className="font-bold text-lg">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            cols={30}
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          ></textarea>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="count" className="font-bold text-lg">
            Count:
          </label>
          <div className="flex gap-5 text-2xl justify-center items-center p-1 px-2 w-[45vw] md:w-[20vw]">
            <button
              onClick={decreaseCount}
              className="flex justify-center items-center text-white w-5 h-5 bg-sky-700 rounded-full hover:scale-110"
            >
              -
            </button>
            <p>{count}</p>
            <button
              onClick={increaseCount}
              className="flex justify-center items-center text-white w-5 h-5 bg-sky-700 rounded-full hover:scale-110"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {progress > 0 && <p>Creating: {progress}%</p>}
          <input
            type="submit"
            className="text-white bg-sky-800 text-start w-fit mt-2 mb-10 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
            value={"Create"}
          />
        </div>
      </form>
    </>
  );
};

export default AddCar;
