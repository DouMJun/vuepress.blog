<template>
  <div id="circle">
		<div id="test"></div>
	</div>
</template>

<script>
export default {
  name: 'watch'
}

</script>

<style>
		@keyframes testAnime {
			from{
				transform-origin: bottom;
				transform: rotate(0deg);
			}
			to{
				transform-origin: bottom;
				transform: rotate(360deg);
				}
		}
		#circle {
			width: 220px;
			height: 220px;
			border-radius: 50%;
			border: 1px blue solid;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		#test {

			margin-bottom:100px;
			width: 1px;
			height: 100px;
			background-color: black;

			animation: testAnime 60s;
			animation-iteration-count:infinite;
			animation-timing-function: linear;
			
			
		}

</style>