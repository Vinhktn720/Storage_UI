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
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
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
import { ApiResponse } from '../../Models/api-response';

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
    MatSortModule,
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
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  displayedColumns: string[] = ['Name', 'Status', 'Location', 'Platform', 'Stock', 'Edit'];
  dataSource = new MatTableDataSource<Products>([]);


  proService = inject(ProductsService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts()
  {
    this.proService.getAllProducts().subscribe((res: ApiResponse<Products[]>) =>{
      this.dataSource.data = res.response;
      console.log("ABS is:",res.response);
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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