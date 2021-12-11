// const { del, codeGenerator } = require('../src')
// del('../A',[])


// codeGenerator()

/**
 * 代码生成器
 * 1. 传入模板
 * 1.1 写好替换的字段, 例如${aaa}
 * 2. 通过 写好的配置, 然后通过写好的配置和模板文件生成目标文件
 */

const config = {
	defaultConfig: {
		fields: ['name1', 'name2', 'name3'],
		options: {
			names: [
				{ value: 'aa', label: 'aaa' },
				{ value: 'bb', label: 'bbb' },
			]
		},
	},
	rules: {
		// 需要修改的文件映射 对应的修改规则
		'Filter.js': {
			fieldsConfig: {
				fields: ['name1', 'name2', 'name3|select|names|\n\t\t\t\t\t'],
				functionKey: 'filter',
				// keepParentheses: false,// 是否保留{}括号, 默认false
				format: '\n\n\t\t\t'
			},
			fieldConfig: {

			}
		},
		'service.js': {
			fieldsConfig: {
				fields: [
					'query|/apiProduct/productAttrSearch/findPage|get',
					'query2|/apiProduct/productAttrSearch/findPage2|post',
					'query3|/apiProduct/productAttrSearch/findPage3|delete',
				],
				functionKey: 'service'
			},
		},
		'Modal.js': {
			fieldsConfig: {
				fields: ['name1', 'name2|inputNumber', 'name3|select|names|\n\t\t\t\t\t'],
				functionKey: 'modal',
				format: '\n\t\t\t\t\t',
			},
			fieldConfig:{
				fields: ['name1', 'name2', 'name3', 'name3']
			}
		}
	},
	functions: {
		modal: function (item, defaultConfig = {}) {
			const [name, type, optionsKey, format = '\n'] = item
			const { options = {} } = defaultConfig
			if (type === 'select') {
				return `<Select
            name='${name}'
            label={locales.${name}}
            placeholder={locales.${name}}
            initialValue={${name}||''}
            rules={validates.${name}}
            style={{ width: '100%' }}
          >
					${options[optionsKey] && options[optionsKey].length > 0 ? options[optionsKey]
						.map(({ value, label }) => {
							return `<Select.Option key={${value}} value={${value}}>${label}</Select.Option>`
						}).join(format) : ''}
          </Select>`
			}
			if (type === 'inputNumber') {
				return `<InputNumber
						min={1}
						max={999999}
						name='orders'
						rules={validates.${name}}
						label={locales.${name}}
						disabled={modalFormItemFlag['${name}']}
						initialValue={${name} || ''}
					/>`
			}
			return `<Input
						prefixCls='ant-input'
						name='${name}'
						rules={validates.${name}}
						label={locales.${name}}
						disabled={modalFormItemFlag['${name}']}
						initialValue={${name} || ''}
					/>`
		},
		service: function (item) {
			const [name, url, method] = item;
			return (
				`export async function ${name}(params) {
	return request('${url}', { method: '${method}', data: params });
}`)
		},
		filter: function (item = [], defaultConfig = {}) {
			const [name, type = 'input', optionsKey = '', format = '\n'] = item
			const { options } = defaultConfig
			if (type === 'select') {
				return `<ARSearchItem id='${name}' label={locales.${name}} >
				<Select name='${name}' placeholder={locales.${name}} style={{ width: '170px' }}>
					${options[optionsKey] && options[optionsKey].length > 0 ? options[optionsKey]
						.map(({ value, label }) => {
							return `<Select.Option value='${value}'>${label}<Select.Option>`
						}).join(format) : ''}
				</Select>
			</ARSearchItem>`
			}
			return `<ARSearchItem id='${name}' label={locales.${name}} >
				<Input name='${name}' placeholder={locales.${name}} style={{ width: '170px' }}/>
			</ARSearchItem>`
		}
	}
}




// field 关键词处理
function handleField(db, key, fieldsConfig, defaultConfig, functions) {
	const {
		functionKey = '', keepParentheses = false, format = '\n',
		fields = defaultConfig.fields || {},
	} = fieldsConfig

	let fieldsReplaceParams = fields;
	!keepParentheses && (db[key].data = String(db[key].data).replace('{/* ${field} */}', '/* ${fields} */'))

	if (functions[functionKey]) {
		fieldsReplaceParams = fieldsReplaceParams.map(item => {
			return functions[functionKey](String(item).split('|'), defaultConfig)
		})
	}


	db[key].data = String(db[key].data).replace('/* ${field} */', fieldsReplaceParams.join(format))
}

// fields 关键词处理
function handleFields(db, key, fieldsConfig, defaultConfig, functions) {
	const {
		functionKey = '', keepParentheses = false, format = '\n',
		fields = defaultConfig.fields || {},
	} = fieldsConfig

	let fieldsReplaceParams = fields;
	!keepParentheses && (db[key].data = String(db[key].data).replace('{/* ${fields} */}', '/* ${fields} */'))

	if (functions[functionKey]) {
		fieldsReplaceParams = fieldsReplaceParams.map(item => {
			return functions[functionKey](String(item).split('|'), defaultConfig)
		})
	}


	db[key].data = String(db[key].data).replace('/* ${fields} */', fieldsReplaceParams.join(format))
}

async function run(entry, output, config) {
	let fs = require('fs')
	try {
		fs.accessSync(entry)
	} catch (error) {
		return;
	}
	let files = fs.readdirSync(entry)
	let db = {}

	files.forEach((fileName) => {
		db[fileName] = {
			data: fs.readFileSync(`${entry}/${fileName}`),
			entry,
		}
	})

	// 处理文档数据

	const {
		defaultConfig = {},
		rules = {}, functions = {}
	} = config
	for (let key in db) {
		if (rules[key]) {

			const {
				fieldsConfig = {},
			} = rules[key] || {}

			handleFields(db, key, fieldsConfig, defaultConfig, functions)


			// console.log(`${output}/${key}`);
			if (key === 'Modal.js') console.log(db[key].data);
		}
		// fs.writeFileSync(`${output}/${key}`, db[key].data);
		// console.log(`${output}/${key}`, db[key].data);
	}


	// console.log({ files, db })

	// let files = fs.readFileSync('./temp/index.js.temp')
	// console.log('files', files);
	// fs.writeFileSync('./out/index.js', files)
	// console.log({ entry, output });

}

const entryUrl = './temp'
const outputUrl = './out'
run(entryUrl, outputUrl, config)
