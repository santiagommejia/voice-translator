import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'translator.openai.starter',
  appName: 'Translator',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
