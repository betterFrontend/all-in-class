/**
 * 获取content中定义的 css样式名称
 * @param {String} content 字符串 vue文件template字符串
 * @return {Array} 数组 css样式名称 
 */
function getClass(content: string): string[] {
	const regword = /[^<>\{\}"'+`\s:]+/g
	const classReg = /(?<=class\s*\=\s*)(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+))?/g
	const numberRef = /^\d+$/g

	// 匹配<> 内的 class
	let classList = content.match(classReg) ?? []

	let classArr: string[] = []
	// console.log('==== classList :', classList);
	for (let items of classList) {
		let className = items.match(regword)?.filter((item) => !numberRef.test(item)) || [];
		classArr = classArr.concat(className)
	}
	// console.log("classArr: ",classArr);

	return [...new Set(classArr)]
}

export default getClass
