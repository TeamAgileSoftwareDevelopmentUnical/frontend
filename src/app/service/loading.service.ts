import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean;

  constructor(private loadingController: LoadingController) { }

  async showLoading(message?: string): Promise<void>{
    this.isLoading = true;
    this.loadingController.create({
      message: message? message:'Please wait...'
    }).then(loader => {
      loader.present().then(()=>{
        if (!this.isLoading){
          loader.present();
        }
      });
    });
  }

  async hideLoading(): Promise<void>{
    this.isLoading = false;
    this.loadingController.getTop().then(loader=>{
      if (loader){
        loader.dismiss();
      }
    });
  }
}
