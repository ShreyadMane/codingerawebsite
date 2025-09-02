import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [RouterLink, CarouselModule, NgClass, NgIf],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {

    constructor(
        public router: Router
    ) {}

    // Owl Carousel
    testimonialsSlides: OwlOptions = {
		nav: false,
		margin: 25,
		dots: true,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='flaticon-chevron-1'></i>",
			"<i class='flaticon-chevron'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 1
			},
			695: {
				items: 2
			},
			755: {
				items: 1
			},
			825: {
				items: 2
			},
			1375: {
				items: 2
			}
		}
    }
    testimonialsSlidesTwo: OwlOptions = {
        items: 1,
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		animateOut: 'fadeOut',
        animateIn: 'fadeIn',
		autoplayHoverPause: true,
		navText: [
			"<i class='flaticon-left-arrow-1'></i>",
			"<i class='flaticon-right-arrow-1'></i>"
		]
    }

}