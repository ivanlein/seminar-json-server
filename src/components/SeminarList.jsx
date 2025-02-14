import React, { useEffect, useState } from "react";
import SeminarItem from "./SeminarItem";
import "./styles/SeminarList.css";

// Компонент для отображения списка семинаров
const SeminarList = () => {
  // Состояние для хранения списка семинаров
  const [seminars, setSeminars] = useState([]);

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState(true);

  // Состояние для хранения ошибок
  const [error, setError] = useState(null);

  // Эффект для загрузки данных с сервера при монтировании компонента
  useEffect(() => {
    fetch("http://localhost:3001/seminars")
      .then((response) => {
        // Проверяем, успешен ли запрос
        if (!response.ok) {
          throw new Error("Ответ сети был не в порядке");
        }
        return response.json(); // Преобразуем ответ в JSON
      })
      .then((data) => {
        setSeminars(data); // Сохраняем данные в состоянии
        setLoading(false); // Убираем состояние загрузки
      })
      .catch((error) => {
        console.error("Не удалось загрузить семинары:", error);
        setError(error.message); // Сохраняем ошибку в состоянии
        setLoading(false); // Убираем состояние загрузки
      });
  }, []); //Эффект выполнится только один раз

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/seminars/${id}`, {
      method: "DELETE", // Отправляем delete запрос на сервер
    })
      .then(() => {
        // Обновляем состояние, удаляя семинар из списка
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
      })
      .catch((error) => console.error("Ошибка удаления семинара:", error));
  };

  // Функция для обновления семинара
  const handleEdit = (updatedSeminar) => {
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar
      )
    );
  };

  // Отображаем состояние загрузки
  if (loading) return <div className="loading">Загрузка...</div>;

  // Отображаем ошибку, если она есть
  if (error) return <div className="error">Ошибка: {error}</div>;

  // Рендерим список семинаров
  return (
    <div className="seminar-list">
      <h1>Семинары</h1>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id} // Уникальный ключ для каждого элемента списка
          seminar={seminar} // Передаем данные о семинаре
          onDelete={handleDelete} // Передаем функцию удаления
          onEdit={handleEdit} // Передаем функцию редактирования
        />
      ))}
    </div>
  );
};

export default SeminarList;
