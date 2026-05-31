import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const taskCount = useSelector(s => s.tasks.items.filter(t => !t.completed).length);

  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.logo}>
        <span style={styles.logoIcon}>⬡</span>
        <span>TaskFlow</span>
      </NavLink>
      <div style={styles.links}>
        {[
          { to: '/', label: 'Главная', exact: true },
          { to: '/tasks', label: `Задачи${taskCount ? ` (${taskCount})` : ''}` },
          { to: '/posts', label: 'Посты' },
          { to: '/users', label: 'Команда' },
          { to: '/stats', label: 'Статистика' },
        ].map(({ to, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '64px',
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(12px)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: 'var(--accent)',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
  },
  logoIcon: { fontSize: '1.4rem' },
  links: { display: 'flex', gap: '0.25rem' },
  link: {
    textDecoration: 'none',
    color: 'var(--text-muted)',
    padding: '0.4rem 0.85rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  activeLink: {
    color: 'var(--accent)',
    background: 'var(--accent-subtle)',
  },
};

export default Navbar;
