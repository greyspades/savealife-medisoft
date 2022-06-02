export interface User {
    first_name:string,
    last_name:string,
    email:string,
    password:string
  }

export interface UserResponse {
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    id:number,
    created:string,
    updated:string
}

export interface Response {
    status: string;
    message: string;
    data: UserResponse;
}

export interface LoginResponse extends Array<Response> {
  
}