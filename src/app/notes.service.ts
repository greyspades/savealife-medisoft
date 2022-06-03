import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {FormNote, Note, NoteResponse} from './types'
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(
    private http:HttpClient,
    private cookie:CookieService
  ) { }
  open:boolean=false

  private addNote=new BehaviorSubject<boolean>(false)

  addNoteOpen=this.addNote.asObservable()

  private updateNote=new BehaviorSubject<boolean>(false)

  updateNoteOpen=this.updateNote.asObservable()

  private updateSubject=new BehaviorSubject<FormNote>({
    title:'',
    content:''
  })
  updatable=this.updateSubject.asObservable()

  getAddState():Observable<boolean>{
    return this.addNote
  }

  getUpdateState():Observable<boolean> {
    return this.updateNote
  }

  toggleUpdate(state:boolean):void{
    return this.updateNote.next(state)
  }

  setUpdatable(data:Note):void {
    return this.updateSubject.next({
      title:data.title,
      content:data.content
    })
  }

  toggleAdd(state:boolean):void{
    return this.addNote.next(state)
  }

  token=this.cookie.get('csrftoken')

  getNotes():Observable<NoteResponse> {
    return this.http.get<NoteResponse>('https://note-xyz.herokuapp.com/api/v1/note/')
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }


  newNote(data:FormNote):Observable<NoteResponse> {
    return this.http.post<NoteResponse>('https://note-xyz.herokuapp.com/api/v1/note/',data)
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  update(id:number, data:Note):Observable<any>{
    return this.http.put<any>(`https://note-xyz.herokuapp.com/api/v1/note/${id}`,data)
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`https://note-xyz.herokuapp.com/api/v1/note/${id}`)
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

}
