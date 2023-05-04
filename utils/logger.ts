const info = <T>(...params: T[]) => {
	console.log(...params);
};

const error = <T>(...params: T[]) => {
	console.error(...params);
};

export default {info, error};
