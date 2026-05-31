import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasks } from '../redux/slices/tasksSlice';
import { fetchUsers } from '../redux/slices/usersSlice';
import { fetchPosts } from '../redux/slices/postsSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useTasks = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.tasks);
  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);
  return { loading, error };
};

export const useUsers = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.users);
  useEffect(() => { if (!items.length) dispatch(fetchUsers()); }, [dispatch, items.length]);
  return { users: items, loading, error };
};

export const usePosts = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.posts);
  useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);
  return { loading, error };
};
