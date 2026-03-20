import { useState } from 'react'

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  // Дополнительное задание 1: редактирование по двойному клику
  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleEditSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      if (editText.trim()) onEdit(task.id, editText.trim())
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      background: 'white',
      borderRadius: '8px',
      marginBottom: '8px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      transition: 'box-shadow 0.2s',
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#4CAF50' }}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleEditSubmit}
          onBlur={handleEditSubmit}
          autoFocus
          style={{
            flex: 1,
            padding: '4px 8px',
            border: '1px solid #4CAF50',
            borderRadius: '4px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          title="Дважды кликните для редактирования"
          style={{
            flex: 1,
            fontSize: '15px',
            color: task.completed ? '#aaa' : '#333',
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{
          padding: '4px 10px',
          background: '#ff5252',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.target.style.background = '#e53935'}
        onMouseLeave={e => e.target.style.background = '#ff5252'}
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
