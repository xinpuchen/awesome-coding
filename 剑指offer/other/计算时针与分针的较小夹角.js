/**
 * 计算时针与分针的较小夹角
 *
 * @param {number} x 小时
 * @param {number} y 分钟
 */

const angle = (x, y) => {
  const mAngle = y * 6 % 360;
  const hAngle = x % 12 * 30 + mAngle / 12;
  const result = Math.abs(hAngle - mAngle);
  return result < 180 ? result : 360 - result;
}

console.log(angle(5,15));
console.log(angle(5,12));
console.log(angle(3,25));
console.log(angle(9,5));
console.log(angle(1,45));
