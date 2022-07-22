/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
 export function deepClone(obj: any) {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * 深拷贝案例
 */

function deepClone1(obj: any, hash = new WeakMap()) {
	// 如果对象的值等于它本身，在递归的时候会陷入死循环，通过WeakMap模拟hash表，避免这种情况的出现
	if (hash.has(obj)) return hash.get(obj);
	let type = Object.prototype.toString.call(obj);
	let target: any;
	switch (type) {
		// 普通对象需要考虑下key值为Symbol的情况
		case '[object Object]':
			let symKeys = Object.getOwnPropertySymbols(obj);
			target = {};
			if (symKeys.length) {
				symKeys.forEach((key) => {
					target[key] = deepClone(obj[key], hash);
				});
			}
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object') {
						target[key] = deepClone1(obj[key], hash);
					} else {
						target[key] = obj[key];
					}
				}
			}
			break;
		case '[object Array]':
			target = [];
			obj.forEach((val: any) => {
				if (typeof val === 'object') {
					target.push(deepClone1(val, hash));
				} else {
					target.push(val);
				}
			});
			break;
		case '[object Map]':
			// 调用map对象的forEach方法遍历所有的键值对
			target = new Map();
			obj.forEach((val: any, key: any) => {
				target.set(key, deepClone1(val, hash));
			});
			break;
		case '[object Set]':
			target = new Set();
			obj.forEach((val: any) => {
				target.add(deepClone1(val, hash));
			});
			break;
		case '[object Date]':
			target = new Date(obj);
			break;
		default:
			target = obj;
			break;
	}
	return target;
}
