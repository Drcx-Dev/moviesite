"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { genres } from "@/app/genres";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion"; // Подключаем framer-motion для анимаций
import Link from "next/link";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) return <div>Загрузка...</div>;
  const genre = genres.find((genre) => genre.id === parseInt(id));

  if (!genre) {
    return <div>Жанр не найден!</div>;
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  // Функция для удаления комментария
  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  // Функция для обработки кнопки "Поделиться"
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: genre.name,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully")) // Если успешно поделились
        .catch((error) => console.error("Error sharing", error)); // Обработка ошибки
    } else {
      navigator.clipboard
        .writeText(window.location.href) // Копируем ссылку в буфер обмена
        .then(() => alert("Ссылка скопирована в буфер обмена!"))
        .catch((error) => console.error("Error copying link", error)); // Обработка ошибки
    }
  };

  return (
    <div className="movie-details bg-gray-950 text-white pt-8 px-4 md:px-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-extrabold text-gradient">{genre.name}</h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-start">
        <motion.div
          className="lg:w-1/3 mb-6 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            className="rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105"
            src={genre.image}
            alt={genre.name}
            width={500}
            height={300}
            layout="responsive"
            objectFit="cover"
          />
        </motion.div>

        <motion.div
          className="lg:w-2/3 text-xl max-w-prose mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p className="mb-6">{genre.plot}</p>
          <p className="font-semibold">{genre.description}</p>{" "}
        </motion.div>
      </div>

      {genre.videos && genre.videos.length > 0 ? (
        <div className="mt-8">
          {genre.videos.map((videoUrl, index) => (
            <motion.div
              key={index}
              className="player-wrapper mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              style={{ maxWidth: "100%", margin: "auto" }}
            >
              <ReactPlayer
                url={videoUrl}
                className="react-player"
                width="100%"
                height="400px"
                controls
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center">Видео для этого жанра не найдены.</p> // Если видео нет
      )}

      {/* Кнопка "Поделиться" */}
      <motion.div
        className="mt-7 text-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        <button
          onClick={handleShare} // Вызов функции "Поделиться"
          className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Поделиться
        </button>
      </motion.div>

      {/* Секция комментариев */}
      <div className="comments-section mt-12">
        <h2 className="text-2xl font-bold mb-4">Комментарии</h2>

        {/* Форма для добавления нового комментария */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Оставьте ваш комментарий..."
          className="w-full p-4 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white"
          rows="4"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          Оставить комментарий
        </button>

        {/* Отображение комментариев */}
        <div className="mt-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-800 p-4 mb-4 rounded-lg">
                <p>{comment}</p>
                {/* Кнопка для удаления комментария */}
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="mt-2 text-red-500 hover:text-red-700 flex justify-self-end text-2xl"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <footer className="bg-gray-900 text-white py-8 mt-14">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-bold">DRCX'S MOVIES</div>
          </div>
          <div className="text-center text-sm text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} DRCX'S MOVIES. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MovieDetails;
