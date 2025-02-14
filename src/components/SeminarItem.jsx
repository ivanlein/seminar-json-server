import React, { useState } from "react";
import EditSeminarModal from "./EditSeminarModal";
import "./styles/SeminarItem.css";

// Компонент для отображения отдельного семинара
const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  // Состояние для управления модальным окном
  const [isEditing, setIsEditing] = useState(false);

  // Функция для удаления семинара
  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот семинар?")) {
      onDelete(seminar.id); // Вызываем функцию удаления из родительского компонента
    }
  };

  // Функция для открытия модального окна
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Функция для сохранения изменений после редактирования
  const handleSave = (updatedSeminar) => {
    fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
      method: "PUT", // Отправляем put запрос на сервер
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSeminar), // Преобразуем данные в JSON
    })
      .then(() => {
        onEdit(updatedSeminar); // Обновляем состояние в родительском компоненте
        setIsEditing(false); // Закрываем модальное окно
      })
      .catch((error) => console.error("Ошибка обновления семинара:", error));
  };

  // Рендерим карточку семинара
  return (
    <div className="seminar-item">
      {/* Рендерим модальное окно редактирования, если isEditing = true */}
      {isEditing && (
        <EditSeminarModal
          seminar={seminar} // Передаем данные о семинаре
          onClose={() => setIsEditing(false)} // Функция для закрытия модального окна
          onSave={handleSave} // Функция для сохранения изменений
        />
      )}
      {/* Отображаем изображение семинара (показывает только с vpn) */}
      <img src={seminar.photo} alt={seminar.title} />
      <div className="content">
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <div className="details">
          <p>Дата: {seminar.date}</p>
          <p>Время: {seminar.time}</p>
        </div>
        <div className="actions">
          {/* Кнопка для редактирования семинара */}
          <button className="edit" onClick={handleEdit}>
            Редактировать
          </button>
          {/* Кнопка для удаления семинара */}
          <button className="delete" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeminarItem;
