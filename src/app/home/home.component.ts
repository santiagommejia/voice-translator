import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { OpenAIService, VoiceType } from '../services/open-ai.service';
import { TranslateService } from '../services/translate.service';
import { SpeechService } from '../services/speech.service';
import { Subscription, tap } from 'rxjs';
import { ActionSheetController, GestureController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  readonly UPPER_BOX: string = 'UPPER_BOX';
  readonly BOTTOM_BOX: string = 'BOTTOM_BOX';
  origin = { language: 'es-419', text: '' };
  destination = { language: 'en-US', text: '' };
  isRecordingAudio = false;
  voice: VoiceType = 'echo';
  originTextSubscription: Subscription = new Subscription();
  duration: { seconds: number, interval: any } = { seconds: 0, interval: null };
  @ViewChild('recordButton', { read: ElementRef }) recordButton!: ElementRef;

  constructor(
    private gestureController: GestureController,
    private audioService: AudioService,
    private openAI: OpenAIService,
    private translateService: TranslateService,
    private speechService: SpeechService,
    private emitterService: EmitterService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.speechService.requestPermission;
  }

  ngAfterViewInit(): void {
    const longPress = this.gestureController.create({
      el: this.recordButton.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: ev => {
        console.log('long-press start');
        Haptics.impact({ style: ImpactStyle.Light })
        this.duration.seconds = 0;
        this.duration.interval = setInterval(() => this.duration.seconds++, 1000);
        this.startRecording();
      },
      onEnd: ev => {
        console.log('long-press end');
        this.isRecordingAudio = false;
        setTimeout(() => {
          this.stopRecording();
          clearInterval(this.duration.interval);
          Haptics.impact({ style: ImpactStyle.Light })
        }, 1000); // timeout to fix last words not being recognized
      }
    }, true);
    longPress.enable();
  }

  async startRecording() {
    const { available } = await this.speechService.speechRecognitionAvailable;
    if (available) {
      this.isRecordingAudio = true;
      this.speechService.startSpeechRecognition(this.origin.language);
      this.originTextSubscription = this.speechService.recognizedSpeech.pipe(tap((text: string) => this.origin.text = text)).subscribe();
    }
  }

  async stopRecording() {
    this.originTextSubscription.unsubscribe();
    this.speechService.stopSpeechRecognition();
    const from = this.getLanguageCodePrefix(this.origin.language);
    const to = this.getLanguageCodePrefix(this.destination.language);
    const translatedText = await this.translateService.translate(this.origin.text, from, to);
    this.destination.text = translatedText;
    this.convertTextToSpeach(translatedText);
  }

  async convertTextToSpeach(text: string) {
    const fileName = `audio_${new Date().getTime()}.wav`
    const blob: Blob = await this.openAI.textToSpeech(text, this.voice);
    await this.audioService.saveBlobToFile(blob, fileName);
    await this.audioService.playWavFile(fileName);
    await this.audioService.deleteFile(fileName);
  }

  languageChangeEvent(payload: { boxId: string, language: string }) {
    if (payload.boxId === this.UPPER_BOX) {
      this.origin.language = payload.language;
    } else {
      this.destination.language = payload.language;
    }
  }

  swapLanguages() {
    this.emitterService.triggerSwapLanguages(this.UPPER_BOX, this.destination.text);
    this.emitterService.triggerSwapLanguages(this.BOTTOM_BOX, this.origin.text);
    const originLanguage = this.origin.language;
    this.origin.language = this.destination.language;
    this.destination.language = originLanguage;
    const originText = this.origin.text;
    this.origin.text = this.destination.text;
    this.destination.text = originText;
  }

  async presentVoiceSelector() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar Voz',
      buttons: [
        { text: 'Alloy', data: 'alloy' },
        { text: 'Echo', data: 'echo' },
        { text: 'Fable', data: 'fable' },
        { text: 'Onyx', data: 'onyx' },
        { text: 'Nova', data: 'nova' },
        { text: 'Shimmer', data: 'shimmer' },
        { text: 'Cancelar', role: 'cancel', data: { action: 'cancel' } },
      ],
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
    this.voice = !role ? data : this.voice;    
  }

  private getLanguageCodePrefix(language: string): string {
    return language.substring(0, 2);
  }

}