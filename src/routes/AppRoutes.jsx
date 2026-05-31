import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TasksPage from '../pages/TasksPage';
import PostsPage from '../pages/PostsPage';
import UsersPage from '../pages/UsersPage';
import StatsPage from '../pages/StatsPage';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
    <p style={{ fontSize: '4rem', margin: 0 }}>404</p>
    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700 }}>Страница не найдена</p>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/tasks" element={<TasksPage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/stats" element={<StatsPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
