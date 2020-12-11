/**
 * 随机生成指定区间的数据
 */
export function randomRangeNum(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
