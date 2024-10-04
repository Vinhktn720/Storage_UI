import {ChangeDetectionStrategy, AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Products } from '../../Models/products';
import { ProductsService } from '../../Services/products.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { addProductForm } from './addProductForm/addProductForm';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatButtonModule, 
    MatTooltipModule,
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    addProductForm
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Name', 'Status', 'Location', 'Platform', 'Stock', 'Edit'];
  dataSource = new MatTableDataSource<Products>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  proService = inject(ProductsService);

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts()
  {
    this.proService.getAllProducts().subscribe((res) =>{
      this.dataSource.data = res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(addProductForm, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}