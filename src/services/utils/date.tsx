export const getDate = (dataTime: string) => {
  const now = new Date().getDay();
  const date = new Date(dataTime);

  return {
    day: now === date.getDay() ? 'Сегодня' : 'Вчера',
    hours: date.getHours(),
    minutes: date.getMinutes(),
    gmt: date.getTimezoneOffset() / 60,
  };
};
