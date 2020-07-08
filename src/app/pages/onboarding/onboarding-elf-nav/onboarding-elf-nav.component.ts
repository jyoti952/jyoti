import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendService } from 'src/app/services/send.service';

@Component({
  selector: 'app-onboarding-elf-nav',
  templateUrl: './onboarding-elf-nav.component.html',
  styleUrls: ['./onboarding-elf-nav.component.scss']
})
export class OnboardingElfNavComponent implements OnInit {

  onboardingElfMenuItems = [
    { label: 'Code of conduct', link: '/onboarding/elf/' },
    { label: 'Profile Photo', link: '/onboarding/elf/profile-photo' },
    { label: 'Anonymous to the family', link: '/onboarding/elf/anonymous-family' },
    { label: 'Family Preferences', link: '/onboarding/elf/family-preferences' },
    { label: 'Location', link: '/onboarding/elf/location' },
    { label: 'Budget', link: '/onboarding/elf/budget' },
    { label: 'Organisations', link: '/onboarding/elf/organisations' },
  ]

  constructor(private send:SendService) { }

  public event:Subscription
  
  ngOnInit() {
    this.event = this.send.currentMessage.subscribe(message => {
   // console.log('subscription',this.event)
    });
  }
 
}
