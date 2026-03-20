import { useState } from 'react'

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
        style={{
          flex: 1,
          padding: '10px 14px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '15px',
          outline: 'none',
          transition: 'border 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#4CAF50'}
        onBlur={e => e.target.style.borderColor = '#ddd'}
      />
      <button
        type="submit"
        style={{
          padding: '10px 18px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '15px',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.target.style.background = '#45a049'}
        onMouseLeave={e => e.target.style.background = '#4CAF50'}
      >
        + Добавить
      </button>
    </form>
  )
}

export default AddTodoForm
