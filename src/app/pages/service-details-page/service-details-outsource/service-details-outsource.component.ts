import { Component } from '@angular/core';

import { TestimonialsComponent } from '../../../common/testimonials/testimonials.component';

import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PageBannerComponent } from '../page-banner/page-banner.component';
@Component({
  selector: 'app-service-details-outsource',
  standalone: true,
  imports: [RouterLink,PageBannerComponent, NgFor,TestimonialsComponent],
  templateUrl: './service-details-outsource.component.html',
  styleUrl: './service-details-outsource.component.scss'
})
export class ServiceDetailsOutsourceComponent {
  featureBox = [
    {
        icon: `flaticon-abstract-3`,
        title: `Our History`,
        desc: `Our mission is to enhance business growth of our customers with creative design, application development and to deliver market defining high quality solutions that create value and reliable competitive advantage to customers around the globe.`
    },
    {
        icon: `flaticon-abstract`,
        title: `Our Mission`,
        desc: `Our mission is to enhance business growth of our customers with creative design, application development and to deliver market defining high quality solutions that create value and reliable competitive advantage to customers around the globe.`
    },
    {
        icon: `flaticon-atom`,
        title: `Our Vision`,
        desc: `
Digital transformation is essential for businesses in every industry. Adopting technology to streamline operations and engage customers is key to staying competitive and relevant in today's market.`
    }
]

}