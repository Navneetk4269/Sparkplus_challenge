import Button from './Button'
import FormInput from './FormInput'

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'

  onFilterChange: (
    filter: 'all' | 'active' | 'completed'
  ) => void

  sortOrder:
    | 'recent'
    | 'high-low'
    | 'low-high'
    | 'alphabetical'
    | 'due-soonest'

  onSortChange: (
    sortOrder:
      | 'recent'
      | 'high-low'
      | 'low-high'
      | 'alphabetical'
      | 'due-soonest'
  ) => void

  search: string
  onSearchChange: (value: string) => void

  categories: string[]
  category: string
  onCategoryChange: (category: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <FormInput
        id="search-input"
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        placeholder="Search tasks..."
      />

      {search && (
        <Button
          id="clear-search"
          type="button"
          onClick={() =>
            onSearchChange('')
          }
        >
          Clear Search
        </Button>
      )}

      <Button
        type="button"
        onClick={() =>
          onFilterChange('all')
        }
        data-active={
          filter === 'all'
        }
      >
        All
      </Button>

      <Button
        type="button"
        onClick={() =>
          onFilterChange('active')
        }
        data-active={
          filter === 'active'
        }
      >
        Active
      </Button>

      <Button
        type="button"
        onClick={() =>
          onFilterChange('completed')
        }
        data-active={
          filter === 'completed'
        }
      >
        Completed
      </Button>

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
              | 'due-soonest'
          )
        }
      >
        <option value="recent">
          Recently Added
        </option>

        <option value="high-low">
          Priority: High to Low
        </option>

        <option value="low-high">
          Priority: Low to High
        </option>

        <option value="alphabetical">
          Alphabetical
        </option>

        <option value="due-soonest">
          Due Date (Soonest First)
        </option>
      </select>

      <select
        id="category-filter"
        value={category}
        onChange={(e) =>
          onCategoryChange(
            e.target.value
          )
        }
      >
        <option value="">
          All categories
        </option>

        {categories.map(
          (categoryName) => (
            <option
              key={categoryName}
              value={categoryName}
            >
              {categoryName}
            </option>
          )
        )}
      </select>
    </div>
  )
}