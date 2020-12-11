# 如何用CSS做一个时钟
使用CSS3 animation
html结构
```html
  <div id="circle">
		<div id="test"></div>
	</div>
```
css代码
```css
  @keyframes testAnime {/*设置动画，动画会从from(0%),过渡到to(100%),也可以设置20%{}这种形式*/
    from{
      transform-origin: bottom;
      transform: rotate(0deg);
    }
    to{
      transform-origin: bottom;
      transform: rotate(360deg);
      }
  }
  #circle {/*表盘*/
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 1px blue solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #test {/*指针*/

    margin-bottom:100px;
    width: 1px;
    height: 100px;
    background-color: black;

    animation: testAnime 60s/*设置使用的动画名称，以及过渡时间*/
    animation-iteration-count:infinite;/*重复次数，*/
    animation-timing-function: linear;/*动画过渡函数，类似AE中的速度曲线*/
  }
```
预览效果
<watch/>