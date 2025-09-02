import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-locations',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './locations.component.html',
    styleUrl: './locations.component.scss'
})
export class LocationsComponent {

    locationBox = [
        {
            title: `Email Here`,
            location: `career@codingera.comCall Here`,
            phoneNumber: `+91-9970611896`
        },
        {
            title: `Location Here`,
            location: `101,Malhar heights, Anand Park, Thakar Nagar Road, Behind Blue Ridge Mann Hinjewadi 411057`,
            phoneNumber: `+91-9970611896`
        },
        {
            title: `Call Here`,
            location: ``,
            phoneNumber: `+91-9970611896`
        }
    ]

}