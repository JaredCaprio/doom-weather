import FetchWeatherData from "@/utils/FetchWeatherData";
import { WeatherInfoCard } from "./WeathInfoCard";
import { useEffect, useState } from "react";

type Props = {};
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
  error: {
    code: number;
    message: string;
  };
};

const getPinnedLocationsFromLocalStorage = () => {
  const locations = localStorage.getItem("pinnedCities");
  if (locations !== null) {
    return JSON.parse(locations);
  } else {
    localStorage.setItem("pinnedCities", JSON.stringify([]));
  }
};

export default function PinnedLocations({}: Props) {
  return <div className="flex flex-row gap-3"></div>;
}
