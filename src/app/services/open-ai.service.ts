import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AudioService } from './audio.service';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: environment.openAikey, dangerouslyAllowBrowser: true });
export type VoiceType = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(
    private audioService: AudioService
  ) { }
  
  async textToSpeech(text: string, voice: VoiceType): Promise<Blob> {
    const response = await openai.audio.speech.create({ model: 'tts-1', voice, input: text, response_format: 'mp3' });
    const arrayBuffer = await response.arrayBuffer();
    return this.audioService.convertArryBufferToBlob(arrayBuffer);
  }
}
