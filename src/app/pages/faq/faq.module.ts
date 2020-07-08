import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { AccordionModule } from 'ngx-accordion';

import { FaqComponent } from './faq.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: FaqComponent },
];

@NgModule({
  declarations: [
    FaqComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AccordionModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class FaqModule { }
