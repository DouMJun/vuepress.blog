# 关于分号“;”

## 起因
今天在写算法题的时候遇到了一个奇怪的错误,代码如下：
```javascript
var permutation = function(s) {
    var arr = s.split(''),
        ans = []
        
    var dfs = function(x) {
        if(x === arr.length-1){
            ans.push(arr.join(''))
            return null
        }
        let set = new Set()
        for(let i = x; i < arr.length; i++){
            if(set.has(arr[i])) continue
            set.add(arr[i])
            [arr[i], arr[x]] = [arr[x], arr[i]]
            dfs(x+1)
            [arr[x], arr[i]] = [arr[i], arr[x]]
        }
    }
    dfs(0)
    return ans
};
permutation("abc")
```
运行后报错`Cannot set property 'b' of undefined`,无法设置一个不存在的属性b。但是我的代码中并没有出现`b`这个属性，就很迷惑。

在数次打断点debug之后发现了可疑的地方：
```
dfs(x+1)
[arr[x], arr[i]] = [arr[i], arr[x]]
```
在递归结束的时候`dfs()`会返回一个null，而紧接在其之后的`[]`被解析成了对`dfs`返回值中的某个属性的访问，相当于`dfs()[b]`，所以会报错，在加上了分号之后就解决了问题。

## 总结
- 这样看来还是在每句代码的结尾加上分号比较好，防止出现类似的奇怪bug。
- 或者说避免出现将大括号、方括号放在句首的语句，以免和上一行的代码出现混合。
