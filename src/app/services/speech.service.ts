import { EventEmitter, Injectable } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognizedSpeech: EventEmitter<string> = new EventEmitter();

  constructor(public platform: Platform) { }

  public speechRecognitionAvailable: Promise<{ available: boolean }> = SpeechRecognition.available();

  public startSpeechRecognition(language: string) {
    SpeechRecognition.start({ language, partialResults: true, popup: false });
    SpeechRecognition.addListener('partialResults', (data: any) => {
			if (this.platform.is('ios')) {
				if (data.matches && data.matches.length > 0) {
					this.recognizedSpeech.emit(data.matches[0]);
				}
			} else if (this.platform.is('android')) {
				if(data.value && data.value.length > 0) {
					const text = data.value[0];
					this.recognizedSpeech.emit(text);
				}
			}
    });
  }

  stopSpeechRecognition(): void {
    SpeechRecognition.stop();
    SpeechRecognition.removeAllListeners();
  }

  public requestPermission = SpeechRecognition.requestPermission();

}
