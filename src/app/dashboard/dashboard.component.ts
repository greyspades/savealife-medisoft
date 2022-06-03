import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';
import { Note, NoteResponse } from '../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subscription?: Subscription;

  constructor(
    private note:NotesService
  ) { }

  addNoteOpen?:boolean

  updateNoteOpen?:boolean

  notes:any=[]

  toggleAddmodal():void {
    this.note.toggleAdd(true)
  }

  ngOnInit(): void {
    this.note.getAddState().subscribe((state:boolean)=>{
      this.addNoteOpen=state
    })
    this.note.getUpdateState().subscribe((state:boolean)=>{
      this.updateNoteOpen=state
    })
    this.note.getNotes().subscribe((res:NoteResponse)=>{
      this.notes=res.data
    })
  }

}
