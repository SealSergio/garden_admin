export const getCurrentMode = (): string | null => {
    const currentMode = localStorage.getItem('color-mode');
    console.log(currentMode)
    if (currentMode === 'dark-mode' || currentMode === 'light-mode') {
        return currentMode;
    } else {
        return null;
    }
}

export const setNewMode = (): void => {
    localStorage.setItem(
        'color-mode',
        (getCurrentMode() === 'dark-mode' ? 'light-mode' : 'dark-mode')
    );

    document.documentElement.classList.toggle('dark-mode');
}

export const setDefaultMode = (): void => {
    if (getCurrentMode() === null) {
        setNewMode();
    };
}
