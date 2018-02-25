import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

    getString(key: string) {
        const storage = this.getLocalStorage();

        if (!storage) {
            return null;
        }

        return storage.getItem(key);
    }

    getObject(key: string) {
        try {
            return JSON.parse(this.getString(key));
        } catch (error) {
            return null;
        }
    }

    setString(key: string, value: string) {
        const storage = this.getLocalStorage();

        if (!storage) {
            return;
        }

        return storage.setItem(key, value);
    }

    setObject(key: string, value: object) {
        this.setString(key, JSON.stringify(value));
    }

    delete(key: string) {
        const storage = this.getLocalStorage();

        if (!storage) {
            return;
        }

        return storage.removeItem(key);
    }

    private getLocalStorage() {
        return (typeof window !== 'undefined') ? window.localStorage : null;
    }

}
