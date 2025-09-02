import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-what-we-provide',
    standalone: true,
    imports: [RouterLink, MatButtonModule, NgIf, NgClass],
    templateUrl: './what-we-provide.component.html',
    styleUrl: './what-we-provide.component.scss'
})
export class WhatWeProvideComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}