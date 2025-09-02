import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-what-we-do',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './what-we-do.component.html',
    styleUrl: './what-we-do.component.scss'
})
export class WhatWeDoComponent {}