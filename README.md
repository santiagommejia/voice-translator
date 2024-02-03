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
