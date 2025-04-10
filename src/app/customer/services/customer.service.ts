import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from 'src/app/services/auth/storage/user-storage.service';


const BASIC_URL ="http://localhost:8080/";
 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    })
  }
  
  getAllProductsByName(name : any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId: number): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };

    return this.http.post(`${BASIC_URL}api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        this.snackBar.open('Error adding product to cart', 'Close', {
          duration: 5000
        });
        return throwError(() => error);
      })
    );
  }



  getCartByUserId(): Observable<any> {
  const userId = UserStorageService.getUserId()

    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    })}



  private createAuthorizationHeader(): HttpHeaders{ 
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}

