# Vite + Vue3 + TypeScript 架构搭建
## 🚧 vite
- `npm init @vitejs/app`  
  - project name： 项目名称  
  - select a framework: vue  
  - select a variant: vue-ts  
  - ` 另：npm init @vitejs/app 项目名称 --template vue-ts   暂未尝试，等同上述初始化过程`   
### ⚡运行 
  - `npm run dev`  
### 🔯 修改Vite配置-vite.config.ts 
  - 设置@指向src目录  
  
        import { resolve } from 'path'  
        export default defineConfig({  
            resolve: {  
                alias: {  
                    "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录  
                },  
            }  
        })  

    - 编辑器此时错误提示 path 模块找不到  
    	`@types/node -> npm i @types/node -D | npm install @types/node --save-dev`  
      - 原因分析：path模块是node.js的内置功能，node.js本身是不支持TypeScript的，因此直接在TypeScript项目内使用是行不通的。  
      - 解决方案：安装@types/node  
### icon图标显示错误-出现白色空块  
  - 原因分析：iconfont未添加family类名  
  - 解决方案：class="xinyufont xinyu-xingbiao" 加上xinyufont类名即可。 
### 使用el-icon  
  - `npm install @element-plus/icons`  
  - main.ts内  
    `import * as ElIcons from '@element-plus/icons'`  
    `for (const name in ElIcons){ app.component(name,(ElIcons as any)[name]) }`
### 使用iconfont  
  - `utils`-->`seticonfont.ts`  
  - 在`app.vue`组件的`onBeforeMount`生命周期内初始化，将icon图标动态插入,页面内使用即可。  
  - 示例：`<i class="xinyufont xinyu-dianhua"></i>`  

### MOCK  
  - `npm i mockjs --save`  
  - main.js内`if (process.env.NODE_ENV !== 'production') require('./mock')`  

## 技术研读、相关资料  

  - TypeScript
    - [TypeScript官方文档](https://typescript.bootcss.com/ "TypeScript官方文档")  
    TypeScript属于强类型语言，主要优势在于静态类型检查，包括以下几点：  
    * 静态类型检查
    * IDE智能提示
    * 代码重构
    * 可读性  
    延伸：  
    _强类型语言_：是一种强制类型定义的语言，一旦某个变量被定义类型，如果不经过强制转换，则它永远是该类型。  
    _弱类型语言_：定义一个变量的数据类型后 ，其数据类型可根据环境变化自动进行转换，不需要经过显性强制转换。   
    _二者区别_：区分二者的依据是是否会隐形的类型转换，强类型语言在速度上较弱类型语言稍微逊色一些，但是强类型语言的严谨性可以避免许多不必要的错误     

    - VUE3.0
    



## 常用的markdown语法
1. markdown使用相关插件两个：Markdown All In One、Markdown Preview GitHub Styling。  
2. 文字超链：[链接名称](链接地址 "链接名称")。  
示例： [TypeScript官方文档](https://typescript.bootcss.com/ "TypeScript官方文档")  
3. 标题设置：使用#，一个#代表一级，最多到六级。  
示例：  
# 一级标题
## 二级标题
### 三级标题
...
###### 六级标题
4. 文字斜体：将所需处理文字两端使用“*”或者“_”包裹。  
示例： *斜体* _斜体_  
5. 代码块（`code`包裹 | 上下各空置一行，整体缩进两个制表符Tab）
示例：  
`代码块`  

        代码块

6. <abbr title="author - Foraging Pawn">悬浮文字提示</abbr>  
7. <font face="楷体">变更字体</font>  
8. 表格  
	示例：  
		|  th1   | th2  | th3  |
		|  ----  | ----  | ----  |
		| td1  | td2 | td3 |

9. >块注释
10. ~~删除线~~
11. <mark>标记</mark>
12. 

**Hold The Faith . Forever !**  
**We can find a way .**  
**Someday .**  
**A path to a new world**  
**And maybe**  
**Maybe its just the begnning after all**  
# author - Foraging Pawn