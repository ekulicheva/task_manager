function TodoFilters({ filter, onFilterChange, activeCount }) {
  const filters = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Выполненные' },
  ]

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <span style={{ color: '#666', fontSize: '14px' }}>
        Осталось: <b>{activeCount}</b>
      </span>

      <div style={{ display: 'flex', gap: '6px' }}>
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            style={{
              padding: '5px 12px',
              border: '1px solid #ddd',
              background: filter === f.value ? '#4CAF50' : 'white',
              color: filter === f.value ? 'white' : '#333',
              borderColor: filter === f.value ? '#4CAF50' : '#ddd',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TodoFilters
