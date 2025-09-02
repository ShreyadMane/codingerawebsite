import { Component } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-page',
    standalone: true,
    imports: [RouterLink, PageBannerComponent],
    templateUrl: './blog-page.component.html',
    styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent {}