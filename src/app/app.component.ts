import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor() {
    this.initDummyLanguages();
  }

  initDummyLanguages() {
    const quickAccessLanguages = ['es-419', 'en-US', 'de-DE', 'it-IT', 'pt-BR', 'fr-FR'];
    sessionStorage.setItem('quickAccessLanguages', JSON.stringify(quickAccessLanguages))
  }


}
