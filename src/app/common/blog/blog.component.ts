import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [RouterLink, MatButtonModule, NgClass, NgIf],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

    constructor(
        public router: Router
    ) {}

}