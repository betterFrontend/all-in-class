export const vue3 = `
<template>
	<div class="">
		<div class="bg-#ff5500 c-#fff w-50.5% ccc">11</div>
		<div class=""  :class="{'bg-#ff5500 c-#fff p-20px mt-10px w-100.05px': data.isPadding}">22</div>
		<div class=""  :class="data.isPadding ? 'bg-#ff5500 c-#fff p-20px mt-10px w-90%': ''">33</div>
	</div>
</template>
<script setup>
	import { ref, reactive } from 'vue';

	const data = reactive({
		isPadding: true,
	})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
`

export const vue2 = `
<template>
  <div id="app">
    <div class="">
        <div class="bg-#ff5500 c-#fff w-50.5% ccc">11</div>
        <div class=""  :class="{'bg-#ff5500 c-#fff p-20px mt-10px w-100.05px': data.isPadding}">22</div>
        <div class=""  :class="data.isPadding ? 'bg-#ff5500 c-#fff p-20px mt-10px w-90%': ''">33</div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"  :class="\`fasdfasd: ''\`" />
		<WidthHeight></WidthHeight>
		<PaddingMargin></PaddingMargin>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import WidthHeight from './components/WidthHeight.vue'
import PaddingMargin from './components/PaddingMargin.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
		WidthHeight,
		PaddingMargin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

`