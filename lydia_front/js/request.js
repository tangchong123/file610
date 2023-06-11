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
			baseURL: 'http://localhost:4400/api',
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

// const baseURL = 'http://localhost:4400/api'

let urls = {
	login: '/login',
	register: '/register',
}

// urls = new Proxy(urls, {
// 	get(target, key) {
// 		return baseURL + target[key]
// 	},
// })

function login(username, password) {
	return ajax({
		method: 'POST',
		url: urls.login,
		data: {
			username,
			password,
		},
	})
}

function register(data) {
	return ajax({
		method: 'POST',
		url: urls.register,
		data: data,
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
