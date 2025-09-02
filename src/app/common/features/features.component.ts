import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [NgFor, RouterLink, NgClass, NgIf],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss'
})
export class FeaturesComponent {

    featureBox = [
        {
            icon: `flaticon-abstract`,
            title: `Our History`,
            desc: `Our mission is to enhance business growth of our customers with creative design, application development and to deliver market defining high quality solutions that create value and reliable competitive advantage to customers around the globe.`
        },
        {
            icon: `flaticon-abstract-1`,
            title: `Our Mission`,
            desc: `Our mission is to enhance business growth of our customers with creative design, application development and to deliver market defining high quality solutions that create value and reliable competitive advantage to customers around the globe.`
        },
        {
            icon: `flaticon-abstract-3`,
            title: `Our Vision`,
            desc: `Digital transformation is essential for businesses in every industry. Adopting technology to streamline operations and engage customers is key to staying competitive and relevant in today's market.`
        }
    ]

    constructor(
        public router: Router
    ) {}

}