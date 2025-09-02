import { Component } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-services-page',
    standalone: true,
    imports: [PageBannerComponent, RouterLink, MatButtonModule],
    templateUrl: './services-page.component.html',
    styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent {}