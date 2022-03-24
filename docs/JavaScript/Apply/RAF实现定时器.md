# RAF 实现定时器

```js
const RAF = {
	timeoutTimer: null,
	intervalTimer: null,
	setTimeout: (cb, time) => {
		const now = Date.now;
		let start = now();
		let end = start;
		const loop = () => {
			this.timeoutTimer = requestAnimationFrame(loop);
			end = now();
			if (end - start >= time) {
				cb();
				cancelAnimationFrame(this.timeoutTimer);
			}
		};
		this.timeoutTimer = requestAnimationFrame(loop);
		this.timeoutTimer;
	},
	setInterval: (cb, time) => {
		const now = Date.now;
		let start = now();
		let end = start;
		const loop = () => {
			this.intervalTimer = requestAnimationFrame(loop);
			end = now();
			if (end - start >= time) {
				cb();
				start = now();
				end = start;
			}
		};
		this.intervalTimer = requestAnimationFrame(loop);
		return this.intervalTimer;
	},
	clearTimer: (timer) => {
		cancelAnimationFrame(timer);
	}
};
```
