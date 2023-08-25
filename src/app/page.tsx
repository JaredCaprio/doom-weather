"use client";
import { WeatherInfoCard } from "@/components/WeathInfoCard";
import { useEffect, useRef, useState } from "react";
import FetchWeatherData from "../utils/FetchWeatherData";
import Modal from "../components/Modal";
import { BsFillGearFill } from "react-icons/bs";
import { useLocalStorage } from "@/customHooks/useLocalStorage";
import { Advent_Pro } from "next/font/google";
import Image from "next/image";

const advent = Advent_Pro({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-advent",
});

type weatherData = {
  currentValue: string;
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_f: number;
    humidity: number;
  };
  error?: {
    code: number;
    message: string;
  };
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<weatherData | null>();
  const [pinnedLocations, setPinnedLocations] = useLocalStorage<string[]>(
    "pinnedCities",
    []
  );
  const [pinnedLocationsData, setPinnedLocationsData] = useState<weatherData[]>(
    []
  );
  const [validInput, setValidInput] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [doomify, setDoomify] = useState(true);
  const inputRef = useRef<any>(null);

  function closeModal() {
    setOpenModal(false);
  }

  //Handle submiting data to make fetch request
  async function handleSubmit(e: any) {
    e.preventDefault();

    const currentValue = inputRef.current.value;

    if (currentValue) {
      const data = await FetchWeatherData(currentValue);

      if (data !== null) {
        setValidInput(true);
        setWeatherData({ ...data, currentValue });
      } else {
        setValidInput(false);
      }
    } else {
      setValidInput(false);
    }
  }

  //Add location to PinnedLocations and localStorage
  function addLocationToLocalStorage(currentValue: string) {
    if (pinnedLocations !== null) {
      if (!pinnedLocations.includes(currentValue)) {
        setPinnedLocations((prev: any) => [...prev, currentValue]);
      } else {
        const curVal = currentValue;
        const filteredList = pinnedLocations.filter(
          (loc: any) => loc !== curVal
        );
        setPinnedLocations(filteredList);
      }
    }
  }

  //Fetch the data for the pinned locations on load of page
  async function fetchDataForPinnedLocations() {
    const promises = pinnedLocations.map((currentValue: any) => {
      return FetchWeatherData(currentValue);
    });

    const resolvedData = await Promise.all(promises);

    const pinnedLocationsWithData = resolvedData.map((data, index) => ({
      ...data,
      currentValue: pinnedLocations[index],
    }));

    setPinnedLocationsData(pinnedLocationsWithData);
  }

  useEffect(() => {
    fetchDataForPinnedLocations();
  }, [pinnedLocations]);

  return (
    <div>
      {openModal && (
        <Modal
          setDoomify={setDoomify}
          doomify={doomify}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      <header className="flex justify-start gap-3 items-end mb-4">
        <h1
          className={`${advent.variable} font-sans text-5xl`}
          style={{
            background: "-webkit-linear-gradient(#eee, #f80)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Doom Weather
        </h1>
        <sub className="hidden sm:block  text-xs italic">
          We&#39;re are all going to burn to death
        </sub>
      </header>
      <div className="flex gap-1 justify-end relative">
        <form onSubmit={(e) => handleSubmit(e)} className="m-5">
          <input
            ref={inputRef}
            type="text"
            name="city"
            placeholder="Enter City Name"
            className="w-full sm:w-fit border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <button className="w-full sm:w-fit  border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none ">
            Search
          </button>
        </form>
      </div>
      <BsFillGearFill
        onClick={() => setOpenModal(true)}
        style={{ position: "absolute", top: 23, right: 10 }}
      />
      {!validInput && (
        <div className="flex justify-center items-center relative">
          <p className="absolute tracking-widest text-3xl text-red-400 z-10">
            INVALID INPUT
          </p>
          <Image
            className="opacity-50"
            src="/face-melt.gif"
            height={350}
            width={400}
            alt=" "
          />
        </div>
      )}

      {weatherData && validInput && (
        <div className="flex flex-row gap-3 mb-4 font-mono">
          <WeatherInfoCard
            city={weatherData?.location.name}
            temp_f={weatherData?.current.temp_f}
            region={weatherData?.location.region}
            condition={weatherData?.current.condition.text}
            humidity={weatherData?.current.humidity}
            icon={weatherData?.current.condition.icon}
            country={weatherData?.location.country}
            altText={weatherData ? "Enter Valid City" : ""}
            addToLS={addLocationToLocalStorage}
            doomify={doomify}
            currentValue={weatherData.currentValue}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-1 font-mono mt-10">
        {pinnedLocationsData.map((weatherData, i) => (
          <>
            <WeatherInfoCard
              key={i}
              city={weatherData?.location.name}
              temp_f={weatherData?.current.temp_f}
              region={weatherData?.location.region}
              condition={weatherData?.current.condition.text}
              humidity={weatherData?.current.humidity}
              icon={weatherData?.current.condition.icon}
              country={weatherData?.location.country}
              pinned={true}
              addToLS={addLocationToLocalStorage}
              doomify={doomify}
              currentValue={weatherData?.currentValue}
            />
          </>
        ))}
      </div>
    </div>
  );
}
