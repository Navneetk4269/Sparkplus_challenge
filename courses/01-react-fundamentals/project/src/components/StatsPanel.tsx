import { useMemo } from 'react'
import type { Task } from './TaskList'

interface StatsPanelProps {
  tasks?: Task[]
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel({
  tasks,
  total,
  completed,
  active,
  overdue,
  completedPercentage,
}: StatsPanelProps) {
  const stats = useMemo(() => {
    if (tasks) {
      const taskTotal = tasks.length

      const taskCompleted = tasks.filter(
        (task) => task.completed
      ).length

      const taskActive = tasks.filter(
        (task) => !task.completed
      ).length

      const taskOverdue = tasks.filter((task) => {
        if (!task.dueDate || task.completed) {
          return false
        }

        const dueDate = new Date(task.dueDate)
        const today = new Date()

        dueDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        return dueDate < today
      }).length

      const percentage =
        taskTotal === 0
          ? 0
          : Math.round(
              (taskCompleted / taskTotal) * 100
            )

      return {
        total: taskTotal,
        completed: taskCompleted,
        active: taskActive,
        overdue: taskOverdue,
        completedPercentage: percentage,
      }
    }

    return {
      total: total ?? 0,
      completed: completed ?? 0,
      active: active ?? 0,
      overdue: overdue ?? 0,
      completedPercentage:
        completedPercentage ?? 0,
    }
  }, [
    tasks,
    total,
    completed,
    active,
    overdue,
    completedPercentage,
  ])

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <p>
        Total: {stats.total}
      </p>

      <p>
        Completed: {stats.completed} (
        {stats.completedPercentage}%)
      </p>

      <p>
        Active: {stats.active}
      </p>

      <p>
        Overdue: {stats.overdue}
      </p>

      <div
        role="progressbar"
        aria-valuenow={stats.completedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            width: `${stats.completedPercentage}%`,
            height: '10px',
          }}
        />
      </div>
    </section>
  )
}