import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { UserStorageService } from 'src/app/services/auth/storage/user-storage.service';


const BASIC_URL ="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  userStorageService: any;

  constructor( private http:HttpClient) { }

  addCategory(categoryDto:any): Observable<any> {
  return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getAllCategories(): Observable<any> {
  return this.http.get(BASIC_URL + 'api/admin', {
    headers: this.createAuthorizationHeader(),
  })
}

addProduct(productDto:any): Observable<any> {
  return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
    headers: this.createAuthorizationHeader(),
  })
}

updateProduct(productId:any, productDto:any): Observable<any> {
  return this.http.put(BASIC_URL + `api/admin/product/${productId}`, productDto, {
    headers: this.createAuthorizationHeader(),
  })
}

getAllProducts(): Observable<any> {
  return this.http.get(BASIC_URL + 'api/admin/products', {
    headers: this.createAuthorizationHeader(),
  })
}

getProductById(productId): Observable<any> {
  return this.http.get(BASIC_URL + `api/admin/product/${productId}`, {
    headers: this.createAuthorizationHeader(),
  })
}

getAllProductsByName(name : any): Observable<any> {
  return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
    headers: this.createAuthorizationHeader(),
  })
}

deleteProduct(productId: any): Observable<any> {
  console.log(`Tentative de suppression du produit avec ID: ${productId}`); // Log avant l'appel

  return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
    headers: this.createAuthorizationHeader(),
  }).pipe(
    tap(() => console.log(`Produit ${productId} supprimé avec succés`)), // Log en cas de succès
    catchError((error) => {
      console.error(`Erreur lors de la suppression du produit ${productId}:`, error); // Log en cas d'erreur
      return throwError(() => error); // Propage l'erreur
    })
  );
}


private createAuthorizationHeader(): HttpHeaders{ 
  return new HttpHeaders().set(
    'Authorization', 'Bearer ' + UserStorageService.getToken()
  )
}




}
