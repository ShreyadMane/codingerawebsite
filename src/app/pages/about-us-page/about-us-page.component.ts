import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { WhyChoosePlaxaComponent } from '../../common/why-choose-plaxa/why-choose-plaxa.component';
import { FeaturesComponent } from '../../common/features/features.component';


import { ContactUsComponent } from '../../common/contact-us/contact-us.component';


@Component({
    selector: 'app-about-us-page',
    standalone: true,
    imports: [RouterLink, PageBannerComponent, WhyChoosePlaxaComponent, FeaturesComponent,  ContactUsComponent],
    templateUrl: './about-us-page.component.html',
    styleUrl: './about-us-page.component.scss'
})
export class AboutUsPageComponent {}