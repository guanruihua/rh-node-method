// const { del, codeGenerator } = require('../src')
// del('../A',[])


// codeGenerator()
/**
 * 生成多个字段名 字段
 * - 自定义哪个字段需要特殊处理
 * 按照字段名循环生成 处理-
 * - 指定哪个字段需要配置
 */
const config = {
	global: {
		'fields': ['name1', 'name2', 'name3'],
		'names': [
			{ value: 'aa', label: 'aaa' },
			{ value: 'bb', label: 'bbb' },
		],
		'services': [
			{ name: 'aa', url: '/a/b', method: 'get' },
			{ name: 'aab', url: '/a/b/c', method: 'post' },
			{ name: 'aac', url: '/a/b/d', method: 'delete' },
			{ name: 'aad', url: '/a/b/e', method: 'get' },
		]
	},
	rules: {
		// 需要修改的文件映射 对应的修改规则
		// key | format | action | dataIndex (global数据的key, 给action传入数据)
		// action
		'index.js': {
			'fields': ['name1', 'name2', 'name3', 'name4'],
			'fields2|,\n': ['name1', 'name2', 'name3|123,\n', 'name4'],
			'fields3': undefined,
			'fields33|, |name2': undefined,
			'fields333|\n |name2': ['name1', 'name2||select|names', 'name3'],
			'fields4': ['name1|, |name', 'name2', 'name3', 'name4'],
			'fields5|, \n|name': ['name1||name1', 'name2', 'name4'],
		},
		'Filter.js': {
			'fields||finput': ['name1||fselect|names', 'name2', 'name3'],
		},
		'service.js': {
			'fields': ['||service|services'],
		}
	},
	actions: {
		inputNumber: function (name) {
			return `<InputNumber
      min={1}
      max={999999}
      name='orders'
      rules={validates.${name}}
      label={locales.${name}}
      disabled={modalFormItemFlag['${name}']}
      initialValue={${name} || ''}
     />`
		},
		input: function (name, payload) {
			return `<Input
      	prefixCls='ant-input'
      	name='${name}'
      	rules={validates.${name}}
      	label={locales.${name}}
      	disabled={modalFormItemFlag['${name}']}
      	initialValue={${name} || ''}
     	/>`
		},
		select: function (name, payload) {
			return (
				`<Select
					name='${name}'
					label={locales.${name}}
					placeholder={locales.${name}}
					initialValue={${name}||''}
					rules={validates.${name}}
					style={{ width: '100%' }}
				>
				${payload.map(({ value, label }, index) => {
					return `\t<Select.Option key={'${value}'} value={'${value}'}>${label}</Select.Option>${index < payload.length - 1 ? '\n' : ''}`
				}).join('')}
				</Select > `
			)
		},
		service: function (item, payload = []) {
			return `${payload.map(({ name, url, method }) => (`export async function ${name}(params) {
	return request('${url}', { method: '${method}', data: params });
}`
			)).join('\n\n')}`
		},
		finput: function (name, payload) {
			return `<ARSearchItem id='${name}' label={locales.${name}} >
    	<Input name='${name}' placeholder={locales.${name}} style={{ width: '170px' }}/>
   	</ARSearchItem>`
		},
		fselect: function (name, payload) {
			return `<ARSearchItem id='${name}' label={locales.${name}} >
    <Select name='${name}' placeholder={locales.${name}} style={{ width: '170px' }}>
     ${payload.map(({ value, label }) => `<Select.Option key='${value}' value='${value}'>${label}</Select.Option>`
		 ).join('\n')}
    </Select>
   </ARSearchItem>\n`
		},
		name: function (item, payload) {
			return `${item} _000`
		},
		name1: function (item, payload) {
			return `${item} _111`
		},
		name2: function (item, payload) {
			return `${item} _222`
		},
	}
}


async function run(entry, output, config) {
	let fs = require('fs')
	try {
		fs.accessSync(entry)
	} catch (error) {
		return;
	}
	let files = fs.readdirSync(entry)
	const { global = {}, rules = {}, actions = {} } = config
	let configCache = {}

	files.forEach((fileName) => {
		// 添加默认添加规则 fields
		if (rules[fileName] && !rules[fileName].fields) {
			rules[fileName].fields = undefined;
		}
		configCache[fileName] = {
			data: fs.readFileSync(`${entry}/${fileName}`) || '',
			rules: rules[fileName] || { fields: undefined }
		}
	})

	// 处理文档数据
	for (let fileName in configCache) {
		const operations = configCache[fileName] || {}
		let result = operations.data;

		for (let operationKey in operations.rules) {

			let operationValueTemp = operations.rules[operationKey] || global.fields || [];
			const [key = '', format = ', ', keyAction = '', dataIndex = ''] = operationKey.split('|')
			const replaceParam = "/* ${" + key + "} */";
			let operationValue = [];
			let useAction = '';

			// 整理数据结构
			if (keyAction !== '' && actions[keyAction]) {
				useAction = actions[keyAction];
			}

			operationValueTemp = operationValueTemp.map((item, index) => {
				let [ikey = '', iformat = '', action = '', iDataIndex = dataIndex] = item.split('|');

				let itemUseAction = useAction || '';
				action !== '' && actions[action] && (itemUseAction = actions[action])
				iformat === '' && (iformat = format)
				index === operationValueTemp.length - 1 && (iformat = '')

				return {
					value: ikey,
					action: itemUseAction,
					format: iformat,
					dataIndex: iDataIndex
				}
			});

			// 写入到对应文件数据
			operationValue = operationValueTemp.map((item) => {
				if (item.action && item.action !== '') {
					let payload = item.dataIndex && global[item.dataIndex] || item.dataIndex || ''
					return item.action(item.value, payload) + (item.format || '');
				}
				return item.value + (item.format || '');
			})


			result = String(result).replace(`{${replaceParam}}`, operationValue.join(''))
			result = String(result).replace(replaceParam, operationValue.join(''))
		}

		// 输出文件
		fs.writeFileSync(`${output}/${fileName}`, result);
	}
}

console.time('run')
run('./temp', './out', config)
console.timeEnd('run')