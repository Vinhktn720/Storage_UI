import {ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProductsService } from '../../../Services/products.service';


@Component({
    selector: 'dialog-animations-example-dialog',
    templateUrl: 'addProductForm.html',
    standalone: true,
    imports: [
        ReactiveFormsModule, 
        CommonModule,
        MatButtonModule, 
        MatDialogActions, 
        MatDialogClose, 
        MatDialogTitle, 
        MatDialogContent,
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class addProductForm implements OnInit {
    readonly dialogRef = inject(MatDialogRef<addProductForm>);
    productServe = inject(ProductsService);
    productForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.setFormState();
    }
    formValues : any;
    onSubmit() : void 
    {
      console.log(this.productForm.value);  
      if(this.productForm.invalid) 
      {
        alert("Value is not valid");
        return;
      } 
      this.formValues = this.productForm.value;
      this.productServe.addProduct(this.productForm.value).subscribe((res) => {
        alert("Product Added successfully");
        this.productForm.reset();
      });
    }
    onNoClick() :void 
    {
      this.dialogRef.close();
    }
    setFormState(): void
    {
        this.productForm = this.fb.group({
            id: [0],
            barcode: ['', [Validators.required]],
            shopId: ['', [Validators.required]],
            name: ['', [Validators.required]],
            status: ['', [Validators.required]],
            categoryId: ['', [Validators.required]],
            sku: ['', [Validators.required]],
            weight: ['', [Validators.required]],
            location: ['', [Validators.required]],
            stock: ['', [Validators.required]],
            companyId: ['', [Validators.required]],
            platform: ['', [Validators.required]]
        });
    }
  }