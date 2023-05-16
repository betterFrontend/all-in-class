const path = require('path');
const fs = require('fs');

let str = fs.readFileSync('./file.text', 'utf8')
let str1= str
let filename = str1.split('\n')[0].split('\t')[1].split(':')[0].trim()
const outPutFilepath = __dirname + '\\' + filename +'.js'

let values = str.split('\n').map(item=> "'"+item.split('\t')[1].split(':')[1].trim().replace(';','')+"'").join(', ')

let ailwindcss = str.split('\n').map(item=> {
	return `'${item.split('\t')[0].trim()}': '${item.split('\t')[1].trim()}'`
}).join(',\n\t')

let outStr =
`
const ailwindcss = {
	${ailwindcss}
} 


const style = {
	'${filename}': [${values}]
}
module.exports = style
`
// console.log("str.split('\n').map(item=> item.split(' ')[0]): ",str.split('\n').map(item=> item.split('\t')[0]));
fs.writeFile(outPutFilepath, outStr, (err, data) => {
	if (err) {
		console.log("err: ", err);
	} else {
		console.log("data: ", data);
	}
})
