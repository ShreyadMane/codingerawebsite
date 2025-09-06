import { Routes } from '@angular/router';

export class AppModule { }
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeDemoTwoComponent } from './pages/home-demo-two/home-demo-two.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ServiceDetailsPageComponent } from './pages/service-details-page/service-details-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './pages/blog-details-page/blog-details-page.component';
import { CareersPageComponent } from './pages/careers-page/careers-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { ServiceDetailsMobileComponent } from './pages/service-details-page/service-details-mobile/service-details-mobile.component';
import { ServiceDetailsBlockchainComponent } from './pages/service-details-page/service-details-blockchain/service-details-blockchain.component';
import { ServiceDetailsAidevelopmentComponent } from './pages/service-details-page/service-details-aidevelopment/service-details-aidevelopment.component';
import { ServiceDetailsSocialComponent } from './pages/service-details-page/service-details-social/service-details-social.component';
import { ServiceDetailsIntershipComponent } from './pages/service-details-page/service-details-intership/service-details-intership.component';
import { ServiceDetailsSoftwareComponent } from './pages/service-details-page/service-details-software/service-details-software.component';
import { ServiceDetailsOutsourceComponent } from './pages/service-details-page/service-details-outsource/service-details-outsource.component';
import{ ConferenceComponent } from './common/conference/conference.component';
export const routes: Routes = [
    { path: '', component: HomeDemoTwoComponent },
    { path: 'index-2', component: HomeDemoTwoComponent },
    { path: 'about-us', component: AboutUsPageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'service-details', component: ServiceDetailsPageComponent },
    { path: 'careers', component: CareersPageComponent },
    { path: 'job-details', component: JobDetailsPageComponent },
    { path: 'blog', component: BlogPageComponent },
    { path: 'blog-details', component: BlogDetailsPageComponent },
    { path: 'contact-us', component: ContactUsPageComponent },
    { path: 'mobile', component: ServiceDetailsMobileComponent },
    { path: 'aidev', component: ServiceDetailsAidevelopmentComponent },
    { path: 'blockchain', component: ServiceDetailsBlockchainComponent },
    { path: 'social', component: ServiceDetailsSocialComponent },
    { path: 'software', component: ServiceDetailsSoftwareComponent },
    { path: 'intership', component: ServiceDetailsIntershipComponent },
    { path: 'contact-us', component: ContactUsPageComponent },
    { path: 'outsource', component: ServiceDetailsOutsourceComponent },
   { 
  path: 'conference', component:ConferenceComponent
},
    
    { path: '**', component: NotFoundComponent }
];