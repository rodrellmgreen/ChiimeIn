import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ChiimeService } from '../services/chiime/chiime.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Chiime } from '../models/Chiime';
import { Comment } from '../models/Comment';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../create/comment/comment.component';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { outputAst } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { DatePipe, formatDate } from "@angular/common";

@Component({
  selector: 'app-chiime-full',
  templateUrl: './chiime-full.component.html',
  styleUrls: ['./chiime-full.component.css'],
})
export class ChiimeFullComponent implements OnInit, OnDestroy {
  editChiimeForm :FormGroup = new FormGroup({})
  chiime!: Chiime;

  comments!: any;
  userName!: string;
  title!: string;
  content!: string;
  editedDate!: any;


  commentUserName!: string;
  commentId!: string;
  editMode: boolean = false;
  validationErrors: string[] | undefined;
  updatedChiime!: Chiime;

  deleteChiimeSub? : Subscription;
  editChiimeSub? : Subscription;
  getChiimeSub? : Subscription;
  deleteCommentSub? : Subscription;


  constructor(
    private http: HttpClient,
    private router: Router,
    private chiimeService: ChiimeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService

  ) {}
  ngOnDestroy(): void {
    this.editChiimeSub?.unsubscribe();
    this.deleteChiimeSub?.unsubscribe();
    this.deleteCommentSub?.unsubscribe();


  }

  ngOnInit(): void {
    this.getChiime();
    this.initForm();



  }

  getChiime() {
    const chiimeId = this.route.snapshot.paramMap.get('id');
    this.chiimeService.getChiime(chiimeId!).subscribe({
      next: (response) => (
        (this.chiime = response),
        (this.chiime.id = response.id),
        (this.userName = this.chiime.userName),
        (this.comments = this.chiime.commentList),

        (this.title = this.chiime.title),
        (this.content = this.chiime.content),
        (this.editedDate = this.chiime.editedDate)
      ),
    });
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
   const dialogRef = this.dialog.open(CommentComponent, {
      data:{
        chiimeId: this.route.snapshot.paramMap.get('id')
      },
      width: '60%',
      height: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {

      this.getChiime();
    });
  }


  deleteChiime(){
   const chiimeId = this.route.snapshot.paramMap.get('id');
   this.deleteChiimeSub = this.chiimeService.deleteChiime(chiimeId!).subscribe({
      next: response => {this.toastr.success(),
                    this.router.navigateByUrl('');
    }, error: err => this.router.navigateByUrl('')
    })
  }
  deleteComment(id: string){

   this.deleteCommentSub = this.chiimeService.deleteComment(id).subscribe({
      next: response => this.toastr.success("Comment Deleted!")
    })
  }
  initForm() {
    this.editChiimeForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  editChiime(){
    const chiimeId = this.route.snapshot.paramMap.get('id');
    const model = {...this.editChiimeForm.value}
    if(chiimeId){
     this.editChiimeSub = this.chiimeService.editChiime(chiimeId, model).subscribe({
        next: response => {this.chiime = response, this.toastr.success();},
        error: error => console.log(error)

      })
    }

    this.toggleEditMode();
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editChiimeForm;

  }


}
