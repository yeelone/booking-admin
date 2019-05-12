import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/injectable/authguard';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';
import { CustomMaterialModule } from './core/material.module';
import { LoginComponent } from './pages/login/login.component';
import { GraphQLModule } from './graphql.module';
import { CustomDirectiveModule } from './directive/directive.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    SharedModule,
    CustomMaterialModule,
    CustomDirectiveModule,
    GraphQLModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
