"use client";
import Image from "next/image";
import React, { useMemo } from "react";
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
  currentValue?: string;
};

const phrases = [
  " chance of spontaneously bursting into flames",
  " chance of bleeding from your eyes",
  " chance of getting third degree burns",
  " chance of your skin metling off",
  " chance of melting into a pool of flesh",
];

function useMemoizedRandomNumber(limit: number) {
  return useMemo(() => Math.floor(Math.random() * limit), [limit]);
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
  currentValue,
}: WeatherInfoProps) {
  const randomNumWithLimit100 = useMemoizedRandomNumber(100);
  const randomNumWithLimitPhrasesLen = useMemoizedRandomNumber(phrases.length);
  return (
    <div
      className="border border-slate-400 hover:border-slate-500 shadow-slate-300 transition-colors rounded-lg p-4 relative"
      style={{ width: "calc(100 * 98vw)", maxWidth: "350px" }}
    >
      {city ? (
        <div className="absolute right-2 top-2 cursor-pointer slate-50 hover:slate-400">
          <AiFillPushpin
            className="opacity-10 hover:opacity-100 transition-all delay-15"
            onClick={() => addToLS(currentValue)}
            style={pinned && { color: "firebrick", opacity: "1" }}
          />
        </div>
      ) : null}

      {city !== undefined ? (
        <>
          <h1 style={{ fontSize: "calc(16px + 1vw)" }}>{city}</h1>
          <p>{region}</p>
          <p>{country}</p>

          <p className="text-3xl">{`${
            temp_f && doomify ? temp_f + 50 + "°F" : temp_f + "°F"
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
              ` with a ${randomNumWithLimit100}% ${phrases[randomNumWithLimitPhrasesLen]}`}
          </p>
        </>
      ) : null}
    </div>
  );
}
