/**
 * reduce 实现 map 和 filter
 *
 * @param {function} handler map 或 filter 传进去的函数
 *
 */

//  reduce 实现 map
Array.prototype.reduceToMap = function(handler){
  return this.reduce((target, current, index) => {
    target.push(handler.call(this, current, index, this));
    return target;
  }, []);
}

//  reduce 实现 filter
Array.prototype.reduceToFilter = function(handler){
  return this.reduce((target, current, index) => {
    if(handler.call(this, current, index, this)){
      target.push(current);
    }
    return target;
  }, [])
}
