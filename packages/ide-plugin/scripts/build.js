const compressing = require('compressing');
const fs = require('fs');
// // 压缩一个文件
// compressing.zip.compressFile('E:/1.txt','E:/1.zip').then(() => {
// 	console.log('压缩完成')
// }).catch(() => {
// 	console.log('压缩失败')
// })
// // 压缩一个文件夹
// compressing.zip.compressDir('E:/test', 'E:/test.zip').then(func1).catch(func2);
// 同时压缩多个文件和文件夹，采用 stream 的方式
const zipStream = new compressing.zip.Stream();
zipStream.addEntry('./out');
zipStream.addEntry('./README.md');
zipStream.addEntry('./package.json');
zipStream.pipe(fs.createWriteStream('./anlion-ide-plugin.zip')).on('finish', ()=>{
	console.log('压缩完成')
}).on('error', ()=>{
	console.log('压缩失败')
})
