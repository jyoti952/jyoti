import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendService } from 'src/app/services/send.service';
@Component({
  selector: 'app-onboarding-family-nav',
  templateUrl: './onboarding-family-nav.component.html',
  styleUrls: ['./onboarding-family-nav.component.scss']
})
export class OnboardingFamilyNavComponent implements OnInit {

  onboardingFamilyMenuItems = [
    { label: 'Code of Conduct', link: '/onboarding/family/' },
    { label: 'Santa Letter', link: '/onboarding/family/santa-letter' },
    { label: 'Profile Photo', link: '/onboarding/family/profile-information' },
    { label: 'Amazon Wishlist Link', link: '/onboarding/family/amazon-wishlist' },
    { label: 'Family Information', link: '/onboarding/family/family-info' },
    { label: 'Choose Location', link: '/onboarding/family/location' },
    { label: 'Budget & Organizations', link: '/onboarding/family/budget-organization' },
  ];

  constructor(private send:SendService) { }

  public event:Subscription

  ngOnInit() {
    {
      this.event = this.send.currentMessage.subscribe(message => {
      //console.log('subscription',this.event)
      });
    }
  }

}
