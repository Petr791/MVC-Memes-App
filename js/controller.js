class Controller {
    constructor() {
        // из model
        this.model = new Model({
            onMemesChange: this.handleModelMemesChange,
            onCurrentMemeIdChange: this.handleModelCurrentMemeIdChange,
            onTextTopChange: this.handleModelTextTopChange,
            onTextBottomChange: this.handleModelTextBottomChange,
            currentTextColor: this.handleModelTextColorChanged,
        });
        // из view
        this.view = new View({
            onMemChange: this.handleViewMemeChange,
            onTextTopChange: this.handleViewTextTopChange,
            onTextBottomChange: this.handleViewTextBottomChange,
            newTextColor: this.handleViewNewTextColorSet
        });
        // из api
        this.api = new API({});
    }

    // инициализация
    init() {
        // console.log('Инициализация приложения запущена!');
        this.api.getMemes()
            .then(data => {
                const memes = data.data.memes;
                const saccessStatus = data.success;
                // проверка ключа success
                if (saccessStatus === true) {
                    this.model.setMemes(memes);
                } else {
                    // Если значение ключа success не true
                    this.view.showErrorMessage(saccessStatus);
                }
            });
    }

    // передача массива мемов и текущего id для рендера селекта
    handleModelMemesChange = () => {
        // передаем массив мемов и текущий id для рендера
        this.view.renderMemesSelect(this.model.getMemes(), this.model.getCurrentMemeId());
    }


    // SelectChange шаг 2
    handleViewMemeChange = (id) => {
        this.model.setCurrentMemeId(id);
    }

    // SelectChange шаг 4
    // рендер превью
    handleModelCurrentMemeIdChange = () => {
        this.view.renderPreview(this.model.getPreview());
    }


    //TextСhange шаг 2
    handleViewTextTopChange = (text) => {
        this.model.setTextTop(text);
    }
    handleViewTextBottomChange = (text) => {
        this.model.setTextBottom(text);
    }

    // TextСhange шаг 4
    handleModelTextTopChange = () => {
        this.view.renderPreview(this.model.getPreview());
    }
    handleModelTextBottomChange = () => {
        this.view.renderPreview(this.model.getPreview());
    }

    // setNewColorText шаг 2
    handleViewNewTextColorSet = (newTextColor) => {
        this.model.setNewTextColor(newTextColor);
    }

    // setNewColorText шаг 4
    handleModelTextColorChanged = (currentTextColor) => {
        this.view.setNewColorText(currentTextColor);
    }
}