import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { CookieService } from 'ngx-cookie-service';
import { Note } from '../types';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})


export class NoteComponent implements OnInit {
  @Input() data?:Note;

  constructor(
    private note:NotesService,
    private cookie:CookieService
  ) { }

  token=this.cookie.get('csrftoken')

  addNoteModal:boolean =true

  log(){
    console.log(this.token)
  }
  
  note1?:any

  update():void{
    this.note.toggleUpdate(true)
    this.note.setUpdatable(this.data!)
  }

  delete():void {
    this.note.delete(this.data?.id!)
    .subscribe((res)=>{
      if(res.status=='success'){
        alert('Your note has been deleted successfuly')
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {

  }

}
