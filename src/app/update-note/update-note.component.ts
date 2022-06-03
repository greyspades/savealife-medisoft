import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {FormNote } from '../types'

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  constructor(
    private notes:NotesService
  ) { }

  addForm=new FormGroup({
    title:new FormControl('',[
      Validators.minLength(3),
      Validators.required
    ]),

    content:new FormControl('',[
      Validators.minLength(3),
      Validators.required
    ]),
  })

  data?:FormNote

  loading:boolean =false

  get name(){return this.addForm.get('title')}

  get note(){return this.addForm.get('content')}

  close():void{
    this.notes.toggleUpdate(false)
  }

  submit():void{
    this.loading=true
    this.notes.newNote(this.addForm.value)
    .subscribe((res)=>{
      this.loading=false
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.notes.updatable.subscribe((data:FormNote)=>{
      this.data=data
    })
  }

}
