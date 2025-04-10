import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm! : FormGroup;

  constructor(private adminService: AdminService,
  private fb : FormBuilder,
  private snackBar: MatSnackBar,){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
title: [null, [Validators.required]]})
}
    getAllProducts() {
      this.products = [];
      this.adminService.getAllProducts().subscribe( res => {
        res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
        });
        console.log(this.products)
      })
    }
    submitForm(){
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
      this.adminService.getAllProductsByName(title).subscribe( res => {
        res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
        });
        console.log(this.products)
      })
  }

  deleteProduct(productId: any){
    this.adminService.deleteProduct(productId).subscribe(
      res => {
        console.log("Réponse reçue :", res); // ✅ Vérifier ce que l'API retourne
    
        if (!res || res.body === null) {  // ✅ Vérification plus sûre
          this.snackBar.open('Product Deleted successfully!', 'Close', {
            duration: 5000
          });
          this.getAllProducts(); // ✅ Rafraîchir la liste après suppression
        } else {
          // ✅ Vérifie que `res.message` existe bien, sinon affiche un message générique
          const errorMessage = res.message ? res.message : "Une erreur s'est produite";
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            panelClass: 'error-snackBar'
          });
        }
      },
      error => {
        console.error("Erreur lors de la suppression :", error);
        this.snackBar.open("Échec de la suppression du produit", "Fermer", {
          duration: 5000,
          panelClass: "error-snackBar"
        });
      }
    );
    

  }}
