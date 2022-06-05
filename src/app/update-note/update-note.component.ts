import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {FormNote, NoteUpdate, UpdateResponse } from '../types'

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  constructor(
    private notes:NotesService
  ) { }

  //* id of current editable form
  id?:number

  //* controls and validates form inputs
  addForm=new FormGroup({
    title:new FormControl('',[
      Validators.minLength(3),
      Validators.required
    ]),

    content:new FormControl('',[
      Validators.minLength(3),
      Validators.required
    ]),

    id:new FormControl(0)
  })


  loading:boolean =false

  
  //* getters for form inputs
  get name(){return this.addForm.get('title')}

  get note(){return this.addForm.get('content')}

  //* closes the update note modal
  close():void{
    this.notes.toggleUpdate(false)
  }

  //* submites a valid form
  submit():void{
    this.loading=true
    this.notes.update(this.addForm.value,this.id!)
    .subscribe((res:UpdateResponse)=>{
      this.loading=false
      if(res.status=='success'){
        alert('Your note has been updated successfuly')
        window.location.reload()
      }
    })
  }

  //* subscribes to data about the current editable form
  ngOnInit(): void {
    this.notes.updatable.subscribe((data:NoteUpdate)=>{
      this.id=data.id
      this.addForm.patchValue({
        title:data.title,
        content:data.content,
      })
    })
  }

}
