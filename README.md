
# Voice Translator

This project does voice translation from one language to another.

The data flow is as follows:

 1. Record user's voice using [capacitor's speech recognition plugin](https://www.npmjs.com/package/@capacitor-community/speech-recognition).
 2. Grab the recognized text and send it to Google Translate.
 3. Get the translated text and send it to Open Ai's [text to speech API](https://platform.openai.com/docs/guides/text-to-speech).
 4. Play the audio locally and then delete it.

Other dependencies:

 - [Flag Icons](https://www.npmjs.com/package/flag-icons).

# Dev Instructions

Replace the `openAikey` and the `googleTranslateApiKey` with your own keys in the `environment.ts` and `environment.prod.ts` files.

# How to run

Web

Run `npm install` and `npm run start` to see it on the web, keep in mind the [capacitor's speech recognition plugin](https://www.npmjs.com/package/@capacitor-community/speech-recognition) won't work in the web so you wont be able to actually record voice.

iOS

Run `ionic build`, `npx cap sync ios`, `npx cap open ios` and run it in your phone from Xcode.

Android

Run `ionic build`, `npx cap sync android`, `npx cap open android` and run it in your phone from Android Studio.

