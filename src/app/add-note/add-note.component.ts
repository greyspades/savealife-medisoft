import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validator, Validators,} from '@angular/forms';
import { NotesService } from '../notes.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  constructor(
      private notes:NotesService,
      private cookies:CookieService
  ) { }

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
  })

  loading:boolean =false

  //* getters for form input values
  get name(){return this.addForm.get('title')}

  get note(){return this.addForm.get('content')}

  close():void{
    this.notes.toggleAdd(false)
  }

  //* submits a valid form
  submit():void{
    this.loading=true
    this.notes.newNote(this.addForm.value)
    .subscribe((res)=>{
      this.loading=false
      if(res.status=='success'){
        alert('Your note has been created successfuly')
        window.location.reload()
      }
    })
  }

  // stoken=this.cookies.get('csrftoken')

  ngOnInit(): void {
    // console.log(this.token)
  }

}
