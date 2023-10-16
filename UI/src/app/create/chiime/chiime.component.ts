import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChiimeService } from 'src/app/services/chiime/chiime.service';

@Component({
  selector: 'app-chiime',
  templateUrl: './chiime.component.html',
  styleUrls: ['./chiime.component.css'],
})
export class ChiimeComponent implements OnInit {
  chiimeForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chiimeService: ChiimeService,
    public dialogRef: MatDialogRef<ChiimeComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm() {
    this.chiimeForm = this.fb.group({
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

  create() {
    const newChiime = { ...this.chiimeForm.value };
    this.chiimeService.createChiimePost(newChiime).subscribe({
      next: (response) => {

        this.toastr.success();


      },
    });
  }
  closeDialog(){
    this.dialogRef.close([])
  }
}
