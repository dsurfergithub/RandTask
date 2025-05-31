import React, { useState, useRef } from 'react';
import { FaPlus, FaPlay, FaRedo, FaCheck, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import './styles.css';
import Roulette from './components/Roulette';

function App() {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTask = () => {
    const task = inputRef.current?.value.trim();
    if (task) {
      setTasks([...tasks, task]);
      inputRef.current.value = '';
    }
  };

  const handleCompleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const handleDeleteTask = (task) => {
    setCompletedTasks(completedTasks.filter(t => t !== task));
  };

  const handleSpin = () => {
    if (tasks.length === 0) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    // Simular giro de la ruleta
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      const selected = tasks[randomIndex];
      setSelectedTask(selected);
      setIsSpinning(false);
      setShowResult(true);
    }, 3000);
  };

  const resetApp = () => {
    setTasks([]);
    setCompletedTasks([]);
    setSelectedTask(null);
    setShowResult(false);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  const completeSelectedTask = () => {
    if (selectedTask) {
      handleCompleteTask(selectedTask);
      setShowResult(false);
    }
  };

  // Aplicar clase de tema oscuro al body
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      <div className="left-panel">
        <div className="card roulette-container">
          <div className="roulette-marker" />
          <Roulette 
            tasks={tasks}
            isSpinning={isSpinning}
            onSpinComplete={(task) => setSelectedTask(task)}
          />
        </div>
        
        <button 
          className="spin-button" 
          onClick={handleSpin}
          disabled={isSpinning || tasks.length === 0}
        >
          <FaPlay /> {isSpinning ? 'Girando...' : '¡Girar la Rueda!'}
        </button>
      </div>

      <div className="right-panel">
        <div className="card">
          <h3>Añadir Nueva Tarea</h3>
          <div className="task-input-container">
            <input
              type="text"
              className="task-input"
              placeholder="Introduce la descripción de la tarea"
              ref={inputRef}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button className="add-button" onClick={handleAddTask}>
              <FaPlus /> Añadir
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Lista de Tareas</h3>
          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-state">Aún no hay tareas añadidas. ¡Añade algunas tareas para empezar!</p>
            ) : (
              tasks.map((task, index) => (
                <div key={index} className="task-item">
                  {task}
                  <div className="task-actions">
                    <button 
                      className="complete-button"
                      onClick={() => handleCompleteTask(task)}
                    >
                      Completar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h3>Tareas Completadas</h3>
          <div className="completed-tasks">
            {completedTasks.length === 0 ? (
              <p className="empty-state">Aún no hay tareas completadas.</p>
            ) : (
              completedTasks.map((task, index) => (
                <div key={index} className="task-item">
                  <span style={{ textDecoration: 'line-through' }}>{task}</span>
                  <div className="task-actions">
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button className="reset-button" onClick={resetApp}>
          <FaRedo /> Reiniciar Aplicación
        </button>
      </div>

      {/* Modal de resultado */}
      {showResult && selectedTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¡Tarea Seleccionada!</h2>
            <div className="modal-content">
              <p>La tarea seleccionada es:</p>
              <h3>{selectedTask}</h3>
              <div className="modal-actions">
                <button 
                  className="modal-button complete"
                  onClick={completeSelectedTask}
                >
                  <FaCheck /> Completar
                </button>
                <button 
                  className="modal-button cancel"
                  onClick={closeResult}
                >
                  <FaTimes /> Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
