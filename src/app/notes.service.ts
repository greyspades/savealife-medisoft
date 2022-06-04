import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {FormNote, Note, NoteResponse, NoteUpdate} from './types'
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

  //* subject for controling add note modal vissibility
  private addNote=new BehaviorSubject<boolean>(false)

  addNoteOpen=this.addNote.asObservable()

  //* subject for controling update note modal vissibility
  private updateNote=new BehaviorSubject<boolean>(false)

  updateNoteOpen=this.updateNote.asObservable()

  //* subject for updating the current note to be updated
  private updateSubject=new BehaviorSubject<NoteUpdate>({
    title:'',
    content:'',
    id:0
  })
  updatable=this.updateSubject.asObservable()

  //* returns the state of the add note modal
  getAddState():Observable<boolean>{
    return this.addNote
  }
  //* returns the status of the current update note modal
  getUpdateState():Observable<boolean> {
    return this.updateNote
  }

  //* toggles the state of the update modal
  toggleUpdate(state:boolean):void{
    return this.updateNote.next(state)
  }

  //* sets the current note to be updated in the updatable subject
  setUpdatable(data:NoteUpdate):void {
    return this.updateSubject.next({
      title:data.title,
      content:data.content,
      id:data.id
    })
  }

  //* toggles the state of the add note modal
  toggleAdd(state:boolean):void{
    return this.addNote.next(state)
  }

  //* fetch all user notes
  getNotes():Observable<NoteResponse> {
    return this.http.get<NoteResponse>('https://note-xyz.herokuapp.com/api/v1/note/',{withCredentials:true})
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  //* adds a new note
  newNote(data:FormNote):Observable<NoteResponse> {
    return this.http.post<NoteResponse>('https://note-xyz.herokuapp.com/api/v1/note/',data,{withCredentials:true})
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  //* updates a selected note
  update(data:NoteUpdate,id:number):Observable<any>{
    return this.http.put<any>(`https://note-xyz.herokuapp.com/api/v1/note/${id}`,data,{withCredentials:true})
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  //* deletes a selected note
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`https://note-xyz.herokuapp.com/api/v1/note/${id}`,{withCredentials:true})
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

}
