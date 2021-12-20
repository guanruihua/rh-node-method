// field 关键词处理
// function handleField(db, key, fieldsConfig, defaultConfig, functions) {
// 	const {
// 		functionKey = '', keepParentheses = false, format = '\n',
// 		fields = defaultConfig.fields || {},
// 	} = fieldsConfig

// 	let fieldsReplaceParams = fields;
// 	!keepParentheses && (db[key].data = String(db[key].data).replace('{/* ${field} */}', '/* ${fields} */'))

// 	if (functions[functionKey]) {
// 		fieldsReplaceParams = fieldsReplaceParams.map(item => {
// 			return functions[functionKey](String(item).split('|'), defaultConfig)
// 		})
// 	}


// 	db[key].data = String(db[key].data).replace('/* ${field} */', fieldsReplaceParams.join(format))
// }

// fields 关键词处理
// function handleFields(db, key, fieldsConfig, defaultConfig, functions) {
// 	const {
// 		functionKey = '', keepParentheses = false, format = '\n',
// 		fields = defaultConfig.fields || {},
// 	} = fieldsConfig

// 	let fieldsReplaceParams = fields;
// 	!keepParentheses && (db[key].data = String(db[key].data).replace('{/* ${fields} */}', '/* ${fields} */'))

// 	if (functions[functionKey]) {
// 		fieldsReplaceParams = fieldsReplaceParams.map(item => {
// 			return functions[functionKey](String(item).split('|'), defaultConfig)
// 		})
// 	}


// 	db[key].data = String(db[key].data).replace('/* ${fields} */', fieldsReplaceParams.join(format))
// }