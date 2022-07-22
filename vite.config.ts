import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
const asyncFunction = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("消除异步操作。");
        },0)
    })
};
export default defineConfig(async ({ command, mode, ssrBuild }) => {
    const data = await asyncFunction();
    console.log("command, mode, ssrBuild",command, mode, ssrBuild, data);
    if (command === "serve") {
        return {
            // dev 独有配置
            plugins: [vue()],
            resolve: {
                alias: {
                    "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
                },
            },
            base: "./", // 设置打包路径
        };
    } else {
        // command === 'build'
        return {
            // build 独有配置
            plugins: [vue()],
            resolve: {
                alias: {
                    "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
                },
            },
            base: "./", // 设置打包路径
            server: {
                watch: {
                    ignored: ['!**/node_modules/your-package-name/**']
                },
                base: '/VITE-ELEMENTPLUS-TS/'
            },
            /**被监听的包必须被排除在优化之外，以便它能出现在依赖关系图中并触发热更新。*/
            optimizeDeps: {
                exclude: ['your-package-name']
            }
        };
    }
})
  
