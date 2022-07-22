import request from "@/utils/request"

/**
 * 接口case 随机生成三种水果
 * @param   params 要传的参数值
 * @returns   返回接口数据
 */
export function getTodayFruit(params:Object) {
    return request({
        url: '/getTodayFruit',
        method: 'get',
        data: params,
    })
}

/**
 * 接口case 从数据库获取课程表
 * @param   params 要传的参数值
 * @returns   返回接口数据
 */
 export function getSubjects(params:Object) {
    return request({
        url: '/getSubjects',
        method: 'get',
        data: params,
    })
}

/**
 * 接口case 获取token
 * @param   username: admin
 * @param   password: admin
 */
 export function getToken(params:Object) {
    return request({
        url: '/api/token/',
        method: 'post',
        data: params,
    })
}


/**
 * 接口case 用户登录
 * @param   username: admin
 * @param   password: admin
 * @returns   返回接口数据
 */
 export function login(params:Object) {
    return request({
        url: '/api/admin/login/',
        method: 'post',
        data: params,
    })
}

/**
 * 接口case 获取用户信息
 * @returns   返回接口数据
 */
 export function getUserInfo(params:Object) {
    return request({
        url: '/api/system/user/info/',
        method: 'get',
        data: params,
    })
}

/**
 * 接口case 获取教师列表
 * @returns   返回接口数据
 */
export function getTeacherListApi(params:Object) {
    return request({
        url: '/teachers',
        method: 'get',
        params,
    })
}

/**
 * 接口case 好评
 */
 export function praiseTeacherApi(params:Object) {
    return request({
        url: 'praise',
        method: 'get',
        params,
    })
}

/**
 * 接口case 差评
 */
 export function criticizeTeacherApi(params:Object) {
    return request({
        url: 'criticize',
        method: 'get',
        params,
    })
}
/**
 * 接口case 新增教师
 */
 export function insertTeacherApi(params:Object) {
    return request({
        url: 'teacher/insert',
        method: 'post',
        data: params,
    })
}
/**
 * 接口case 删除教师
 */
 export function deleteTeacherApi(params:Object) {
    return request({
        url: 'teacher/delete',
        method: 'delete',
        params,
    })
}