import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { ConversationsComponent } from './conversations.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgxLoadingModule } from 'ngx-loading';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
const routes: Routes = [
  { path: '', component: ConversationsComponent,canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    ConversationsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgxLoadingModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgxEmojiPickerModule.forRoot()
  ],
  exports: [RouterModule],
})
export class ConversationsModule { }
