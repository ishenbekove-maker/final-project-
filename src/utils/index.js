export const formatDate = (date = new Date()) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);

export const truncate = (str, len = 80) =>
  str.length > len ? str.slice(0, len) + '…' : str;

export const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

export const getPriorityColor = (id) => {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff'];
  return colors[id % colors.length];
};
