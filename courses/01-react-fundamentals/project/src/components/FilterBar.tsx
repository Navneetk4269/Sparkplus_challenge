interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortOrder: 'recent' | 'high-low' | 'low-high' | 'alphabetical'
  onSortChange: (sortOrder: 'recent' | 'high-low' | 'low-high' | 'alphabetical') => void
}

export default function FilterBar({ filter, onFilterChange, sortOrder, onSortChange }: FilterBarProps) {
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
    <select
      id="sort-order"
      value={sortOrder}
      onChange={(e) =>
        onSortChange(
          e.target.value as
            | 'recent'
            | 'high-low'
            | 'low-high'
            | 'alphabetical'
        )
      }
    >
      <option value="recent">Recently Added</option>
      <option value="high-low">Priority: High to Low</option>
      <option value="low-high">Priority: Low to High</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  </div>
}
