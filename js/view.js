class View {
    constructor({
        onMemChange,
        onTextTopChange,
        onTextBottomChange,
        newTextColor
    }) {
        // работа view с элементами на странице
        this.topTextNode = document.getElementById('preview-top-text');
        this.bottomTextNode = document.getElementById('preview-bottom-text');
        this.imageBoxNode = document.getElementById('preview-img-box');
        this.imageNode = document.getElementById('preview-img');
        this.selectNode = document.querySelector('#settings-select');
        this.inputTopTextNode = document.querySelector('#input-top-text');
        this.inputBottomTextNode = document.querySelector('#input-bottom-text');
        this.selectWrapperNode = document.querySelector('#settings-select-wrapper');
        this.colorPickerNode = document.getElementById('colorPicker');

        //передача в конструктор
        this.onMemChange = onMemChange;
        this.onTextTopChange = onTextTopChange;
        this.onTextBottomChange = onTextBottomChange;
        this.newTextColor = newTextColor;

        // обработчики событий 
        // при выборе цвета
        this.colorPickerNode.addEventListener('input', this._handleСhangeTextColor);
        this.colorPickerNode.addEventListener('change', this._handleСhangeTextColor);
        // при изменении в инпутах
        this.inputTopTextNode.addEventListener('input', this._handleTopTextСhange);
        this.inputBottomTextNode.addEventListener('input', this._handleBottomTextСhange);
        // при выборе мема
        this.selectNode.addEventListener('change', this._hendleSelectChange);
        // при нажатии селект
        this.selectWrapperNode.addEventListener('click', this._rotateSelectArrow);
    }

    // рендер превью
    renderPreview(preview) {
        const url = preview.url;
        const textTop = preview.textTop;
        const textBottom = preview.textBottom;
        this.topTextNode.innerText = textTop;
        this.bottomTextNode.innerText = textBottom;
        // если используется тег img
        //this.imageNode.src = url;
        // если используется фоновое изображение
        this.imageBoxNode.style.backgroundImage = `url(${url})`;
    }

    // рендер селекта
    renderMemesSelect(memes, currentMemeId) {
        let arr = memes;
        // ограничение количества загружаемых мемов
        const arrSlice = arr.slice(0, 100);
        arrSlice.forEach(meme => {
            const id = meme.id;
            const name = meme.name;

            const optionNode = document.createElement('option');
            optionNode.setAttribute('value', id);
            optionNode.innerText = name;
            if (id === currentMemeId) {
                optionNode.setAttribute('selected', true);
            }
            this.selectNode.appendChild(optionNode);
            //this.selectNode.prepend(optionNode);
        });
    }

    // SelectChange шаг 1
    _hendleSelectChange = () => {
        const id = this.selectNode.value;
        this.onMemChange(id);
    }

    // TextСhange шаг 1
    _handleTopTextСhange = (event) => {
        // проверка длины
        /*    const textTop = event.target.value;
           const maxLength = 30;
           if (textTop.length > maxLength) {
               this.inputTopTextNode.value = this.inputTopTextNode.value.substring(0, maxLength);
               alert(`В это поле можно ввести не более ${maxLength} символов!`);
           } else {
               this.onTextTopChange(event.target.value);
           } */
        this.onTextTopChange(event.target.value);
    }

    // TextСhang шаг 1
    _handleBottomTextСhange = (event) => {
        // проверка длины
        /*   const textBottom = event.target.value;
          const maxLength = 30;
          if (textBottom.length > maxLength) {
              this.inputBottomTextNode.value = this.inputBottomTextNode.value.substring(0, maxLength);
              alert(`В это поле можно ввести не более ${maxLength} символов!`);
          } else {
              this.onTextBottomChange(event.target.value);
          } */
        this.onTextBottomChange(event.target.value);
    }

    // СhangeTextColor шаг 1
    // произошел выбор цвета
    _handleСhangeTextColor = () => {
        const currentTextColor = this.colorPickerNode.value;
        this.newTextColor(currentTextColor);
    }

    // setNewColorText шаг 5
    // установка нового цвета текста
    setNewColorText(currentTextColor) {
        document.querySelectorAll('p.preview__text').forEach(function(p) {
            p.style.color = currentTextColor;
            p.style.color = currentTextColor;
        });
    }

    // метод добавления класса для поворота стрелки select
    _rotateSelectArrow = () => {
        this.selectWrapperNode.classList.toggle('rotate');
    }

    // api. сообщение о значение ключа saccess
    showErrorMessage(saccessStatus) {
        alert('Значение ключа success: ' + saccessStatus);
    }

}