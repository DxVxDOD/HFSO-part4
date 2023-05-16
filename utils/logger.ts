const info = <T>(...params: T[]) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params);
	}
};

const error = <T>(...params: T[]) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params);
	}
};

export default {info, error};
