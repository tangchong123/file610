async function ajax({
	method = 'GET',
	url,
	params = {},
	data = {},
	headers = {},
	init = {},
} = {}) {
	try {
		let res = await axios({
			baseURL: 'http://localhost:8080/profiles',
			method: method,
			url: url,
			params: params,
			data: data,
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				...headers,
			},
			...init,
		})

		let { code, msg, data: data1 } = res.data

		if (code != 200) {
			alert(msg)
			throw new Error(msg)
		}

		return data1
	} catch (err) {
		// 同一处理错误
		// alert('错误请求，请稍候重试！')
		throw new Error(err)
	}
}

// 用户登录
function login(username, password) {
	return ajax({
		method: 'POST',
		url: "/login",
		data: {
			username,
			password,
		},
	})
}

// 用户注册
function register(data) {
	return ajax({
		method: 'POST',
		url: "/register",
		data: data,
	})
}

// 更新用户信息
function updateUser(id,data) {
	return ajax({
		method: "PATCH",
		url: `/users/${id}`,
		data: data
	})
}

// 获取用户信息
function getUser(id,data) {
	return ajax({
		method: "GET",
		url: `/users/${id}`,
		data: data
	})
}

function uploadFile(data) {
	return ajax({
		method: 'POST',
		url: '/upload',
		data: data,
	})
}

function uploadChunk(data, params) {
	return ajax({
		method: 'POST',
		url: '/upload/chunk',
		data,
		params,
	})
}

function mergeFile(data) {
	return ajax({
		method: 'POST',
		url: '/upload/merge',
		data: data,
	})
}
