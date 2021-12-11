import { namespace } from './commom'
import { query, save, del } from './service'
import { checkCode } from './utils'

export default {
	namespace,
	state: {
		editLocale: localStorage.lang || "en_US",
		list: [],
		filter: {},
		pagination: {
			current: 1,
			total: 0,
			pageSize: localStorage.pageSize || 10,
		},
	},
	effects: {
		*query({ payload = {}, callback }, { call, put, select }) {

			let queryParams = {};

			/* 处理过滤条件 和 分页的处理  start */
			if (payload.pageSize) { // 证明是分页查询
				let filter = yield select(state => state[namespace].filter);
				queryParams = {
					...payload,
					...filter,
				}
			} else {
				queryParams = payload;
				yield put({
					type: 'updateState',
					payload: {
						filter: payload,
					}
				})
			}
			/* 处理过滤条件 和 分页的处理  end */

			const { code = '-1', data, message } = yield call(query, queryParams)
			if (!checkCode({ code, message })) return;
			const { pageNo = 1, pageSize = 10, totalCount = 0, result = [] } = data;
			yield put({
				type: 'updateState',
				payload: {
					list: result,
					pagination: {
						current: Number(pageNo),
						total: Number(totalCount),
						pageSize: Number(pageSize)
					}
				}
			})
		},
		*save({ payload = {}, callback }, { call, put, select }) {

			let res = yield call(save, payload)
			if (!checkCode(res)) return;
			callback && callback();
			let { filter, pagination } = yield select(state => state[namespace]);
			yield put({
				type: 'query',
				payload: {
					...filter,
					pageNo: pagination.current,
					pageSize: pagination.pageSize
				}
			})
		},
		*del({ payload = {}}, { call, put, select }) {
			let res = yield call(del, payload)
			if (!checkCode(res)) return;
			const { filter, pagination } = yield select(state => state[namespace]);
			yield put({
				type: 'query',
				payload: {
					...filter,
					pageNo: pagination.current,
					pageSize: pagination.pageSize
				}
			})

		}
	},
	reducers: {
		updateState(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};