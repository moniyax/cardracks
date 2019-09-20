export const loadState = () => {
    try {
        const appState = localStorage.getItem('appState');
        if (appState === null) {
            return undefined;
        }
        return JSON.parse(appState)
    } catch (err) {
        return undefined;
    }
}

export const saveState = appState => {
    try {
        const serializedState = JSON.stringify(appState)
        localStorage.setItem('appState', serializedState);
    } catch (err) {
        new Error(err);
    }
}
