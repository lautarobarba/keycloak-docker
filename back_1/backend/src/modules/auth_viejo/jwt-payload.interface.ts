export interface IJWTPayload {
	sub: number;
	email: string;
	iat: Date;
	exp: Date;
}
