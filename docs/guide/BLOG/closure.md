# 关于闭包

## 定义
- 引用MDN的定义
  >一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。
- 简单地说，闭包就是'创建的函数'+'创建函数时其外部作用域的变量的引用'

## 示例
一个简单的示例：
```javascript
function mkAlert() {
  var name = 'long';
  function alert1() {
    alert(name);
  }
  return alert1;
}

var myFunc = mkAlert();
myFunc();
//alert(long)
```
函数`alert1`在执行之前被返回给`myFunc`变量，返回的内容包括了`alert1`函数，以及其外部函数的变量的引用，即`name`的引用。所以在调用myFunc()时仍然可以使用name变量。  
上述例子也可以写为：  
```javascript
function mkAlert() {
  var name = 'long';
  return function alert1() {
    alert(name);
  }
}
```
---
另一个示例
```javascript
function add(x) {
  return function sum(y) {
    return x + y
  }
}

var myFunc1 = add(2);
var myFunc2 = add(10);

console.log(myFunc1(10));//12
console.log(myFunc2(10));//20

```
此时在声名`myFunc1`时传入的参数2,作为变量x的值被包含在`sum()`上下文中。随人返回给`myFunc1`和`myFunc1`的`sum()`函数内部代码是一样的，但是创建函数时其外部作用域的变量x的值是不同的，因而会得到不同的数值。

## 一个巧妙的用法
看以下代码
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
这是实现尾递归优化的方法,详细请点击[尾递归优化](/guide/BLOG/TailRecursion.md)  

- 定义变量`sum`时，将函数`function(x, y){...}`作为参数`f`传入`tco()`中，`tco`返回一个函数`accumulator`，此时就形成了一个闭包，包含函数`accumulator`以及变量`value`，`active`，`accumulated`，`f`的引用。
- 当调用`sum(1, 100000)`时，相当于调用`accumulator(1, 100000)`,将传入的参数`push`进`accumulated`数组。
- 此时进行`if`判断，由于`active === false`，所以`!active为true`，进入`while`循环。
- 调用`f.apply(this, accumulated.shift())`即`f.apply(this,[1, 3])`,因为`y>0`，所以返回`sum(2, 99999)`。
- 而上文说到，调用sum相当于调用accumulator，也就是`value = accumulator(2, 99999)`，此时进入`accumulator`函数，将参数`push`进`accumulated`，由于此时`active === true`，所以跳过`if`，将`active`赋值为`false`，返回`value`，由于`value`此时仍在等待函数`sum(2, 99999)`执行完毕，所以是未赋值的状态，因此返回`undefined`，所以`value`的最终值为`undefined`，此时一次`while`循环结束
- 对比一次`while`循环前后，变化的只有闭包中的`accumulated`的值，如此循环下去，当`y<0`时，即可退出循环，返回结果。用循环代替了递归，防止函数栈溢出。

## 总结
闭包是个很有趣也很实用的方法，一开始是看到了ES6中尾递归优化的时候看不懂，后来发现是闭包没掌握好，补充了闭包知识后就理解了尾递归优化的逻辑，虽然后来发现尾递归优化好像没什么用，不过也算是知道一个巧妙的闭包用法，一开始不知道active变量巧妙在哪，理解了之后发现真是妙啊，真牛。

---

参考：
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures) 
- [ES6文档](http://caibaojian.com/es6/function.html)
- [[翻译]-JS的递归与TCO尾调用优化](https://segmentfault.com/a/1190000004018047)