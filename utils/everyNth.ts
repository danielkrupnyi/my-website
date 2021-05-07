const everyNth = (arr: any[], nth: number) =>
  arr.filter((_, i) => i % nth === nth - 1);

export default everyNth;
