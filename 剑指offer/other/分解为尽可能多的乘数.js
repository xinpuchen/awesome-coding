
/**
 * 输入一个正整数，输出尽可能多的数，他们的乘积等于这个数
 *
 * 输入： 32
 * 输出： [2, 2, 2, 2, 2]
 *
 * @param {number} num
 * @returns number
 */

function decompose(num){
  if(!num || num < 2) return [];
  const res = [];
  let i = 2;
  while(i <= num){
    if(num % i === 0){
      res.push(i);
      num = num / i;
      return res.concat(decompose(num))
    }
    i++;
  }
  return res;
}

let i = 1;
while(i++ < 101){
  console.log(decompose(i))
}
