import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttrComponent } from './attr/attr.component';
import { EventComponent } from './event/event.component';

@NgModule({
    declarations: [
        AppComponent,
        AttrComponent,
        EventComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
