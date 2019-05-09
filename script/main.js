//переменные для работы скриптов
var createBoard = document.getElementsByClassName('create-board')[0];
var newBoard = document.getElementsByClassName('new-board')[0];
var cancelBoard = document.getElementsByClassName('cancel')[0];
var createNewBoard = document.getElementsByClassName('create')[0];
var span1 = document.getElementById('sp1');
var nameBoard = document.getElementById('nameBT');
var newBoard1 = document.getElementsByClassName('new-board-1')[0];
var newBoard2 = document.getElementsByClassName('new-board-2')[0];
var board1Name = document.getElementsByClassName('board1-name-icon')[0];
var createList = document.getElementsByClassName('create-list')[0];
var nameList = document.getElementsByClassName('name-list')[0];
var span2 = document.getElementById('sp2');
var inputList = document.getElementById('nameLS');
var eventList = document.getElementsByClassName('event-list-1')[0];
var nameEv1 = document.getElementsByClassName('name-event-list-1')[0];
var inputEv1 = document.getElementsByClassName('input-level-1')[0];


// запрос на создание нового блока задач, текущий блок пропадает, блок с вводом появляется
createBoard.addEventListener('click', function () {
    createBoard.style.display = 'none';
    newBoard.style.display = 'inline';
    board1Name.style.display = 'none';
});

//отмена создания нового блока задач по клику на "cancel", возврат к предыдущему блоку 
cancelBoard.addEventListener('click', function () {
    createBoard.style.display = 'inline';
    newBoard.style.display = 'none';
    newBoard1.style.display = 'none';
    board1Name.style.display = 'none';
});

//отмена создания нового блока задач по клику на "х", возврат к предыдущему блоку 
span1.addEventListener('click', function () {
    createBoard.style.display = 'inline';
    newBoard.style.display = 'none';
    newBoard1.style.display = 'none';
});

//ввод названия нового блока задач, запись в сессионное хранилище
nameBoard.oninput = function () {
    var name = nameBoard.value;
    window.sessionStorage.setItem('nameBoard', name);
};

//создание нового блока задач с названием по клику "create"
createNewBoard.addEventListener('click', function () {
    if (sessionStorage.nameBoard.length > 0) {
        newBoard1.style.display = 'inline';
        newBoard.style.display = 'none';
        board1Name.style.display = 'none';
        createBoard.style.display = 'inline';
        newBoard1.innerHTML = sessionStorage.getItem('nameBoard');
    } else {
        alert('Please type name of board')
    }
});

//переход в меню нового блока задач, верхняя иконка с названием, появление синего блока "Add a list"
newBoard1.addEventListener('click', function () {
    board1Name.innerHTML = sessionStorage.getItem('nameBoard');
    newBoard1.style.display = 'none';
    newBoard.style.display = 'none';
    createBoard.style.display = 'none';
    board1Name.style.display = 'inline';
    createList.style.display = 'inline';
});

//клик на синий блок "Add a list", появление подблока с вводом
createList.addEventListener('click', function () {
    createList.style.display = 'none';
    nameList.style.display = 'inline';
});

//клик по "х", возврат на синий блок
span2.addEventListener('click', function () {
    if (blockName.length == 0) {
        createList.style.display = 'inline';
        nameList.style.display = 'none';
        createList.style.left = '50px';
    } else if (blockName.length == 1) {
        createList.style.display = 'inline';
        nameList.style.display = 'none';
        createList.style.left = '300px';
    }
});

//хранение названий подблоков
var blockName = [];

//ввод названия подблока
inputList.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        eventList.style.display = 'inline';
        addText();
    }
});

//функция добавления названий в подблоки
function addText() {
    var count = 0;
    count++;    
    for (i = 0; i < count; i++) {
        if (blockName.length == 0) {
            blockName.push(inputList.value);
            nameEv1.innerHTML = blockName[0];
            inputList.value = '';
            nameList.style.left = '290px';
        } else if (blockName.length == 1){
            var eventList2 = eventList.cloneNode(true);
            document.body.append(eventList2);
            blockName.push(inputList.value);
            eventList2.style.left = '290px';
            nameEv1.innerHTML = blockName[1];            
            nameList.style.left = '530px';
            inputList.value = '';
        }
        
    }
};
