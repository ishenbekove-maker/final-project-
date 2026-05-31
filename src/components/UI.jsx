import React from 'react';

export const Spinner = ({ size = 40 }) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
    <div style={{
      width: size, height: size,
      border: '3px solid var(--border)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
  </div>
);

export const ErrorMessage = ({ message, onRetry }) => (
  <div style={errStyles.box}>
    <span style={errStyles.icon}>⚠</span>
    <p style={errStyles.msg}>{message || 'Что-то пошло не так'}</p>
    {onRetry && (
      <button onClick={onRetry} style={errStyles.btn}>Попробовать снова</button>
    )}
  </div>
);

export const EmptyState = ({ title, subtitle, icon = '📭' }) => (
  <div style={emptyStyles.box}>
    <span style={emptyStyles.icon}>{icon}</span>
    <h3 style={emptyStyles.title}>{title || 'Ничего не найдено'}</h3>
    {subtitle && <p style={emptyStyles.sub}>{subtitle}</p>}
  </div>
);

export const Badge = ({ children, color = 'var(--accent)' }) => (
  <span style={{ ...badgeStyle, background: color + '22', color }}>
    {children}
  </span>
);

const errStyles = {
  box: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '0.75rem', padding: '2.5rem', color: 'var(--error)',
    background: '#ff4d4d11', borderRadius: '12px', border: '1px solid #ff4d4d33',
  },
  icon: { fontSize: '2rem' },
  msg: { margin: 0, fontSize: '0.95rem', fontWeight: 500 },
  btn: {
    marginTop: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '8px',
    border: '1px solid var(--error)', background: 'transparent',
    color: 'var(--error)', cursor: 'pointer', fontWeight: 500,
  },
};

const emptyStyles = {
  box: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '0.75rem', padding: '3rem', color: 'var(--text-muted)',
  },
  icon: { fontSize: '3rem' },
  title: { margin: 0, fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: 'var(--text)' },
  sub: { margin: 0, fontSize: '0.875rem' },
};

const badgeStyle = {
  padding: '0.2rem 0.6rem', borderRadius: '20px',
  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.01em',
};
