import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUsers } from '../hooks';
import { Spinner, ErrorMessage, EmptyState } from '../components/UI';
import { getInitials } from '../utils';

const COLORS = ['#4d96ff','#ff6b6b','#6bcb77','#ffd93d','#c77dff','#ff9f43','#48dbfb','#ff6b9d','#a29bfe','#fd79a8'];

const UsersPage = () => {
  const { loading, error } = useUsers();
  const users = useSelector(s => s.users.items);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.company?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      <div>
        <h1 style={h1}>Команда</h1>
        <p style={sub}>Участники проекта и их контактная информация</p>
      </div>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Поиск по имени, email или компании..."
        style={searchInput}
      />

      {error && <ErrorMessage message={error} />}
      {loading ? <Spinner /> : filtered.length === 0 ? (
        <EmptyState icon="◎" title="Участников не найдено" />
      ) : (
        <div style={grid}>
          {filtered.map((user, i) => {
            const color = COLORS[i % COLORS.length];
            const isSelected = selected === user.id;
            return (
              <div
                key={user.id}
                onClick={() => setSelected(isSelected ? null : user.id)}
                style={{ ...card, ...(isSelected ? { borderColor: color } : {}) }}
              >
                <div style={cardTop}>
                  <div style={{ ...avatar, background: color + '22', color }}>
                    {getInitials(user.name)}
                  </div>
                  <div style={info}>
                    <h3 style={name}>{user.name}</h3>
                    <p style={username}>@{user.username}</p>
                  </div>
                </div>

                {isSelected && (
                  <div style={details}>
                    <Detail icon="✉" label={user.email} />
                    <Detail icon="☎" label={user.phone} />
                    <Detail icon="⌂" label={`${user.address?.city}, ${user.address?.street}`} />
                    <Detail icon="⊕" label={user.website} />
                    <div style={companyBox}>
                      <span style={{ ...companyBadge, borderColor: color, color }}>
                        {user.company?.name}
                      </span>
                    </div>
                  </div>
                )}

                {!isSelected && (
                  <div style={preview}>
                    <span style={emailText}>{user.email}</span>
                    <span style={cityText}>{user.address?.city}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Detail = ({ icon, label }) => (
  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', width: '1rem', textAlign: 'center' }}>{icon}</span>
    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</span>
  </div>
);

const page = { maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const h1 = { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' };
const sub = { color: 'var(--text-muted)', margin: '0.35rem 0 0', fontSize: '0.9rem' };
const searchInput = {
  padding: '0.7rem 1rem', borderRadius: '10px', border: '1.5px solid var(--border)',
  background: 'var(--surface)', color: 'var(--text)', fontSize: '0.9rem',
  outline: 'none', fontFamily: 'DM Sans, sans-serif', width: '100%', boxSizing: 'border-box',
};
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1rem' };
const card = {
  background: 'var(--surface)', border: '1.5px solid var(--border)',
  borderRadius: '14px', padding: '1.25rem', cursor: 'pointer',
  transition: 'border-color 0.2s, transform 0.15s', display: 'flex', flexDirection: 'column', gap: '0.85rem',
};
const cardTop = { display: 'flex', alignItems: 'center', gap: '0.85rem' };
const avatar = {
  width: '44px', height: '44px', borderRadius: '12px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
};
const info = { minWidth: 0 };
const name = { margin: 0, fontFamily: 'Syne, sans-serif', fontSize: '0.95rem', fontWeight: 700 };
const username = { margin: '0.1rem 0 0', color: 'var(--text-muted)', fontSize: '0.78rem' };
const details = { display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' };
const companyBox = { marginTop: '0.25rem' };
const companyBadge = {
  display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '20px',
  border: '1.5px solid', fontSize: '0.75rem', fontWeight: 600,
};
const preview = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const emailText = { fontSize: '0.78rem', color: 'var(--text-muted)' };
const cityText = { fontSize: '0.78rem', color: 'var(--text-muted)' };

export default UsersPage;
