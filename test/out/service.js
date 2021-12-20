import request from "../../../assets/APP-Request";

export async function aa(params) {
	return request('/a/b', { method: 'get', data: params });
}

export async function aab(params) {
	return request('/a/b/c', { method: 'post', data: params });
}

export async function aac(params) {
	return request('/a/b/d', { method: 'delete', data: params });
}

export async function aad(params) {
	return request('/a/b/e', { method: 'get', data: params });
}

export async function query(params) {
	return request("/apiProduct/productAttrSearch/findPage", { method: "get", data: params });
}
export async function save(params) {
	return request("/apiProduct/productAttrSearch/save", { method: "post", data: params });
}

export async function del(params) {
	return request("/apiProduct/productAttrSearch/delete", { method: "post", data: params });
}