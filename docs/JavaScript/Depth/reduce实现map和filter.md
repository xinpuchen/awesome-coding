# reduce 实现 map 和 filter

## reduce 实现 map
```js
Array.prototype.reduceToMap = function(handler){
  return this.reduce((target, current, index) => {
    target.push(handler.call(this, current, index, this));
    return target;
  }, []);
}
```

## reduce 实现 filter
```js
Array.prototype.reduceToFilter = function(handler){
  return this.reduce((target, current, index) => {
    if(handler.call(this, current, index, this)){
      target.push(current);
    }
    return target;
  }, [])
}
```
