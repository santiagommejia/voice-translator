
import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  constructor() {
  }

  async playWavFile(fileName: string): Promise<void> {
    const file = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    });
    const audio = new Audio('data:audio/wav;base64,' + file.data);
    return audio.play();
  }
  
  async deleteFile(fileName: string): Promise<void> {
    return Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data
    });
  }

  public async saveBlobToFile(blob: Blob, fileName: string): Promise<void> {
    const blobString: string = await this.getBlobString(blob);
    try {
      await Filesystem.writeFile({
        path: fileName,
        data: blobString,
        directory: Directory.Data,
      });
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  public convertArryBufferToBlob(arrayBuffer: ArrayBuffer, sampleRate: number = 44100): Blob {
    // Define WAV header constants
    const headerSize = 44; // 44-byte header
    const dataLength = arrayBuffer.byteLength;
    const totalLength = headerSize + dataLength;

    // Create buffer for the WAV file
    const wavBuffer = new ArrayBuffer(totalLength);
    const wavView = new DataView(wavBuffer);

    // Write WAV header
    wavView.setUint32(0, 0x52494646, true); // "RIFF" in little-endian
    wavView.setUint32(4, totalLength - 8, true); // Total file size - 8
    wavView.setUint32(8, 0x57415645, true); // "WAVE" in little-endian

    wavView.setUint32(12, 0x666D7420, true); // "fmt " in little-endian
    wavView.setUint32(16, 16, true); // Size of fmt chunk
    wavView.setUint16(20, 1, true); // Audio format (PCM)
    wavView.setUint16(22, 1, true); // Number of channels
    wavView.setUint32(24, sampleRate, true); // Sample rate
    wavView.setUint32(28, sampleRate * 2, true); // Byte rate (sample rate * channels * bytes per sample)
    wavView.setUint16(32, 2, true); // Block align (channels * bytes per sample)
    wavView.setUint16(34, 16, true); // Bits per sample

    wavView.setUint32(36, 0x64617461, true); // "data" in little-endian
    wavView.setUint32(40, dataLength, true); // Size of audio data

    // Write audio data to the buffer
    const dataView = new DataView(arrayBuffer);
    for (let i = 0; i < dataLength; i++) {
      wavView.setUint8(headerSize + i, dataView.getUint8(i));
    }

    // Create a Blob from the buffer
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }

  private getBlobString(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as string)
      };
      reader.readAsDataURL(blob);
    });
  }

}
