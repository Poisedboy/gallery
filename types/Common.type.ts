export interface IFile {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface IUser {
  name: undefined;
  email: string;
  image: undefined;
  sub: string;
  id: string;
  role: string;
  username: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface IProduct {
  id: string;
  name?: string;
  price?: string;
  description?: string;
  hardcover?: string;
  image?: string;
}
