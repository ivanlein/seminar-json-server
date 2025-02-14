import React, { useState } from "react";
import "./styles/EditSeminarModal.css";

// Компонент для модального окна редактирования семинара
const EditSeminarModal = ({ seminar, onClose, onSave }) => {
  // Состояния для хранения измененных данных
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);
  const [photo, setPhoto] = useState(seminar.photo);

  // Функция для сохранения изменений
  const handleSave = () => {
    onSave({
      ...seminar, // Сохраняем все поля семинара
      title, // Обновляем заголовок
      description, // Обновляем описание
      date, // Обновляем дату
      time, // Обновляем время
      photo, // Обновляем фото
    });
  };

  // Рендерим модальное окно
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактировать Семинар</h2>
        {/* Поле для редактирования заголовка */}
        <input
          value={title} // Текущее значение из состояния
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        {/* Обновляем состояние при изменении */}
        {/* Поле для редактирования описания */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Поле для редактирования даты */}
        <input value={date} onChange={(e) => setDate(e.target.value)} />
        {/* Поле для редактирования времени */}
        <input value={time} onChange={(e) => setTime(e.target.value)} />
        {/* Поле для редактирования фото */}
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} />
        {/* Кнопка для сохранения изменений */}
        <button onClick={handleSave}>Сохранить</button>
        {/* Кнопка для отмены редактирования */}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default EditSeminarModal;
