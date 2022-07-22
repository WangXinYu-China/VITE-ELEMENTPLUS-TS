import type { App } from 'vue';

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * 
 */
let authBtnList: any = ['btn-1', 'btn-2', 'btn-3', 'btn-4', 'btn-5', 'btn-6'];
export function authDirective(app: App) {
	// 单个权限验证（v-auth="xxx"）
	app.directive('auth', {
		mounted(el, binding) {
			if (!authBtnList.some((v: string) => v === binding.value)) el.parentNode.removeChild(el);
		},
	})
}
