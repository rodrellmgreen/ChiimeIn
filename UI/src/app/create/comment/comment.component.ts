import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChiimeFullComponent } from 'src/app/chiime-full/chiime-full.component';
import { Comment } from 'src/app/models/Comment';
import { ChiimeService } from 'src/app/services/chiime/chiime.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup = new FormGroup({});
  @Input() chiimeId!: string;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chiimeService: ChiimeService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment
  ) {}

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(140)]],
    });
  }

  create() {
    const newComment = { ...this.commentForm.value };
    const id = this.data.chiimeId
    console.log(id)
    if(id != null){
       this.chiimeService.createComment(id, newComment).subscribe({
      next: () => {
        this.toastr.success();

      },
    });
    }

  }

  closeDialog(){
    this.dialogRef.close([])
  }
}
