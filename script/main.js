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
var span3 = document.getElementById('sp3');
var inputList = document.getElementById('nameLS');


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

//создание нового блока задач с названием нажатием "enter"
nameBoard.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        newBoard1.style.display = 'inline';
        newBoard.style.display = 'none';
        board1Name.style.display = 'none';
        createBoard.style.display = 'inline';
        newBoard1.innerHTML = sessionStorage.getItem('nameBoard');
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
    } else if (blockName.length > 0) {
        createList.style.display = 'inline';
        nameList.style.display = 'none';
        var pos = blockName.length * 240;
        createList.style.left = (pos + 50) + 'px';
    }
});


//хранение названий подблоков
var blockName = [];

//ввод названия подблока, запуск функции по нажатию "enter" 
inputList.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        blockName.push(inputList.value);
        inputList.value = '';
        for (var i = 0; i < blockName.length; i++) {
            var clonePos2 = 240 * i;
            nameList.style.left = (clonePos2 + 290) + 'px';
        }
        switch (blockName.length) {
            case 1:
                // первый подблок, название, строка ввода, блок события; классы для этого;
                var lst1 = document.createElement('div');
                var nmLst1 = document.createElement('div');
                var inpEv1 = document.createElement('input');
                var ev1 = document.createElement('div');
                var mrk1 = document.createElement('span');
                mrk1.innerText = '✓';

                lst1.className = 'event-list';
                nmLst1.className = 'name-event-list';
                inpEv1.className = 'input-event';
                ev1.className = 'events';
                mrk1.className = 'sp';

                nmLst1.innerHTML = blockName[0];
                document.body.append(lst1);

                lst1.style.display = 'inline-table';
                lst1.appendChild(nmLst1);
                lst1.appendChild(inpEv1);
                lst1.appendChild(ev1);
                lst1.appendChild(mrk1);

                var blockEvent1 = [];
                inpEv1.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent1.push(inpEv1.value);
                        ev1.style.display = 'block';
                        mrk1.style.display = 'inline-block';
                        ev1.innerHTML = blockEvent1[0];
                        inpEv1.value = '';
                        var evClone1 = ev1.cloneNode(true);
                        var mrk1Clone = mrk1.cloneNode(true);
                        if (blockEvent1.length > 1) {
                            for (var i = 1; i < blockEvent1.length; i++) {
                                lst1.append(evClone1);
                                evClone1.innerHTML = blockEvent1[i];
                                lst1.append(mrk1Clone);
                                mrk1Clone.style.top = '150px';
                                if (blockEvent1.length > 2) {
                                    var mrk1ClonePos = 50 * i;
                                    mrk1Clone.style.top = (mrk1ClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 2:
                var lst2 = document.createElement('div');
                var nmLst2 = document.createElement('div');
                var inpEv2 = document.createElement('input');
                lst2.className = 'event-list';
                nmLst2.className = 'name-event-list';
                nmLst2.innerHTML = blockName[1];
                inpEv2.className = 'input-event';
                document.body.append(lst2);
                lst2.style.display = 'inline-table';
                lst2.appendChild(nmLst2);
                lst2.appendChild(inpEv2);
                lst2.style.left = '290px';
                break;
            case 3:
                console.log('very very good');
                break;
        }
    }
});

