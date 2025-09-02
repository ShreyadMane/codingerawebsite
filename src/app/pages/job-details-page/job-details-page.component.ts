import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-job-details-page',
    standalone: true,
    imports: [RouterLink, PageBannerComponent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './job-details-page.component.html',
    styleUrl: './job-details-page.component.scss'
})
export class JobDetailsPageComponent {}