export const StorageService = {
    load,
    store,
    remove,
};

function load(key) {
    const storedItem = JSON.parse(sessionStorage.getItem(key));
    return storedItem;
}

function store(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
    sessionStorage.removeItem(key);
}
