export const calculateWeek = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - firstDay) / 86400000 + firstDay.getDay() + 1) / 7);
  return week;
};