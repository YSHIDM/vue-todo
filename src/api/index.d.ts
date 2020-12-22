declare interface HttpRes<T = any> {
	code: number|string;
	msg: string;
	data: T;
}
