export function getAverages(data, category) {
  // Создаем объект для хранения сумм по месяцам
  const sumsByMonth = {};

  // Перебираем каждый объект
  for (const userId in data) {
    const monthsData = data[userId];

    // Перебираем месяцы в каждом объекте
    for (const month in monthsData) {
      if (!sumsByMonth.hasOwnProperty(month)) {
        sumsByMonth[month] = { total: 0, count: 0 };
      }

      // Проверяем, есть ли поле категории
      if (monthsData[month].hasOwnProperty(category)) {
        sumsByMonth[month].total += monthsData[month][category];
        sumsByMonth[month].count++;
      }
    }
  }

  // Генерируем список всех месяцев текущего года
  const currentYear = new Date().getFullYear();
  const allMonths = Array.from(
    { length: 12 },
    (_, index) => `${currentYear}-${String(index + 1).padStart(2, "0")}`
  );

  // Формируем массив средних значений
  const averages = allMonths.map((month) => {
    const { total = 0, count = 0 } = sumsByMonth[month] || {}; // Если месяца нет, используем нулевые значения
    return count > 0 ? total / count : 0; // Если нет данных, возвращаем 0
  });
  const numVotes = allMonths.map((month) => {
    const { count = 0 } = sumsByMonth[month] || {}; // Если месяца нет, используем нулевые значения
    return count > 0 ? count : 0; // Если нет данных, возвращаем 0
  });

  return { averages: averages, numVotes: numVotes };
}
export function transformData(data) {
  if (data) {
    return Object.values(data)
      .map((item) => ({
        ...item,
        dislikeCount: Object.values(item.dislikeCount ?? {}), // Извлекаем значения из множества
        likeCount: Object.values(item.likeCount ?? {}), // Извлекаем значения из множества
      }))
      .sort((a, b) => a.dateTime - b.dateTime);
  } else {
    return null;
  }
}
