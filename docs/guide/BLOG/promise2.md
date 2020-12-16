# 写一个Promise(二)

上次实现了`Promise`的基本功能，这次来实现一下`Promise.all`和`Promise.race`
## Promise.all
```js
Promise.all = function(promises) {
	var len = promises.length
	var results = []
	return new Promise((resolve,reject) => {
		promises.forEach((promise, index) => {
			Promise.resolve(promise).then(function(res){
				results[index] = res
				if(results.length === len){
					return resolve(results)
				}
			},function(reason){
				return reject(reason)
			})
		})
	})
}
```

## Promise.race
```js
Promise.race = function(promises) {
	return new Promise((resolve, reject) => {
		promises.forEach((promise) => {
			Promise.resolve(promise).then(function(res){
				return resolve(res)
			},function(reason) {
				return reject(reason)
			})
		})
	})
}
```

## 总结
- `Promise.resolve(value)`如果`value`是个值，会作为参数传给`then()`,如果是个`Promise`，则会返回`Promise`，他的实现包含了`resolvePromise()`函数，下次再实现它。