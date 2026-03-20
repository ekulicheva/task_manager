import { useState, useEffect } from 'react'
import AddTodoForm from './components/AddTodoForm'
import TodoFilters from './components/TodoFilters'
import TodoItem from './components/TodoItem'

function App() {
  // Загружаем задачи из localStorage при инициализации
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos-p13')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('all')

  // Дополнительное задание 2: переключатель темы
  const [isDark, setIsDark] = useState(false)

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('todos-p13', JSON.stringify(todos))
  }, [todos])

  // Применяем тему к body
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#1a1a2e' : '#f0f2f5'
    document.body.style.color = isDark ? '#eee' : '#333'
  }, [isDark])

  // Добавление новой задачи
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  // Переключение статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  // Редактирование задачи (дополнительное задание 1)
  const editTodo = (id, text) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text } : t))
  }

  // Фильтрация задач
  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  const cardBg = isDark ? '#16213e' : 'white'
  const textColor = isDark ? '#eee' : '#333'

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
    }}>
      {/* Кнопка смены темы (дополнительное задание 2) */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          background: isDark ? '#eee' : '#333',
          color: isDark ? '#333' : 'white',
          zIndex: 100,
        }}
      >
        {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
      </button>

      <h1 style={{ textAlign: 'center', color: textColor, marginBottom: '20px', fontSize: '28px' }}>
        📝 Менеджер задач
      </h1>

      <AddTodoForm onAdd={addTodo} />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />

      {filteredTodos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#bbb' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>
            {filter === 'all' ? '📋' : filter === 'active' ? '✅' : '🗂️'}
          </div>
          <p>
            {filter === 'all'
              ? 'Задач пока нет. Добавьте первую!'
              : filter === 'active'
              ? 'Нет активных задач'
              : 'Нет выполненных задач'}
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '10px',
            background: '#ff5252',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#e53935'}
          onMouseLeave={e => e.target.style.background = '#ff5252'}
        >
          🗑️ Очистить все задачи
        </button>
      )}

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#aaa' }}>
        💡 Двойной клик на задаче — редактирование
      </p>
    </div>
  )
}

export default App
