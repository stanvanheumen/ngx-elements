import {StorageService} from '../miscellaneous/localstorage.service';
import {Injectable, Optional} from '@angular/core';
import {TranslateConfig} from './translate.config';

export interface TranslateOptions {
    key: string;
    words: string[];
    translated?: boolean;
}

@Injectable()
export class TranslateService {

    // The token used in the storage.
    private readonly storageToken = '__NGX_CURRENT_LANGUAGE__';

    // The current language.
    private language: string;

    // The available languages.
    private defaultDictionary = 'en';
    private dictionary = [];

    constructor(private storage: StorageService,
                @Optional() private config: TranslateConfig) {
        // Retrieve the dictionary from the config.
        if (!this.config || !this.config.dictionary || this.config.dictionary.length === 0) {
            throw new Error('No dictionary was passed to the CoreModule; At least one language is required.');
        }

        // Save the dictionary.
        this.dictionary = this.config.dictionary;

        // Check if the languages are all correct if the application is in development mode.
        if (config.production && !this.valid()) {
            console.warn('LANGUAGE_EXCEPTION: The language files have been compared and they have not passed the validation.');
        }

        // Retrieve the current language.
        const language = this.storage.getString(this.storageToken);

        // Verify the language.
        const verifiedLanguage = this.verify(language);

        // Use the verified language.
        this.use(verifiedLanguage);
    }

    verify(language: string) {
        // Check if the language exists.
        if (language !== null && this.isLanguageSupported(language)) {
            return language;
        }

        // Fetch the browser language.
        let browserLanguage = this.getBrowserLanguage();

        // Check if the browsers language is supported in the system.
        if (!this.isLanguageSupported(browserLanguage)) {
            browserLanguage = this.defaultDictionary;
        }

        // If the browser language was not supported put one in the cookie.
        this.storage.setString(this.storageToken, browserLanguage);

        // Return the browser language.
        return browserLanguage;
    }

    use(language: string) {
        if (!this.isLanguageSupported(language)) {
            return;
        }

        this.language = language;
        this.storage.setString(this.storageToken, this.language);
    }

    instant(key: string | TranslateOptions) {
        return this.translate(key);
    }

    getLanguage() {
        return this.language;
    }

    getDictionary() {
        return this.dictionary;
    }

    translate(data: string | TranslateOptions) {
        // Validate if the language does exist in the dictionary, else throw an error.
        if (!this.isLanguageSupported(this.language)) {
            throw new Error(`LANGUAGE_EXCEPTION: The current language is not supported '${this.language}'`);
        }

        // Retrieve the entire dictionary object.
        const dictionary = this.getLanguageDictionary(this.language);

        // Check if the dictionary exists.
        // If not exists the language must be the default (English).
        if (typeof data === 'string') {
            if (dictionary) {
                if (!dictionary[data]) {
                    this.notify(`LANGUAGE_EXCEPTION: Key '${data}' was not found; ${data} was returned.`);
                    return data;
                }

                return dictionary[data];
            }

            return data;
        }

        if (typeof data === 'object') {
            if (dictionary) {
                let sentence = dictionary[data.key];
                if (!sentence) {
                    this.notify(`LANGUAGE_EXCEPTION: Key '${data.key}' was not found; ${data.key} was returned.`);
                    sentence = data.key;
                }

                const translated = data.translated === undefined && data.translated !== false;

                data.words.forEach(word => {
                    const translatedWord = translated ? this.translate(word) : word;
                    sentence = sentence.replace('%s', translatedWord.toLowerCase());
                });

                return sentence;
            }

            let sentence = data.key;
            data.words.forEach(word => sentence = sentence.replace('%s', word.toLowerCase()));
            return sentence;
        }

        this.notify('LANGUAGE_EXCEPTION: Something went wrong retrieving the translation.');
        return '';
    }

    private valid() {
        const array = [];

        this.dictionary.forEach(language => {
            if (!language.data) {
                return;
            }

            const data = this.getKeys(language.data);
            array.push(data);
        });

        const first = array[0] || [];

        return array.every(element => this.compare(first, element));
    }

    private getKeys(object: object, identifier: string = null) {
        const result = [];

        Object.keys(object).forEach(key => {
            const item = object[key];

            if (typeof item === 'object') {
                result.push(...this.getKeys(item, identifier ? (identifier + '.' + key) : key));
            } else {
                result.push(identifier ? (identifier + '.' + key) : key);
            }
        });

        return result;
    }

    private compare(first: string[], second: string[]) {
        if (first === second) {
            return true;
        }

        if (first === null || second === null) {
            return false;
        }

        let isValid = true;

        if (first.length !== second.length) {
            console.warn('The files have been compared and not every file has the same length.');
            isValid = false;
        }

        for (let index = 0; index < first.length; ++index) {
            if (first[index] !== second[index]) {
                isValid = false;
                console.warn(`Line ${index} did not equal the first language.json file; ${first[index]} !== ${second[index]}`);
            }
        }

        return isValid;
    }

    private getBrowserLanguage() {
        let language = null;

        // Check if the navigator exists.
        if (!navigator) {
            return language;
        }

        if (navigator.languages && navigator.languages.length) {
            language = navigator.languages[0];
        } else if (navigator['userLanguage']) {
            language = navigator['userLanguage'];
        } else {
            language = navigator.language;
        }

        return language;
    }

    private getLanguageDictionary(language: string) {
        for (let item of this.dictionary) {
            if (item.languages.indexOf(language) > -1) {
                return item.data;
            }
        }

        return null;
    }

    private isLanguageSupported(language: string) {
        for (let item of this.dictionary) {
            if (item.languages.indexOf(language) > -1) {
                return true;
            }
        }

        return false;
    }

    private notify(message: string) {
        if (this.config && this.config.production) {
            console.log(message);
            return;
        }
        throw new Error(message);
    }

}
