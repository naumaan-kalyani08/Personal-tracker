import { useEffect, useState } from 'react'
import { deleteApiData, getApiData, patchApiData, postApiData } from '../Api/ReusableApiLogics'

const getLocalDate = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

const emptyForm = (dueDate) => ({
  title: '',
  description: '',
  due_date: dueDate,
  priority: 'medium',
})

const priorityStyles = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
}

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(getLocalDate)
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState(() => emptyForm(getLocalDate()))
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [workingTaskId, setWorkingTaskId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadTasks = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await getApiData('tasks', { date: selectedDate })
        if (!Array.isArray(response?.data)) {
          throw new Error('The task list could not be loaded.')
        }
        if (active) setTasks(response.data)
      } catch (requestError) {
        if (active) setError(requestError.message || 'The task list could not be loaded.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTasks()
    return () => {
      active = false
    }
  }, [selectedDate])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleDateChange = (event) => {
    const date = event.target.value
    setSelectedDate(date)
    if (!editingId) setForm((current) => ({ ...current, due_date: date }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = editingId
        ? await patchApiData(`tasks/${editingId}`, form)
        : await postApiData('tasks', form)
      if (!response?.data) throw new Error('The task could not be saved.')

      if (response.data.due_date === selectedDate) {
        setTasks((current) => editingId
          ? current.map((task) => task.id === editingId ? response.data : task)
          : [...current, response.data])
      } else if (editingId) {
        setTasks((current) => current.filter((task) => task.id !== editingId))
      }

      setSelectedDate(response.data.due_date)
      setForm(emptyForm(response.data.due_date))
      setEditingId(null)
    } catch (requestError) {
      setError(requestError.message || 'The task could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  const startEditing = (task) => {
    setEditingId(task.id)
    setForm({
      title: task.title,
      description: task.description || '',
      due_date: task.due_date,
      priority: task.priority,
    })
    setError('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setForm(emptyForm(selectedDate))
    setError('')
  }

  const toggleCompletion = async (task) => {
    setWorkingTaskId(task.id)
    setError('')
    try {
      const response = await patchApiData(`tasks/${task.id}`, {
        is_completed: !task.is_completed,
      })
      if (!response?.data) throw new Error('The task status could not be updated.')
      setTasks((current) => current.map((item) => item.id === task.id ? response.data : item))
    } catch (requestError) {
      setError(requestError.message || 'The task status could not be updated.')
    } finally {
      setWorkingTaskId(null)
    }
  }

  const deleteTask = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return

    setWorkingTaskId(task.id)
    setError('')
    try {
      await deleteApiData(`tasks/${task.id}`)
      setTasks((current) => current.filter((item) => item.id !== task.id))
      if (editingId === task.id) cancelEditing()
    } catch (requestError) {
      setError(requestError.message || 'The task could not be deleted.')
    } finally {
      setWorkingTaskId(null)
    }
  }

  const completedCount = tasks.filter((task) => task.is_completed).length
  const pendingCount = tasks.length - completedCount
  const formattedDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Your day, in focus</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Daily tasks</h1>
          <p className="mt-1 text-slate-600">{formattedDate}</p>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          View date
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Tasks planned', value: tasks.length },
          { label: 'Still to do', value: pendingCount },
          { label: 'Completed', value: completedCount },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{editingId ? 'Edit task' : 'Add a task'}</h2>
            <p className="mt-1 text-sm text-slate-500">Keep it clear and make it manageable.</p>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Task name
            <input
              required
              maxLength={255}
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="What do you need to do?"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Notes <span className="font-normal text-slate-400">(optional)</span>
            <textarea
              maxLength={2000}
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={3}
              placeholder="Add a little detail"
              className="mt-1 w-full resize-y rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Due date
              <input
                required
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleFormChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Priority
              <select
                name="priority"
                value={form.priority}
                onChange={handleFormChange}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : editingId ? 'Save changes' : 'Add task'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEditing} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Your task list</h2>
              <p className="text-sm text-slate-500">{pendingCount} remaining · {completedCount} completed</p>
            </div>
          </div>

          {error && (
            <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          {loading ? (
            <p className="py-8 text-center text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-10 text-center">
              <p className="font-medium text-slate-700">Nothing on your list yet</p>
              <p className="mt-1 text-sm text-slate-500">Add a task to get started with this day.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <li key={task.id} className="flex gap-3 py-4 first:pt-1 last:pb-1">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    disabled={workingTaskId === task.id}
                    onChange={() => toggleCompletion(task)}
                    aria-label={`${task.is_completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
                    className="mt-1 h-4 w-4 accent-indigo-600"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`font-medium ${task.is_completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-500">{task.description}</p>}
                    <div className="mt-2 flex gap-3 text-sm">
                      <button type="button" onClick={() => startEditing(task)} className="font-medium text-indigo-600 hover:text-indigo-800">
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={workingTaskId === task.id}
                        onClick={() => deleteTask(task)}
                        className="font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  )
}

export default DashboardPage
