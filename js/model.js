class Model {
    constructor({
        onCurrentMemeIdChange,
        onMemesChange,
        onTextTopChange,
        onTextBottomChange,
        currentTextColor

    }) {
        this.memes = [];
        this.currentMemeId = null;
        this.textTop = 'Нельзя просто так';
        this.textBottom = 'Взять и...';

        // передача в конструктор
        this.onCurrentMemeIdChange = onCurrentMemeIdChange;
        this.onMemesChange = onMemesChange;
        this.onTextTopChange = onTextTopChange;
        this.onTextBottomChange = onTextBottomChange;
        this.currentTextColor = currentTextColor;

    }

    // получение массива мемов
    getMemes() {
        return this.memes;
    }

    // запись массива мемов
    setMemes(memes) {
        this.memes = memes;
        this.currentMemeId = memes[28].id;
        this.onMemesChange();
        this.onCurrentMemeIdChange();
    }

    // SelectChange шаг 3
    //получение и изменение id
    setCurrentMemeId(currentMemeId) {
        this.currentMemeId = currentMemeId;
        // передача нового id в controller
        this.onCurrentMemeIdChange();
    }

    // получаем текущий id
    // используем id для getCurrentMeme()
    getCurrentMemeId() {
        return this.currentMemeId;
    }

    //TextСhange шаг 3. Установка верхнего текста
    setTextTop(text) {
        this.textTop = text;
        this.onTextTopChange();
    }

    //TextСhange шаг 3. Установка нижнего текста
    setTextBottom(text) {
        this.textBottom = text;
        this.onTextBottomChange();
    }

    // получение текущего мем объекта
    getPreview = () => {
        return {
            textTop: this.textTop,
            textBottom: this.textBottom,
            url: this.getCurrentMeme().url
        };
    }

    // текущий мем объект
    getCurrentMeme() {
            let currentMeme = null;
            this.memes.forEach(meme => {
                if (meme.id === this.getCurrentMemeId()) {
                    currentMeme = meme;
                }
            });
            return currentMeme;
        }
        // установка нового цвета текста
    setNewTextColor(newTextColor) {
        const newColor = newTextColor;
        this.currentTextColor(newColor);
    }
}
