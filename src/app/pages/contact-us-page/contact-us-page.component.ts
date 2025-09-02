import { Component } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ContactUsComponent } from '../../common/contact-us/contact-us.component';
import { LocationsComponent } from '../../common/locations/locations.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-contact-us-page',
    standalone: true,
    imports: [PageBannerComponent, LocationsComponent, ContactUsComponent, RouterLink],
    templateUrl: './contact-us-page.component.html',
    styleUrl: './contact-us-page.component.scss'
})
export class ContactUsPageComponent {}