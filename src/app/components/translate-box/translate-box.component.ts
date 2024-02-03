import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { getFlagIconClass, getCountry } from '../../utils';
import { EmitterService } from "src/app/services/emitter.service";

@Component({
	selector: "app-translate-box",
	templateUrl: "./translate-box.component.html",
	styleUrls: ["./translate-box.component.scss"]
})
export class TranslateBoxComponent implements OnInit, OnChanges {

	getFlagIconClass = getFlagIconClass;
	getCountry = getCountry;

	@Input() language: string = 'es-419';
	@Input() excludeLanguage: string = 'en-US';
	@Input() text: string = '';
	@Input() boxId: string = '';
	@Output() languageChange = new EventEmitter<{ boxId: string, language: string }>();
	fontSize: string = '36px';

	readonly quickAccessLanguages: string[] = JSON.parse(sessionStorage.getItem('quickAccessLanguages') || '[]');
	availableLanguages: string[] = this.quickAccessLanguages;

	constructor(private emitterService: EmitterService) {
	}

	ngOnInit() {
		this.emitterService.swapLanguages.subscribe((boxId: string, newText: string) => {
			if (boxId === this.boxId) {
				const excludedLanguage = this.excludeLanguage;
				this.excludeLanguage = this.language;
				this.language = excludedLanguage;
				this.text = newText;
				this.excludeFromAvailableLanguages(this.excludeLanguage);
			}
		});
		this.excludeFromAvailableLanguages(this.excludeLanguage);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['excludeLanguage']) {
			const newExcludeLanguage = changes['excludeLanguage'].currentValue;
			this.excludeFromAvailableLanguages(newExcludeLanguage);
		}
		if (changes['text']) {
			this.fontSize = this.getScaledFontSize(this.text);
		}
	}

	excludeFromAvailableLanguages(languageToExclude: string) {
		this.availableLanguages = this.quickAccessLanguages.filter((lang: string) => lang !== languageToExclude);
	}

	getScaledFontSize(text: string) {
		const fontSize: number = 36;
		const textLength = text.length;
		const scaledFontSize = Math.max(fontSize - Math.sqrt(textLength), 12);
		return `${scaledFontSize}px`;
	}

	onLanguageChange() {
		const payload = { boxId: this.boxId, language: this.language };
		this.languageChange.emit(payload);
	}

}