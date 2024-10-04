import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';

export const routes: Routes = [

    {
        path: "",component: ProductsComponent
    },
    {
        path: "products", component: ProductsComponent
    }
];
