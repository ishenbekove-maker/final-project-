import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostSearch, selectFilteredPosts, createPost, deletePost } from '../redux/slices/postsSlice';
import { usePosts } from '../hooks';
import { Spinner, ErrorMessage, EmptyState } from '../components/UI';
import { truncate } from '../utils';

const PostsPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = usePosts();
  const { searchQuery } = useSelector(s => s.posts);
  const posts = useSelector(selectFilteredPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '' });
  const [formError, setFormError] = useState('');

  const handleCreate = async () => {
    if (!form.title.trim() || !form.body.trim()) { setFormError('Заполните все поля'); return; }
    await dispatch(createPost({ ...form, userId: 1 }));
    setForm({ title: '', body: '' });
    setShowForm(false);
    setFormError('');
  };

  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1 style={h1}>Посты</h1>
          <p style={sub}>Просматривайте и создавайте публикации</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} style={addBtn}>
          {showForm ? '✕ Отмена' : '+ Новый пост'}
        </button>
      </div>

      {showForm && (
        <div style={formBox}>
          <h3 style={formTitle}>Новый пост</h3>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Заголовок..."
            style={inp}
          />
          <textarea
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            placeholder="Содержание поста..."
            rows={4}
            style={{ ...inp, resize: 'vertical' }}
          />
          {formError && <p style={errText}>{formError}</p>}
          <button onClick={handleCreate} style={submitBtn}>Опубликовать</button>
        </div>
      )}

      <input
        value={searchQuery}
        onChange={e => dispatch(setPostSearch(e.target.value))}
        placeholder="🔍  Поиск по постам..."
        style={searchInput}
      />

      {error && <ErrorMessage message={error} />}
      {loading && !posts.length ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <EmptyState icon="✎" title="Постов не найдено" subtitle={searchQuery ? `По запросу «${searchQuery}»` : undefined} />
      ) : (
        <div style={grid}>
          {posts.map(post => (
            <div key={post.id} style={card}>
              <div style={cardTop}>
                <span style={idBadge}>#{post.id}</span>
                <button onClick={() => dispatch(deletePost(post.id))} style={delBtn} title="Удалить">✕</button>
              </div>
              <h3 style={cardTitle}>{post.title}</h3>
              <p style={cardBody}>{truncate(post.body, 120)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const page = { maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' };
const h1 = { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' };
const sub = { color: 'var(--text-muted)', margin: '0.35rem 0 0', fontSize: '0.9rem' };
const addBtn = {
  padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1.5px solid var(--accent)',
  background: 'transparent', color: 'var(--accent)', fontWeight: 600,
  fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'Syne, sans-serif',
};
const formBox = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
};
const formTitle = { margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem' };
const inp = {
  padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text)', fontSize: '0.9rem',
  outline: 'none', fontFamily: 'DM Sans, sans-serif', width: '100%', boxSizing: 'border-box',
};
const errText = { margin: 0, color: 'var(--error)', fontSize: '0.8rem' };
const submitBtn = {
  padding: '0.65rem 1.5rem', borderRadius: '8px', background: 'var(--accent)',
  color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.875rem',
  cursor: 'pointer', alignSelf: 'flex-start', fontFamily: 'Syne, sans-serif',
};
const searchInput = {
  padding: '0.7rem 1rem', borderRadius: '10px', border: '1.5px solid var(--border)',
  background: 'var(--surface)', color: 'var(--text)', fontSize: '0.9rem',
  outline: 'none', fontFamily: 'DM Sans, sans-serif', width: '100%', boxSizing: 'border-box',
};
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' };
const card = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
};
const cardTop = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const idBadge = { fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' };
const delBtn = {
  background: 'transparent', border: 'none', color: 'var(--text-muted)',
  cursor: 'pointer', fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px',
};
const cardTitle = {
  margin: 0, fontFamily: 'Syne, sans-serif', fontSize: '0.95rem',
  fontWeight: 700, lineHeight: 1.35, color: 'var(--text)', textTransform: 'capitalize',
};
const cardBody = { margin: 0, color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 };

export default PostsPage;
