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

export interface LoginResponse{
  body:Response,
  headers:any
}

export interface FormNote {
    title:string,
    content:string,
}

export interface Note {
    id:number,
    title:string,
    content:string,
    user_id:string,
    created:string,
    updated:string,
    user:User
}

export interface NotesResponse {
    status:string,
    message:string,
    has_next:boolean,
    per_page:number,
    total:number,
    data:Note
}

export interface NoteResponse {
    status:string,
    message:string,
    data:Note
}

export interface NoteUpdate {
    title:string,
    content:string,
    id:number
}

export interface NoteArray extends Array<Note> {

}

export interface UpdateResponse {
    status:string,
    message:string,
    has_next:boolean,
    per_page:number,
    total:number,
    data:NoteArray
}

export interface DeleteResponse {
    status:string,
    message:string
}

