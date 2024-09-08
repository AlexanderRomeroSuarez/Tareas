export interface IRequestLogin {
  usuario: string;
  password: string;
}

export interface IResponseLogin {
  token: string;
  fullName: string;
  //roles: string[];
  success: boolean;
  errorMessage: string[];
}
