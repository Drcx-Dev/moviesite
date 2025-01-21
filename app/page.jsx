"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import avengers from "../app/photo/avengers.png";
import avatar from "../app/photo/avatar.png";
import titanic from "../app/photo/titanic.png";
import us from "../app/photo/us.png";
import { genres } from "./genres"; // Импортируем список жанров
import bg from "../app/photo/bg.png";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Текущее изображение
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(genres); // Состояние для фильтрованных фильмов

  const images = [avengers, avatar, titanic, us];
  const descriptions = [
    "Мстители — фантастический боевик о супергероях, объединённых для борьбы с глобальной угрозой.",
    "Аватар — научно-фантастический фильм, действие которого происходит на инопланетной луне Пандора.",
    "Титаник — драмеди о любви на фоне трагической катастрофы знаменитого корабля.",
    "Мы — психологический хоррор о борьбе человека с его зловещей тенью.",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = genres.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); //
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Используем useEffect для автоматического переключения слайдов через 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Переключение через 5 секунд

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-950 min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center w-full">
        <div className="text-2xl font-bold">DRCX'S MOVIES</div>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center space-x-2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск фильмов..."
            className="p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-r-lg hover:bg-blue-600"
          >
            Поиск
          </button>
        </form>

        <div className="hidden md:block text-lg">
          <a href="/profile" className="hover:underline">
            Личный кабинет
          </a>
        </div>

        {/* Бургер-меню */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Меню для мобильных устройств */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-0 left-0 right-0 bg-gray-900 text-white p-4`}
        >
          <ul className="space-y-4">
            <li>
              <a href="/profile" className="hover:underline">
                Личный кабинет
              </a>
            </li>
            <li>
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск фильмов..."
                  className="p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 rounded-r-lg hover:bg-blue-600"
                >
                  Поиск
                </button>
              </form>
            </li>
          </ul>
        </div>
      </header>

      {/* Основная часть с изображением слайдера */}
      <main className="flex justify-center items-center flex-1">
        <div className="relative w-full h-screen">
          <div className="transition-all duration-700 ease-in-out transform">
            <Image
              src={images[currentIndex]}
              alt="Movie poster"
              className="rounded-lg object-cover justify-self-center w-[700px] h-[840px] mt-8"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm text-center bg-black bg-opacity-50 p-4 rounded-lg">
            {descriptions[currentIndex]}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600"
          >
            &#10095;
          </button>
        </div>
      </main>

      {/* Секция с кнопкой и описанием */}
      <main>
        <div className="justify-self-center mt-36">
          <button className="bg-red-700 hover:bg-gray-500 rounded-lg w-44 h-12 text-white">
            Смотреть
          </button>
        </div>
        <div className="pl-3">
          <h1 className="text-white mt-10 text-3xl">
            Изучите наше разнообразие категорий:
          </h1>
          <p className="text-gray-500">
            Ищете ли вы комедию, которая заставит вас смеяться, драму, которая
            заставит задуматься, или документальный фильм, чтобы узнать что-то
            новое.
          </p>
        </div>
      </main>

      {/* Карточки жанров */}
      <section>
        <div className="flex flex-wrap gap-8 mt-8 justify-center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((product) => (
              <div
                key={product.id}
                className="product bg-gray-900 p-2 w-64 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <Link href={`/movie-details/${product.id}`}>
                  <div>
                    <Image
                      width={500}
                      height={300}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      {product.name}
                    </h3>
                  </div>
                </Link>

                <Link href={`/movie-details/${product.id}`}>
                  <button className="mt-4 w-full py-2 bg-red-700 text-white rounded-full hover:bg-gray-500">
                    Смотреть
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-white">Фильмы не найдены</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="absolute">
          <Image src={bg} className="w-full" alt="background" />
        </div>
        <h1 className="relative text-4xl text-white p-28">
          Начните бесплатный просмотр фильма сегодня!
        </h1>
        <p className="relative text-2xl text-white pl-28 bottom-10">
          Зарегистрируйтесь и смотрите бесплатно фильмы на свой вкус
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-14">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">DRCX'S MOVIES</div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} DRCX'S MOVIES. Все права защищены.
        </div>
      </footer>
    </section>
  );
}
