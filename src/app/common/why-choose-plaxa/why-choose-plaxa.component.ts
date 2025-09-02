import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-why-choose-plaxa',
    standalone: true,
    imports: [RouterLink, MatButtonModule, NgClass, NgIf],
    templateUrl: './why-choose-plaxa.component.html',
    styleUrl: './why-choose-plaxa.component.scss'
})
export class WhyChoosePlaxaComponent {

    constructor(
        public router: Router
    ) {}

}