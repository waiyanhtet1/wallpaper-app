export const combineDuplicatesByDate = (arr) => {
  const dateMap = new Map();

  // Group objects by date
  arr.forEach((item) => {
    const date = item.date;
    if (!dateMap.has(date)) {
      dateMap.set(date, []);
    }
    dateMap.get(date).push(item);
  });

  // Combine objects for each date
  const combinedArray = [];
  dateMap.forEach((items, date) => {
    const combinedObject = items.reduce(
      (acc, obj) => {
        return { ...acc, ...obj };
      },
      { date }
    );
    combinedArray.push(combinedObject);
  });

  return combinedArray;
};
