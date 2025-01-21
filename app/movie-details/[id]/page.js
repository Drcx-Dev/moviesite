"use client";

import { useParams } from "next/navigation"; // Используем useParams
import Image from "next/image";
import { genres } from "@/app/genres"; // Импортируем массив жанров
import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) return <div>Загрузка...</div>;

  const genre = genres.find((genre) => genre.id === parseInt(id));

  if (!genre) {
    return <div>Жанр не найден!</div>;
  }

  return (
    <div className="movie-details bg-gray-950 pt-8">
      <div className="text-white text-4xl justify-self-center">
        <h1>{genre.name}</h1>
      </div>
      <div className="flex flex-col lg:flex-row">
        <Image
          className="rounded-3xl ml-14 mb-6 lg:mb-0"
          src={genre.image}
          alt={genre.name}
          width={500}
          height={300}
        />

        <div className="flex-none">
          <p className="text-white text-xl pt-20 ml-5 mt-4 max-w-prose">
            {genre.plot}
          </p>
        </div>
      </div>

      <p className="text-white ml-14 mt-4 max-w-sm font-semibold">
        {genre.description}
      </p>

      {genre.videos && genre.videos.length > 0 ? (
        genre.videos.map((videoUrl, index) => (
          <div
            key={index}
            className="player-wrapper"
            style={{ maxWidth: "100%", margin: "auto" }}
          >
            <ReactPlayer
              url={videoUrl}
              className="react-player"
              width="100%"
              height="400px"
              controls
            />
          </div>
        ))
      ) : (
        <p>Видео для этого жанра не найдены.</p>
      )}
    </div>
  );
};

export default MovieDetails;
