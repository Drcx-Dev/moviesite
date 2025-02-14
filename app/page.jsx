"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import avengers from "../app/photo/avengerss.jpg";
import avatar from "../app/photo/avatar.jpg";
import titanic from "../app/photo/titanic2.jpg";
import us from "../app/photo/uss.jpg";
import { genres } from "./genres"; // Импортируем список жанров
import bg from "../app/photo/bg.png";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Текущее изображение
  const [filteredMovies, setFilteredMovies] = useState(genres); // Состояние для фильтрованных фильмов
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модального окна
  const [login, setLogin] = useState(""); // Состояние для логина
  const [password, setPassword] = useState(""); // Состояние для пароля

  const images = [avengers, avatar, titanic, us];
  const descriptions = [
    "Мстители — фантастический боевик о супергероях, объединённых для борьбы с глобальной угрозой.",
    "Аватар — научно-фантастический фильм, действие которого происходит на инопланетной луне Пандора.",
    "Титаник — драмеди о любви на фоне трагической катастрофы знаменитого корабля.",
    "Мы — психологический хоррор о борьбе человека с его зловещей тенью.",
  ];

  // Фильтрация фильмов при изменении запроса
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = genres.filter(
      (movie) =>
        searchQuery.trim() !== "" &&
        movie.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    setFilteredMovies(filtered);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5 сек для переклю

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь будет логика для входа, например, проверка данных
    console.log("Login:", login);
    console.log("Password:", password);
    setIsModalOpen(false); // Закрываем модальное окно после успешного входа
  };

  return (
    <section className="bg-gray-950 min-h-screen flex flex-col font-sans">
      <header className="bg-gray-900 text-white p-6 flex justify-between items-center w-full">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          DRCX'S MOVIES
        </div>

        <form
          onSubmit={handleSearch}
          className="relative flex items-center space-x-2 w-full max-w-xl"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск фильмов..."
            className="p-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 w-full focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Поиск
          </button>
        </form>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 ml-4"
        >
          Войти
        </button>
      </header>

      {/* Модальное окно для входа */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Войти</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="login" className="block text-sm font-medium">
                  Логин
                </label>
                <input
                  type="text"
                  id="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700"
              >
                Войти
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/register" className="text-blue-600">
                Регистрация
              </Link>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-5xl"
            >
              X
            </button>
          </div>
        </div>
      )}

      <main className="flex justify-center items-center flex-1">
        <div className="relative w-full h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[90vh]">
          <div
            className="transition-all duration-700 ease-in-out transform"
            key={currentIndex}
          >
            <Image
              src={images[currentIndex]}
              alt="Movie poster"
              className="rounded-xl w-full h-full object-cover shadow-lg"
            />
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg sm:text-xl text-center bg-black bg-opacity-50 p-4 rounded-lg max-w-lg">
            {descriptions[currentIndex]}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            &#10095;
          </button>
        </div>
      </main>

      {/* Секция с кнопкой и описанием */}
      <div className="text-center mt-24 px-4">
        <h1 className="text-white mt-12 text-4xl sm:text-5xl font-semibold">
          Изучите наше разнообразие категорий
        </h1>
        <p className="text-gray-400 mt-4 text-lg sm:text-xl">
          Ищете ли вы комедию, драму или что-то совершенно новое, мы найдем
          подходящий фильм для вас.
        </p>
        <div className="text-white text-lg mt-10">
          <h2>Идеальные картинки и топовое озвучивание</h2>
          <h2 className="pt-4">
            Фильмы и Сериалы нажмите на PLAY и станьте королём дивана
          </h2>
        </div>
      </div>

      {/* Секция с фильмами */}
      <section className="mt-16 px-4">
        <div className="flex flex-wrap gap-8 justify-center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((product) => (
              <div
                key={product.id}
                className="h-96 p-4 w-64 text-white rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                <Link href={`/movie-details/${product.id}`}>
                  <div className="relative">
                    <p className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-green-950 text-white">
                      {product.grade}
                    </p>
                    <Image
                      width={500}
                      height={400}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-white">Фильмы не найдены</p>
          )}
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-8 mt-14">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            DRCX'S MOVIES
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} DRCX'S MOVIES. Все права защищены.
        </div>
      </footer>
    </section>
  );
}
