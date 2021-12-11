const fs = require('fs')

/**
 * 处理步骤
 * 1. 生成需要删除的文件和文件夹url
 * 2. 删除文件
 * 3. 删除空文件夹
 * 3.1 删除路径最长的文件夹	
 */

async function run(path, unrmList = [], flag = false) {
	try {
		fs.accessSync(path)
	} catch (error) {
		return;
	}
	let files = fs.readdirSync(path)
	let allFileUrl = [];
	let allDirUrl = [];
	let maxDeep = path.split('/').length; // 最大文件层级
	let minDeep = path.split('/').length; // 最小文件层级
	if (flag) allDirUrl.push(path);
	// 解析路径下文件和文件夹
	async function analyseUrl(url) {
		// 更新文件深度
		maxDeep = url.split('/').length > maxDeep ? url.split('/').length : maxDeep;
		try {
			if (fs.lstatSync(url).isDirectory()) {
				allDirUrl.push(url)
				fs.readdirSync(url).map(item => {
					analyseUrl(url + '/' + item)
				})
			} else {
				allFileUrl.push(url)
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (!Array.isArray(files)) { files = [files] }
	if (files.length > 0) {
		await files.forEach(async (item, index) => {
			if (!unrmList.includes(item)) { // 过滤掉不做处理的文件夹
				let url = `${path}/${item}`
				analyseUrl(url)
			}
		})
	}

	//  删除文件
	await allFileUrl.forEach(item => {
		try { fs.unlinkSync(item); } catch (error) { }
	})

	// 删除 空文件夹 
	maxDeep++; // 添加多一层, 最底级 文件夹可能没有子文件夹
	while (maxDeep-- > minDeep) {
		allDirUrl.forEach(item => {
			if (item.split('/').length === maxDeep) {
				try {
					fs.rmdirSync(item);
				} catch (err) { }
				delete item;
			}
		})
	}

}
// run: 74.837ms


// run('./node_modules', [], true);
// run('./src/modules', ['app', 'push', 'login', 'measure']);

module.exports.del = run

