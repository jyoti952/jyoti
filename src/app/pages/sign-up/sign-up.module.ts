import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { ElfComponent } from '../sign-up/elf/elf.component';
import { FamilyComponent } from '../sign-up/family/family.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { from } from 'rxjs';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'elf', component: ElfComponent },
  { path: 'elf/verify', component: VerifyEmailComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'family/verify', component: VerifyEmailComponent },
];

@NgModule({
  declarations: [
    SignUpComponent,
    ElfComponent,
    VerifyEmailComponent,
    FamilyComponent,

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
export class SignUpModule { }
