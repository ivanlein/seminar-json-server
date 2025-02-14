import React from 'react';
import SeminarList from './components/SeminarList';
import './App.css';

// Основной компонент приложения
function App() {
  return (
    <div className="container">
      {/* Рендерим компонент SeminarList, который отображает список семинаров */}
      <SeminarList />
    </div>
  );
}

export default App;