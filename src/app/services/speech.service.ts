import { EventEmitter, Injectable } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognizedSpeech: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public speechRecognitionAvailable: Promise<{ available: boolean }> = SpeechRecognition.available();

  public startSpeechRecognition(language: string) {
    SpeechRecognition.start({ language, partialResults: true, popup: false });
    SpeechRecognition.addListener('partialResults', (data: any) => {
			if (data.matches && data.matches.length > 0) {
				this.recognizedSpeech.emit(data.matches[0]);
			}
    });
  }

  stopSpeechRecognition(): void {
    SpeechRecognition.stop();
    SpeechRecognition.removeAllListeners();
  }

  public requestPermission = SpeechRecognition.requestPermission();

}
