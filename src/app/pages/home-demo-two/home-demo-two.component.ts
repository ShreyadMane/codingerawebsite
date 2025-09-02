import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { LocationsComponent } from './locations/locations.component';
import { FeaturesComponent } from './features/features.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WhatWeProvideComponent } from './what-we-provide/what-we-provide.component';

@Component({
    selector: 'app-home-demo-two',
    standalone: true,
    imports: [BannerComponent, LocationsComponent, FeaturesComponent, ContactUsComponent, BlogComponent, AboutUsComponent, WhatWeProvideComponent],
    templateUrl: './home-demo-two.component.html',
    styleUrl: './home-demo-two.component.scss'
})
export class HomeDemoTwoComponent { }