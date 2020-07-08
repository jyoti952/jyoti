import { Component, HostListener } from '@angular/core';
import { LyTheme2, ThemeVariables } from '@alyle/ui';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
const styles = (theme: ThemeVariables) => ({
  '@global': {
    body: { // Styles for `<body>` element
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly classes = this.theme.addStyleSheet(styles);
  constructor(
    private theme: LyTheme2
  ) { }


  ngOnInit(){
    ReactiveFormConfig.set({
      "validationMessage": {
          "url":  "Please enter valid link",
          "required":"This field is required",
      }
  });
  }
  
  onActivate(event) {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 0) {
      const htmlBody = document.querySelector('html,body');
      // htmlBody.classList.add('sticky');
    } else {
      const htmlBody = document.querySelector('html,body');
      // htmlBody.classList.remove('sticky');
    }
  }
}
