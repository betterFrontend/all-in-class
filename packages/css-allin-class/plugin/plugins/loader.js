
export default async function transform(source) {
  const callback = this.async()
  // var headerPath = path.resolve('header.js');
	console.log('==== transform :', this.resource);
  // this.addDependency(headerPath);

	// 匹配class的内容
	
	// 修改文件

  // fs.readFile(headerPath, 'utf-8', function (err, header) {
  //   if (err) return callback(err);
  //   callback(null, header + '\n' + source);
  // });
	
   return callback(null, source)
}