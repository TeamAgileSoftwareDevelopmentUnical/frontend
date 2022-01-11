import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found/not-found.page';
import { AuthRoleGuard } from './security/auth-role.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'payment-cancel',
    loadChildren: () => import('./payment-cancel/payment-cancel.module').then( m => m.PaymentCancelPageModule)
  },
  {
    path: 'all-product',
    loadChildren: () => import('./product/all-product/all-product.module').then( m => m.AllProductPageModule),
    canActivate:[AuthRoleGuard],
    data:{
      role:'Seller'
    }
  },
  {
    path: 'upload-product',
    loadChildren: () => import('./product/upload-product/upload-product.module').then( m => m.UploadProductPageModule),
    canActivate:[AuthRoleGuard],
    data:{
      role:'Seller'
    }

  },
  {
    path: 'update-product/:productId',
    loadChildren: () => import('./product/update-product/update-product.module').then( m => m.UpdateProductPageModule),
    canActivate:[AuthRoleGuard],
        data:{
        role:'Seller'
      }
    },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule),
    canActivate:[AuthRoleGuard],
    data:{
      role: 'Customer'
    }
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthRoleGuard],
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule),
    canActivate:[AuthRoleGuard],
    data: {
      role: 'Customer'
    }
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


  {
    path: 'stand-products/:category',
    loadChildren: () => import('./stand-products/stand-products.module').then( m => m.StandProductsPageModule)
  },

  {
    path: 'purchases/:id',
    loadChildren: () => import('./purchases/purchases.module').then( m => m.PurchasesPageModule)
  },
  { path: '404', component: NotFoundPage },
  { path: '**', redirectTo: '404' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
