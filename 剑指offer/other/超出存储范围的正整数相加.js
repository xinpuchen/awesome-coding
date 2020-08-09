/**
 * 实现超出整数存储范围的两个大正整数相加 function add(a, b)
 *
 * 注：参数a和b以及函数的返回值都是字符串
 *
 * @param {string} a
 * @param {string} b
 * @returns string
 */
function add(a, b){
  const len = Math.max(a.length, b.length)
  const aStrs = a.split('');
  const bStrs = b.split('');
  const res = [];
  let i = 0;
  let temp = 0;
  while(i++ < len){
    const a = aStrs.pop();
    const b = bStrs.pop();
    const ret = Number(a || 0) + Number(b || 0) + temp;
    if(ret > 9){
      res.unshift(String(ret - 10));
      temp = 1;
    } else {
      res.unshift(String(ret));
      temp = 0;
    }
    if((a === undefined || b === undefined) && temp === 0) break;
  }
  if(temp) res.unshift('1');
  const restStrs = [...aStrs, ...bStrs];
  return restStrs.concat(res).toString().replace(/,/g, '');
}

console.log(add('123', '456'));
console.log(add('1', '999'));
console.log(add('123', '789'));
console.log(add('123', '879'));
