/**
 * 第一步：const 定义字体图标常量地址
 * 
 * 字体图标 url
 * 来源： 取自iconfont官网
 */
const cssCdnUrlList: Array<string> = [
	'//at.alicdn.com/t/font_2298093_y6u00apwst.css',
	'//at.alicdn.com/t/font_2917057_rugnsxb5qyt.css' //自用项目
];
/**
 * 第二步 定义某些第三方js地址，目前看未用到
 * 
 * 第三方 js url
 */
const jsCdnUrlList: Array<string> = [];

/**
 * 第三步 方法 动态批量设置字体图标 
 * 1、判断第一步字体图标地址长度，若长度0即cssCdnUrlList数组为空数组-无字体图标地址，则return false；
 * 2、map遍历cssCdnUrlList，通过操作dom在head标签下创建link标签设置地址并处理跨域；
 * 
 * 动态批量设置字体图标
 */
export function setCssCdn() {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = v;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

/**
 * 第四步 方法 动态批量设置第三方js
 * 1、同第三步遍历循环，不同点在于将link标签创建在body标签下；
 * 
 * 动态批量设置第三方js
 */
export function setJsCdn() {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement('script');
		link.src = v;
		document.body.appendChild(link);
	});
}

/**
 * 第五步 方法 将三、四步方法统一封装进setIntroduction对象内
 * 
 * 
 * 批量设置字体图标、动态js
 * @method cssCdn 动态批量设置字体图标
 * @method jsCdn 动态批量设置第三方js
 */
const setIntroduction = {
	// 设置css
	cssCdn: () => {
		setCssCdn();
	},
	// 设置js
	jsCdn: () => {
		setJsCdn();
	},
};

/**
 * 第六步  抛出第五步封装好的对象
 * 
 */
export default setIntroduction;


/**
 * 非本文件内操作
 * 1、在app.vue文件内引入该js抛出的对象
 * import setIntroduction from '@/utils/setIconfont'
 * 2、在onBeforeMount生命周期内执行setIntroduction内批量设置字体图标及第三方js方法(设置初始化，防止刷新时恢复默认)
 * export default defineComponent({
 * 		name: 'app',
 * 		setup() {
 * 			onBeforeMount(() => {
 * 				setIntroduction.cssCdn();
 * 				setIntroduction.jsCdn();
 * 			});
 * 		}
 * })
 */
