import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './login.component';
import { ElfComponent } from '../login/elf/elf.component';
import { FamilyComponent } from '../login/family/family.component';
import { ForgotPasswordComponent } from './elf/forgot-password/forgot-password.component';
import { ForgotPasswordForFamilyComponent } from './family/forgot-password/forgot-password.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordForAdminComponent } from './admin/forgot-password-for-admin/forgot-password-for-admin.component';


const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'elf', component: ElfComponent},
  { path: 'elf/forgot-password', component: ForgotPasswordComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'family/forgot-password', component: ForgotPasswordForFamilyComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/forgot-password', component: ForgotPasswordForAdminComponent },


];

@NgModule({
  declarations: [
    LogInComponent,
    ElfComponent,
    ForgotPasswordComponent,
    FamilyComponent,
    ForgotPasswordForFamilyComponent,
    AdminComponent,
    ForgotPasswordForAdminComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class LogInModule { }
