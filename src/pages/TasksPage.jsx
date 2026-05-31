import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setFilterStatus, selectFilteredTasks, clearError } from '../redux/slices/tasksSlice';
import { useTasks } from '../hooks';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';
import { Spinner, ErrorMessage, EmptyState } from '../components/UI';

const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Завершённые' },
];

const TasksPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useTasks();
  const { searchQuery, filterStatus } = useSelector(s => s.tasks);
  const filtered = useSelector(selectFilteredTasks);

  return (
    <div style={page}>
      <div style={pageHeader}>
        <div>
          <h1 style={h1}>Задачи</h1>
          <p style={sub}>Управляйте списком задач — добавляйте, выполняйте, удаляйте</p>
        </div>
      </div>

      <AddTaskForm />

      <div style={controls}>
        <input
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
          placeholder="🔍  Поиск задач..."
          style={searchInput}
        />
        <div style={filterRow}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => dispatch(setFilterStatus(f.key))}
              style={{ ...filterBtn, ...(filterStatus === f.key ? activeFilter : {}) }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => dispatch(clearError())} />}

      {loading && !filtered.length ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Задач не найдено"
          subtitle={searchQuery ? `По запросу «${searchQuery}» ничего нет` : 'Добавьте первую задачу выше'}
        />
      ) : (
        <>
          <p style={countLabel}>{filtered.length} {plural(filtered.length)}</p>
          <div style={grid}>
            {filtered.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </>
      )}
    </div>
  );
};

const plural = n => {
  if (n % 10 === 1 && n % 100 !== 11) return 'задача';
  if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return 'задачи';
  return 'задач';
};

const page = { maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const pageHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' };
const h1 = { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' };
const sub = { color: 'var(--text-muted)', margin: '0.35rem 0 0', fontSize: '0.9rem' };
const controls = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const searchInput = {
  padding: '0.7rem 1rem', borderRadius: '10px', border: '1.5px solid var(--border)',
  background: 'var(--surface)', color: 'var(--text)', fontSize: '0.9rem',
  outline: 'none', fontFamily: 'DM Sans, sans-serif', width: '100%', boxSizing: 'border-box',
};
const filterRow = { display: 'flex', gap: '0.5rem' };
const filterBtn = {
  padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid var(--border)',
  background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
  fontSize: '0.82rem', fontWeight: 500, transition: 'all 0.15s',
};
const activeFilter = { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-subtle)' };
const countLabel = { margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' };

export default TasksPage;
