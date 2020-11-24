import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyConverterComponent } from './view/currency-converter/currency-converter.component';
import { LengthConverterComponent } from './view/length-converter/length-converter.component';
import { RouterModule } from '@angular/router';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { HandsetService } from './services/handset/handset.service';
import { HttpService } from './services/http/http.service';
import { ConverterService } from './services/conversion/converter.service';
import { MainNavComponent } from './view/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material/sort';
import { LengthPipe } from './pipes/length.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CurrencyConverterComponent,
    LengthConverterComponent,
    DateAgoPipe,
    LengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forRoot([{
      path: '',
      component: CurrencyConverterComponent
    },
    {
      path: 'currency',
      component: CurrencyConverterComponent
    },
    {
      path: 'length',
      component: LengthConverterComponent
    }
  ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [LocalstorageService, HandsetService, HttpService, ConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
