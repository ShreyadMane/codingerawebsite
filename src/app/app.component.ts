declare let $: any;
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './common/footer/footer.component';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterOutlet, Router, NavigationCancel, NavigationEnd, RouterLink } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink, NavbarComponent, FooterComponent, NgxScrollTopModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {

    title = 'Plaxa - Angular 17 MUI Blockchain & AI Agency Template';
    routerSubscription: any;
    location: any;

    constructor(
        public router: Router
    ) {}

    // ngOnInit
    ngOnInit(){
        this.recallJsFuntions();
    }

    // recallJsFuntions
    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

}