import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {
  LyThemeModule,
  LY_THEME
} from '@alyle/ui';
/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { InterceptorsService } from './interceptors/interceptors.service';
import {WebcamModule} from 'ngx-webcam';
import { NgxLoadingModule } from 'ngx-loading';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OrderModule } from 'ngx-order-pipe';

// import {NgxImageCompressService} from 'ngx-image-compress';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
     // Animations
     BrowserAnimationsModule,
     // Set main theme
     LyThemeModule.setTheme('minima-light'),
     // Add components
     LyButtonModule,
     LyToolbarModule,
     LyResizingCroppingImageModule,
     WebcamModule,
     NgxLoadingModule.forRoot({}),
     Ng2SearchPipeModule,
     RxReactiveFormsModule,
     OrderModule,
    NgxEmojiPickerModule.forRoot()
  ],
  providers: [
    CookieService,
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    },
    Ng2Cable,
    Broadcaster,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
