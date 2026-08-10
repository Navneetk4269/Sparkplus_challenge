interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return <div id="filter-bar">
    <button
      onClick={() => onFilterChange('all')}
      data-active={filter === 'all'}
    >
      All
    </button>
    <button
      onClick={() => onFilterChange('active')}
      data-active={filter === 'active'}
    >
      Active
    </button>
    <button
      onClick={() => onFilterChange('completed')}
      data-active={filter === 'completed'}
    >
      Completed
    </button>
  </div>
}
