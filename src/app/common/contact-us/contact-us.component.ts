import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import emailjs from '@emailjs/browser';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [RouterLink, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {

ngOnInit(): void {
    emailjs.init("lMEPJC_3CCRUmLWtU");
}
    contactForm: FormGroup = this.fb.group({
        to_name: ["Admin"],
        from_name: ["", [Validators.required, Validators.minLength(2)]],
        from_email: ["", [Validators.required, Validators.email]],
        subject: ["", [Validators.required, Validators.minLength(5)]],
        message: ["", [Validators.required, Validators.minLength(2)]],
    })

    constructor(private fb: FormBuilder) {
 
     }

     async send() {

     
        try {
            // Send email using emailjs
            let response = await emailjs.send("service_qpjsksy", "template_hdyh875", {
                to_name: this.contactForm.value.to_name,
                from_name: this.contactForm.value.from_name,
                from_email: this.contactForm.value.from_email,
                subject: this.contactForm.value.subject,
                message: this.contactForm.value.message,
            });
    
            // Check if the email sending was successful
            if (response.status === 200) {
                alert("Message has been sent successfully!");
                this.contactForm.reset(); // Reset the form after successful submission
            } else {
                alert("Failed to send the message. Please try again later.");
            }
        } catch (error) {
            // Handle any errors that occur during the API call
            console.error("Error sending email:", error);
            alert("An error occurred while sending the message. Please try again.");
        }
    }
    

}

