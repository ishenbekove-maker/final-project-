import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskLocal } from '../redux/slices/tasksSlice';
import { truncate } from '../utils';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ ...styles.card, opacity: task.completed ? 0.65 : 1 }}>
      <div style={styles.header}>
        <button
          onClick={() => dispatch(toggleTaskLocal(task.id))}
          style={{ ...styles.checkbox, background: task.completed ? 'var(--accent)' : 'transparent' }}
          title={task.completed ? 'Отметить активной' : 'Завершить'}
        >
          {task.completed && <span style={styles.check}>✓</span>}
        </button>
        <span style={{ ...styles.title, textDecoration: task.completed ? 'line-through' : 'none' }}>
          {truncate(task.title, 60)}
        </span>
      </div>
      <div style={styles.footer}>
        <span style={styles.id}>#{task.id}</span>
        <span style={{ ...styles.status, color: task.completed ? 'var(--success)' : 'var(--warning)' }}>
          {task.completed ? '● Готово' : '○ Активно'}
        </span>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          style={styles.del}
          title="Удалить"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1rem 1.125rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'box-shadow 0.2s, transform 0.2s',
    cursor: 'default',
  },
  header: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem' },
  checkbox: {
    width: '20px', height: '20px', borderRadius: '6px',
    border: '2px solid var(--accent)', cursor: 'pointer',
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginTop: '1px',
  },
  check: { color: '#fff', fontSize: '11px', fontWeight: 700 },
  title: { fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--text)', fontWeight: 400 },
  footer: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  id: { fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' },
  status: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em', marginLeft: 'auto' },
  del: {
    background: 'transparent', border: 'none', color: 'var(--text-muted)',
    cursor: 'pointer', fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px',
    transition: 'color 0.15s',
  },
};

export default TaskCard;
