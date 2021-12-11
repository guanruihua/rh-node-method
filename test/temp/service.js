import request from "../../../assets/APP-Request";

/* ${fields} */

export async function query(params) {
	return request("/apiProduct/productAttrSearch/findPage", { method: "get", data: params });
}
export async function save(params) {
	return request("/apiProduct/productAttrSearch/save", { method: "post", data: params });
}

export async function del(params) {
	return request("/apiProduct/productAttrSearch/delete", { method: "post", data: params });
}