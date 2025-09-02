import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-careers-page',
    standalone: true,
    imports: [RouterLink, PageBannerComponent, MatButtonModule],
    templateUrl: './careers-page.component.html',
    styleUrl: './careers-page.component.scss'
})
export class CareersPageComponent {}