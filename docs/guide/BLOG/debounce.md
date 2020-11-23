# 关于防抖与节流

- 简单记录一下，防抖就是防止连按，把所有连续触发缩减成一次触发，就像上电梯一样，只要在门关上之前有人要上，就会重新计算关门时间，电梯就不会走。

- 节流就是把一段时间里的多次操作简化为一次
## 简单实现

```javascript

  function debounce(fn, delay = 200) {
    if (typeof fn !== 'function') { 
        throw new TypeError('fn is not a function');
    }
    
    var lastFn = null; 
    return function(...args) {
        if (lastFn) {
             clearTimeout(lastFn);
        }
        lastFn = setTimeout(() => {
            lastFn = null;
            fn.call(this, ...args);
        }, delay);
    }
}

function throttle (fn, time = 500) {
  if (typeof fn !== 'function') { 
        throw new TypeError('fn is not a function');
    }
  var flag = null
  return function(...arg) {
    if(flag){
      return
    }
    flag = true
    setTimeout(() => {
      flag = false
      fn.call(this, ...arg)
    }, time)
  }
  
}
```