const fs = require('fs');
const path = require('path');

const fileDir = __dirname + "/styleSheet/static/"
let files = fs.readdirSync(fileDir);
// dynamic
// static
files.forEach(file => {
	console.log('==== file :', file);
	if (file !== 'index.js') {
		// readAnwright(fileDir + file)
	}
})

// 写入index文件
writeIndex(files, fileDir)

function writeIndex(files, fileDir) {
	let outStr = ''
	files.forEach(file => {
		if (file !== 'index.js') {
			let filename = path.basename(file, '.js');
			let name = filename.replace(/[-_]/g,'')
			outStr += `export * as ${name} from './${filename}'\n`
		}
	})
	
	fs.writeFile(fileDir + 'index.js', outStr, (err) => {
		if (err) {
			console.log("err: ", err);
		} else {
			console.log("wancheng: ",);
		}
	})
}

function readAnwright(outPutFilepath) {
	let str = fs.readFileSync(outPutFilepath, 'utf8')

	let filename = path.basename(outPutFilepath, '.js');

	// let values = str.split('module.exports')[0].trim()
	let values = str.replace(/\nconst /g, '\nexport const ')
	writeFile(outPutFilepath, values)
}

function writeFile(path, outStr) {
	fs.writeFile(path, outStr, (err, data) => {
		if (err) {
			console.log("err: ", err);
		} else {
			console.log("data: ", data);
		}
	})
}
