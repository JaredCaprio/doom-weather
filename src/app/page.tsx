"use client";
import { WeatherInfoCard } from "@/components/WeathInfoCard";
import { useEffect, useRef, useState } from "react";
import FetchWeatherData from "../utils/FetchWeatherData";
import Modal from "../components/Modal";
import { BsFillGearFill } from "react-icons/bs";
import useLocalStorage from "@/customHooks/useLocalStorage";

type weatherData = {
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
  const [pinnedLocations, setPinnedLocations] = useState<Array<string>>([]);
  const [pinnedLocationsData, setPinnedLocationsData] = useState<weatherData[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const [doomify, setDoomify] = useState(true);
  const inputRef = useRef<any>(null);

  function closeModal() {
    setOpenModal(false);
  }

  function getItemsFromLocalStorage() {
    const pinsFromLocalStorage = localStorage.getItem("pinnedCities");
    if (pinsFromLocalStorage !== null) {
      setPinnedLocations(JSON.parse(pinsFromLocalStorage));
    }
  }

  async function fetchDataForPinnedLocations() {
    const promises = pinnedLocations.map((city) => {
      return FetchWeatherData(city);
    });
    const resolvedData = await Promise.all(promises);
    setPinnedLocationsData(resolvedData);
  }

  function addLocationToLocalStorage(cityName: string, regionName: string) {
    let itemsInLocalStorage = localStorage.getItem("pinnedCities");
    console.log(cityName, regionName);

    if (itemsInLocalStorage !== null) {
      const parsedItems = JSON.parse(itemsInLocalStorage);
      if (!parsedItems.includes(`${cityName} ${regionName}`)) {
        parsedItems.push(`${cityName} ${regionName}`);
        localStorage.setItem("pinnedCities", JSON.stringify(parsedItems));
        setPinnedLocations((prev) => [...prev, `${cityName} ${regionName}`]);
      } else {
        //remove from Local Storage
        const filteredList = parsedItems.filter(
          (loc: any) => loc !== `${cityName} ${regionName}`
        );
        localStorage.setItem("pinnedCities", JSON.stringify(filteredList));
        setPinnedLocations(filteredList);
      }
    } else {
      localStorage.setItem("pinnedCities", JSON.stringify([cityName]));
      setPinnedLocations([`${cityName} ${regionName}`]);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (inputRef.current !== null) {
        const currentValue = inputRef.current.value;
        const data = await FetchWeatherData(currentValue);
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error, "tried and caught a case B");
      setWeatherData(null);
    }
  }

  useEffect(() => {
    getItemsFromLocalStorage();
  }, []);

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
        <h1 className="text-5xl">Doom Weather</h1>
        <sub className="text-xs italic">
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
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <button className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
            Search
          </button>
        </form>
      </div>
      <BsFillGearFill
        onClick={() => setOpenModal(true)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />
      {weatherData && (
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
          />
        </div>
      )}

      {pinnedLocations.length > 0 && <h3 className="mb-2">Pinned Locations</h3>}
      <div className="flex flex-column flex-wrap gap-1 font-mono">
        {pinnedLocationsData.map((weatherData, i) => (
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
          />
        ))}
      </div>
    </div>
  );
}
