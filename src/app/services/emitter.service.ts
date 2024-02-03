import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmitterService {

    swapLanguages = new EventEmitter<{boxId: string, newText: string}>();

    triggerSwapLanguages(boxId:string, newText: string) {
        this.swapLanguages.emit({boxId, newText});
    }
}