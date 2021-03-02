import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmationService} from 'primeng-lts/api';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './security/auth.guard';
import { JwtInterceptor } from './security/jwt.interceptor';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng-lts/button';
import { SidebarModule } from 'primeng-lts/sidebar';
import { SlideMenuModule } from 'primeng-lts/slidemenu';
import { MegaMenuModule } from 'primeng-lts/megamenu';
import { SideBarItemComponent } from './components/side-bar-item/side-bar-item.component';
import { AccordionModule } from 'primeng-lts/accordion';



@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    SideBarComponent,
    SideBarItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      message: 'Carregando',
      delayStop: 500
    }),
    FormsModule,
    ButtonModule,
    SidebarModule,
    SlideMenuModule,
    MegaMenuModule,
    AccordionModule
  ],
  providers: [
    ConfirmationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
