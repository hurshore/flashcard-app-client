export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createRandomArray = (
  num: number
): { id: number; value: string }[] => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push({ id: i, value: `Value ${i}` });
  }
  return arr;
};
