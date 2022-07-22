<template>
    <router-view />
</template>

<script lang="ts">
import { onBeforeMount, defineComponent } from 'vue';
import setIntroduction from '@/utils/setIconfont';
export default defineComponent({
	name: 'app',
    setup() {
        // 设置初始化，防止刷新时恢复默认
		onBeforeMount(() => {
			// 设置批量第三方 icon 图标
			setIntroduction.cssCdn();
			// 设置批量第三方 js
			setIntroduction.jsCdn();
		});
    }
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
