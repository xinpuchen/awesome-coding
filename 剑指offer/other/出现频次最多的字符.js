/**
 * 出现频次最多的字符
 *
 * @param {*} str
 */

const findMaxStr1 = str => {
  const result = { char: '', num: 0 };
  const strArr = [...str];
  new Set(strArr).forEach(key => {
    const active = strArr.filter(i => i === key);
    if (active.length > result.num) {
      result.char = key;
      result.num = active.length;
    }
  });
  return result;
};

const findMaxStr2 = str => {
  const obj = {};
  const result = { char: '', num: 0 };
  for (let char of str) {
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  for (let key in obj) {
    if (obj[key] > result.num) {
      result.char = key;
      result.num = obj[key];
    }
  }
  return result;
};

const str = 'asdrtfgwertmkmuynppooooojjjjjjjgtryqwqewretrqwert';

console.log(findMaxStr1(str));
console.log(findMaxStr2(str));

/**
 * 出现频率最多的一个或多个字符串
 *
 * 如：
 *
 * 输入：['asd', '123', 'hgfd', '123', 'asd', 'asdfg', '123', 'asd']
 * 输出：['123', 'asd']
 *
 * 输入：['asd', '123', 'hgfd', '123', 'asd', 'asdfg', '123']
 * 输出：123
 */

const data = ['asd', '123', 'hgfd', '123', 'asd', 'asdfg', '123', 'asd'];

const maxCountStrs = arr => {
  const res = [];
  const obj = {};
  let maxCount = 0;
  arr.forEach(e => {
    const count = obj[e] ? obj[e] + 1 : 1;
    obj[e] = count;
    if(count > maxCount){
      maxCount = count;
    }
  })
  for(let key in obj){
    if(obj[key] === maxCount){
      res.push(key);
    }
  }
  return res;
}

console.log(maxCountStrs(data));

// 此方法只能获取一个
const maxCountStr = arr => {
  let max = 0, res;
  const obj = [];
  arr.forEach(e => {
    if(obj[e]){
      obj[e] = obj[e] + 1;
      if(obj[e] > max) {
        max = obj[e];
        res = e;
      }
    } else {
      obj[e] = 1;
      max = 1;
      res = e;
    }
  })
  return res;
}

console.log(maxCountStr(data));

