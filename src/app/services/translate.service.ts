import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import translate from 'translate';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }

  async translate(text: string, from: string, to: string): Promise<string> {
    const options = { to, from, key: environment.googleTranslateApiKey }
    return await translate(text, options);
  }
}
