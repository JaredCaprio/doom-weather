"use client";
import Image from "next/image";
import { AiFillPushpin } from "react-icons/ai";

type WeatherInfoProps = {
  country?: string;
  city?: string;
  region?: string;
  temp_f?: number;
  condition?: string;
  humidity?: number;
  icon?: string;
  pinned?: boolean;
  addToLS: Function;
  altText?: String;
  doomify?: boolean;
};

const phrases = [
  " chance of spontaneously bursting into flames",
  " chance of bleeding from your eyes",
  " chance of getting third degree burns",
  " chance of your skin metling off",
  " chance of melting into a pool of flesh",
];

function genRanNum(limit: number) {
  return Math.floor(Math.random() * limit);
}

export function WeatherInfoCard({
  country,
  city,
  region,
  temp_f,
  condition,
  humidity,
  icon,
  pinned,

  addToLS,
  altText,
  doomify,
}: WeatherInfoProps) {
  return (
    <div
      className="border border-slate-400 hover:border-slate-500 shadow-slate-300 transition-colors rounded-lg p-4 relative"
      style={{ width: "auto", maxWidth: "350px" }}
    >
      {city ? (
        <div className="absolute right-2 top-2 cursor-pointer slate-50 hover:slate-400">
          <AiFillPushpin
            className="opacity-10 hover:opacity-100 transition-all delay-15"
            onClick={() => addToLS(city)}
            style={pinned && { color: "firebrick", opacity: "1" }}
          />
        </div>
      ) : null}

      {city !== undefined ? (
        <>
          <h1 className="text-4xl">{city}</h1>
          <p>{region}</p>
          <p>{country}</p>
          <p className="text-3xl">{`${
            temp_f && doomify ? temp_f + 50 + "°F" : temp_f + "°F" ? temp_f : ""
          }`}</p>
          <p className="text-xs">{humidity}% Humidity</p>
          <div className="flex flex-row">
            {doomify && (
              <Image src="/flame.png" height={15} width={24} alt=" " />
            )}
            <Image src={`http:${icon}`} height={25} width={25} alt=" " />
          </div>
          <p>
            {condition}
            {doomify &&
              ` with a ${genRanNum(100)}% ${
                phrases[genRanNum(phrases.length)]
              }`}
          </p>
        </>
      ) : (
        [altText]
      )}
    </div>
  );
}
