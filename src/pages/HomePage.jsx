import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/slices/tasksSlice';
import { fetchUsers } from '../redux/slices/usersSlice';
import { fetchPosts } from '../redux/slices/postsSlice';

const StatCard = ({ label, value, to, color = 'var(--accent)' }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div style={{ ...cardStyle, borderTopColor: color }}>
      <p style={{ ...numStyle, color }}>{value}</p>
      <p style={cardLabel}>{label}</p>
    </div>
  </Link>
);

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.items);
  const users = useSelector(s => s.users.items);
  const posts = useSelector(s => s.posts.items);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const done = tasks.filter(t => t.completed).length;
  const active = tasks.length - done;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div style={page}>
      <div style={hero}>
        <p style={badge}>TaskFlow — менеджер задач</p>
        <h1 style={h1}>Добро пожаловать</h1>
        <p style={sub}>Управляйте задачами, постами и командой в одном месте.</p>
      </div>

      <div style={grid}>
        <StatCard label="Всего задач" value={tasks.length} to="/tasks" color="#4d96ff" />
        <StatCard label="Активных" value={active} to="/tasks" color="#ffd93d" />
        <StatCard label="Завершено" value={done} to="/tasks" color="#6bcb77" />
        <StatCard label="Постов" value={posts.length} to="/posts" color="#c77dff" />
        <StatCard label="Участников" value={users.length} to="/users" color="#ff6b6b" />
      </div>

      {tasks.length > 0 && (
        <div style={progBox}>
          <div style={progHeader}>
            <span style={progLabel}>Общий прогресс</span>
            <span style={progPct}>{progress}%</span>
          </div>
          <div style={bar}>
            <div style={{ ...fill, width: `${progress}%` }} />
          </div>
          <p style={progSub}>{done} из {tasks.length} задач выполнено</p>
        </div>
      )}

      <div style={quickLinks}>
        <h2 style={sectionTitle}>Быстрый доступ</h2>
        <div style={linkGrid}>
          {[
            { to: '/tasks', icon: '✓', label: 'Задачи', desc: 'Просматривайте и управляйте задачами' },
            { to: '/posts', icon: '✎', label: 'Посты', desc: 'Читайте и создавайте записи' },
            { to: '/users', icon: '◎', label: 'Команда', desc: 'Участники и их контакты' },
            { to: '/stats', icon: '◈', label: 'Статистика', desc: 'Аналитика и графики' },
          ].map(({ to, icon, label, desc }) => (
            <Link key={to} to={to} style={ql}>
              <span style={qlIcon}>{icon}</span>
              <span style={qlLabel}>{label}</span>
              <span style={qlDesc}>{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = { maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' };
const hero = { marginBottom: '2.5rem' };
const badge = {
  display: 'inline-block', background: 'var(--accent-subtle)', color: 'var(--accent)',
  padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem',
  fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem',
};
const h1 = {
  fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 800, margin: '0 0 0.75rem', letterSpacing: '-0.03em', color: 'var(--text)',
};
const sub = { color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' };
const cardStyle = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderTop: '3px solid', borderRadius: '12px', padding: '1.25rem',
  transition: 'transform 0.15s, box-shadow 0.15s',
};
const numStyle = { fontFamily: 'Syne, sans-serif', fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.25rem' };
const cardLabel = { color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0, fontWeight: 500 };
const progBox = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem',
};
const progHeader = { display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' };
const progLabel = { fontWeight: 600, fontSize: '0.9rem' };
const progPct = { fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' };
const bar = { height: '8px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.75rem' };
const fill = { height: '100%', background: 'var(--accent)', borderRadius: '99px', transition: 'width 0.6s ease' };
const progSub = { color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 };
const quickLinks = {};
const sectionTitle = {
  fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700,
  margin: '0 0 1rem', letterSpacing: '-0.01em',
};
const linkGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' };
const ql = {
  textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem',
  padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '12px', transition: 'border-color 0.15s',
};
const qlIcon = { fontSize: '1.3rem', color: 'var(--accent)', marginBottom: '0.25rem' };
const qlLabel = { fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' };
const qlDesc = { color: 'var(--text-muted)', fontSize: '0.8rem' };

export default HomePage;
