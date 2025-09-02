import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-features',
    standalone: true,
    imports: [NgFor, RouterLink,MatButtonModule],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss'
})
export class FeaturesComponent {

    featureBox = [
        {
            icon: `flaticon-abstract-2`,
            title: `Web Design and Development`,
            desc: `
Your website is the foundation of your online presence, building credibility and showcasing your brand. At Coding Era, we craft custom web applications and designs to meet your unique needs.`
        },
        {
            icon: `flaticon-abstract`,
            title: `Software Development
`,
            desc: `We create intuitive software applications for complex domains, offering desktop and web development tailored to your needs. Our services include professional and affordable software development and design solutions.`
        },
        {
            icon: `flaticon-globe`,
            title: `Mobile Application Development`,
            desc: `Android is most popular in mobile technology and highly used by people. So We provide Mobile apps development by knowing the explicitly huge demand from the users.`
        }
    ]

}