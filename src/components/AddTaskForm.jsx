import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../redux/slices/tasksSlice';

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(s => s.tasks.loading);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Введите название задачи'); return; }
    setError('');
    await dispatch(createTask({ title: title.trim(), completed: false, userId: 1 }));
    setTitle('');
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.label}>Новая задача</h3>
      <div style={styles.row}>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Название задачи..."
          style={{ ...styles.input, borderColor: error ? 'var(--error)' : 'var(--border)' }}
        />
        <button onClick={handleSubmit} disabled={loading} style={styles.btn}>
          {loading ? '...' : '+ Добавить'}
        </button>
      </div>
      {error && <p style={styles.err}>{error}</p>}
    </div>
  );
};

const styles = {
  box: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '14px', padding: '1.25rem 1.5rem',
  },
  label: {
    margin: '0 0 0.75rem', fontFamily: 'Syne, sans-serif',
    fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.08em',
  },
  row: { display: 'flex', gap: '0.75rem' },
  input: {
    flex: 1, padding: '0.65rem 1rem', borderRadius: '8px',
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
  },
  btn: {
    padding: '0.65rem 1.25rem', borderRadius: '8px',
    background: 'var(--accent)', color: '#fff', border: 'none',
    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
    whiteSpace: 'nowrap', fontFamily: 'Syne, sans-serif',
  },
  err: { margin: '0.5rem 0 0', color: 'var(--error)', fontSize: '0.8rem' },
};

export default AddTaskForm;
