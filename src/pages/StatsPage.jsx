import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '../components/UI';

const Bar = ({ label, value, max, color }) => {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{label}</span>
        <span style={{ fontSize: '0.82rem', color, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: '6px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '99px', transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
};

const StatBlock = ({ label, value, note, color = 'var(--accent)' }) => (
  <div style={statBox}>
    <p style={{ ...statVal, color }}>{value}</p>
    <p style={statLabel}>{label}</p>
    {note && <p style={statNote}>{note}</p>}
  </div>
);

const StatsPage = () => {
  const tasks = useSelector(s => s.tasks.items);
  const posts = useSelector(s => s.posts.items);
  const users = useSelector(s => s.users.items);
  const tasksLoading = useSelector(s => s.tasks.loading);

  const completed = tasks.filter(t => t.completed).length;
  const active = tasks.length - completed;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  // Tasks per user (use userId)
  const tasksByUser = tasks.reduce((acc, t) => {
    acc[t.userId] = (acc[t.userId] || 0) + 1;
    return acc;
  }, {});
  const maxUserTasks = Math.max(...Object.values(tasksByUser), 1);

  // User completion rates
  const userStats = Object.entries(tasksByUser).slice(0, 8).map(([uid, count]) => {
    const user = users.find(u => u.id === +uid);
    const userCompleted = tasks.filter(t => t.userId === +uid && t.completed).length;
    return {
      name: user?.name?.split(' ')[0] || `User ${uid}`,
      total: count,
      completed: userCompleted,
      rate: Math.round((userCompleted / count) * 100),
    };
  });

  if (tasksLoading && !tasks.length) return <div style={page}><Spinner /></div>;

  return (
    <div style={page}>
      <div>
        <h1 style={h1}>Статистика</h1>
        <p style={sub}>Аналитика по задачам, постам и участникам</p>
      </div>

      <div style={topGrid}>
        <StatBlock label="Всего задач" value={tasks.length} note="Загружено из API" color="#4d96ff" />
        <StatBlock label="Завершено" value={completed} note={`${completionRate}% выполнено`} color="#6bcb77" />
        <StatBlock label="Активных" value={active} note="В процессе" color="#ffd93d" />
        <StatBlock label="Постов" value={posts.length} note="Загружено" color="#c77dff" />
        <StatBlock label="Участников" value={users.length} note="В команде" color="#ff6b6b" />
      </div>

      <div style={twoCol}>
        <div style={section}>
          <h2 style={sectionTitle}>Прогресс задач</h2>
          <div style={bigProg}>
            <div style={bigProgInner}>
              <div style={{ ...bigFill, width: `${completionRate}%` }} />
            </div>
            <div style={progLabels}>
              <span style={{ color: '#6bcb77', fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: '1.5rem' }}>
                {completionRate}%
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {completed} / {tasks.length} задач
              </span>
            </div>
          </div>
          <div style={donutRow}>
            <LegendItem color="#6bcb77" label="Завершено" value={completed} />
            <LegendItem color="#ffd93d" label="Активно" value={active} />
          </div>
        </div>

        <div style={section}>
          <h2 style={sectionTitle}>Задачи по пользователям</h2>
          {userStats.map((u, i) => (
            <Bar
              key={i}
              label={u.name}
              value={u.total}
              max={maxUserTasks}
              color={['#4d96ff','#ff6b6b','#6bcb77','#ffd93d','#c77dff','#ff9f43','#48dbfb','#a29bfe'][i % 8]}
            />
          ))}
        </div>
      </div>

      <div style={section}>
        <h2 style={sectionTitle}>Эффективность участников</h2>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                {['Участник','Всего задач','Завершено','Активно','Эффективность'].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userStats.map((u, i) => (
                <tr key={i} style={i % 2 === 0 ? {} : { background: 'var(--border)' }}>
                  <td style={td}>{u.name}</td>
                  <td style={tdNum}>{u.total}</td>
                  <td style={{ ...tdNum, color: '#6bcb77' }}>{u.completed}</td>
                  <td style={{ ...tdNum, color: '#ffd93d' }}>{u.total - u.completed}</td>
                  <td style={tdNum}>
                    <span style={{ ...rateBadge, background: `hsl(${u.rate * 1.2}, 60%, 35%)22`, color: `hsl(${u.rate * 1.2}, 70%, 55%)` }}>
                      {u.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: color }} />
    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}:</span>
    <span style={{ fontSize: '0.82rem', fontWeight: 700, color }}>{value}</span>
  </div>
);

const page = { maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const h1 = { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' };
const sub = { color: 'var(--text-muted)', margin: '0.35rem 0 0', fontSize: '0.9rem' };
const topGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' };
const statBox = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '12px', padding: '1.25rem', textAlign: 'center',
};
const statVal = { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, margin: 0 };
const statLabel = { fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)', margin: '0.25rem 0 0' };
const statNote = { color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0.2rem 0 0' };
const twoCol = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' };
const section = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem' };
const sectionTitle = { fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem' };
const bigProg = { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' };
const bigProgInner = { height: '16px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' };
const bigFill = { height: '100%', background: 'linear-gradient(90deg, #6bcb77, #4d96ff)', borderRadius: '99px', transition: 'width 0.8s ease' };
const progLabels = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const donutRow = { display: 'flex', gap: '1.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' };
const tableWrap = { overflowX: 'auto' };
const table = { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' };
const th = { textAlign: 'left', padding: '0.6rem 0.75rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' };
const td = { padding: '0.65rem 0.75rem', color: 'var(--text)', fontWeight: 500 };
const tdNum = { ...td, textAlign: 'center' };
const rateBadge = { padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 };

export default StatsPage;
