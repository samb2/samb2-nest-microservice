export interface JwtAccessPayload {
  authId: string;
  roles: number[];
  iat?: number;
  exp?: number;
}
