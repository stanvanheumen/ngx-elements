export class TranslateConfig {
    production: boolean = false;
    dictionary: Translation[] = [];
}

export interface Translation {

    /**
     * The browser languages that should activate this data set.
     */
    languages: string[];

    /**
     * The data JSON.
     */
    data: object;

    /**
     * The name of the translation.
     */
    name: string;

}