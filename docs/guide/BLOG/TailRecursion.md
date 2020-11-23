# 尾调用优化

## 原理
### 尾调用
- 函数调用会在内存形成一个“调用记录”，又称“调用帧”(call frame)，在一个函数中调用另一个函数，会形成调用栈，如果是多层递归，则有可能造成调用栈溢出，产生意想不到的后果。
- 而尾调用作为函数的最后一步操作，只要用内层函数的调用帧取代外层函数的调用帧即可不会增加调用栈的深度。
  ```javascript
  function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
  }
  f();

  // 等同于
  function f() {
    return g(3);
  }
  f();

  // 等同于
  g(3);

  ```
- 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

### 尾递归
- 递归函数尾调用自身，称为尾递归，可以大大节约内存。
  ```javascript
  //斐波那契数列
  function fib (n) {
    if(n === 1||n === 2){
      return 1;
    }
    return fab(n-1)+f(n-2)
  }
  fib(1000);//溢出

  //改写成尾递归形式
  function reFib(n, fib1 = 1, fib2 = 1) {
    if(n <= 1){
      return fib2;
    }
    return reFib(n - 1, fib2, fib1 + fib2)
  }
  reFib(1000);//7.0330367711422765e+208
  ```

## 尾递归优化实现

由于尾递归优化只在严格模式下自动实现，在正常模式下就要用其他方法实现。
- 一个递归函数：
  ```javascript
  function sum(x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1);
    } else {
      return x;
    }
  }
  sum(1, 100000)
  // Uncaught RangeError: Maximum call stack size exceeded(…)
  ```
### 蹦床函数(trampoline)
- 蹦床函数将递归转换成循环，每次调用返回一个新的函数
  ```javascript
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }
  ```
- 而函数f要返回一个新的函数，使用`bind()`实现:
  ```javascript
  function sum(x, y) {
    if (y > 0) {
      return sum.bind(null, x + 1, y - 1);
    } else {
      return x;
    }
  }
  ```
- 这样就不会产生溢出，每次循环都会返回一个新的函数，将递归转化成循环。但返回时并不是调用自身，并不算真正的尾递归。
### 尾递归优化
- 这是一个很巧妙的实现，代码如下：
  ```javascript
  function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
      accumulated.push(arguments);
      if (!active) {
        active = true;
        while (accumulated.length) {
          value = f.apply(this, accumulated.shift());
        }
        active = false;
        return value;
      }
    };
  }

  var sum = tco(function(x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1)
    }
    else {
      return x
    }
  });

  sum(1, 100000)
  // 100001
  ```
- 实现原理：
  - 定义变量`sum`时，将函数`function(x, y){...}`作为参数`f`传入`tco()`中，`tco`返回一个函数`accumulator`，此时就形成了一个闭包，包含函数`accumulator`以及变量`value`，`active`，`accumulated`，`f`的引用。
  - 当调用`sum(1, 100000)`时，相当于调用`accumulator(1, 100000)`,将传入的参数`push`进`accumulated`数组。
  - 此时进行`if`判断，由于`active === false`，所以`!active为true`，进入`while`循环。
  - 调用`f.apply(this, accumulated.shift())`即`f.apply(this,[1, 3])`,因为`y>0`，所以返回`sum(2, 99999)`。
  - 而上文说到，调用sum相当于调用accumulator，也就是`value = accumulator(2, 99999)`，此时进入`accumulator`函数，将参数`push`进`accumulated`，由于此时`active === true`，所以跳过`if`，将`active`赋值为`false`，返回`value`，由于`value`此时仍在等待函数`sum(2, 99999)`执行完毕，所以是未赋值的状态，因此返回`undefined`，所以`value`的最终值为`undefined`，此时一次`while`循环结束
  - 对比一次`while`循环前后，变化的只有闭包中的`accumulated`的值，如此循环下去，当`y<0`时，即可退出循环，返回结果。用循环代替了递归，防止函数栈溢出。
- 整体就是把每一次递归发生改变的参数提取出来，循环调用。

## 总结
- 虽然自己实现尾递归优化好像没什么实际作用，不过通过对其的理解，也算是加深理解了闭包，还学到了一种巧妙的提取参数的方式。

---
参考：
- [ES6文档](http://caibaojian.com/es6/function.html)
- [[翻译]-JS的递归与TCO尾调用优化](https://segmentfault.com/a/1190000004018047)