import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  //getAllProducts():affichage de tous les produits
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + "/products");
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + "/products?selected=true");
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + "/products?available=true");
  }

  //SearchProducts(): recherche d'un produit
  SearchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + "/products?name_like=" + keyword);
  }

  //SelectProduct(): changer la valeur de l'attribut selected
  SelectProduct(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(environment.host + "/products/" + product.id, product);
  }

  DeleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(environment.host + "/products/" + product.id);
  }

  //ajoiuter un product
  SaveProduct(product: Product): Observable<Product> {
 
    return this.http.post<Product>(environment.host + "/products/", product);
  }


  getProducts(id:number): Observable<Product> {
    return this.http.get<Product>(environment.host + "/products/"+id);
  }
  //Update product
  UpdateProducts(product: Product): Observable<Product> {
    return this.http.put<Product>(environment.host + "/products/"+ product.id, product);
  }
}
