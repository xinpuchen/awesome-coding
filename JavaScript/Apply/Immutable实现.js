/**
 * Immutable Data 就是一旦创建，就不能再被更改的数据。
 * 对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
 * Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。
 *
 * @param {*} obj
 * @returns newObj
 */
const immutable = (obj) => ({
	set: (path, val) => {
		const paths = path.split('.');
		const lastKey = paths.pop();
		this.get(paths.join('.'))[lastKey] = val;
		return this;
	},
	get: (path) => {
		const paths = path.split('.');
		return paths.reduce((prev, cur) => prev[cur], obj);
	}
});

const obj = {
	name: 'xinpu',
	gender: 1
};

const o = immutable(obj);

o.get(name);

o.name = 'xinpuchen';

o.get('name'); // 'xinpu' 不变
