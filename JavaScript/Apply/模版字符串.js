/**
 * 模版字符串
 *
 * @param {String} template 模版字符串
 * @param {Object} data 模版参数
 * @returns
 */
const render = (template, data) => {
	const reg = /\{\{(\w+)\}\}/;
	if (reg.test(template)) {
		const key = reg.exec(template)[1];
		const next = template.replace(reg, data[key]);
		return render(next, data);
	}
	return template;
};

const template = '我是{{name}}，性别{{sex}}，年龄{{age}}';
const person = {
	name: 'xinpu',
	age: 26,
	sex: '男'
};

console.log(render(template, person));
