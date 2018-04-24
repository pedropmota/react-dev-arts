/**
 * Fake DB (Saving on localStorage)
 */
class DevArtsDb {

    static localStorageKey = 'my-saved-items'

    static getSavedItems() {
        const storedItems = localStorage.getItem(this.localStorageKey);

        const json = storedItems ? JSON.parse(storedItems) : [];
    
        return Promise.resolve(json); //Fake Promise, for fun! :)
    }

    static async addItem(item) { //The Promises make us want to use the cool async methods!
        const items = await this.getSavedItems();

        if (!items.some(i => i.devArtId === item.devArtId)) {
            items.push(item);

            localStorage.setItem(this.localStorageKey, JSON.stringify(items));
        }
        return Promise.resolve(items);
    }

    static async removeItem(item) {
        const items = (await this.getSavedItems()).filter(i => i.devArtId !== item.devArtId);

        localStorage.setItem(this.localStorageKey, JSON.stringify(items));

        return Promise.resolve(items);
    }

}


export default DevArtsDb;