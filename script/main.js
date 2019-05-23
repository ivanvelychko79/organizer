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


// хранение названий подблоков
var blockName = [];

// ввод названия подблока, появление подблока по нажатию "enter",
// смещение в сторону окна для ввода названия подблока 
inputList.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        blockName.push(inputList.value);
        inputList.value = '';
        for (var i = 0; i < blockName.length; i++) {
            var clonePos2 = 240 * i;
            nameList.style.left = (clonePos2 + 290) + 'px';
        }
        // работа с подблоками
        switch (blockName.length) {
            // подблок
            case 1:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[0];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 2:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                lst.style.left = '290px';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[1];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 3:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                lst.style.left = '530px';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[2];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 4:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                lst.style.left = '770px';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[3];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 5:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[4];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 6:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[5];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
            case 7:
                // подблок, название, строка ввода, блок события,
                // классы CSS, дочерние элементы
                var lst = document.createElement('div');
                var nmLst = document.createElement('div');
                var inpEv = document.createElement('input');
                var ev = document.createElement('div');
                var mrk = document.createElement('span');
                mrk.innerText = '✓';
                lst.className = 'event-list';
                nmLst.className = 'name-event-list';
                inpEv.className = 'input-event';
                ev.className = 'events';
                mrk.className = 'sp';
                // появление подблока, вставка названия
                // добавление дочерних элементов
                document.body.append(lst);
                nmLst.innerHTML = blockName[6];
                lst.style.display = 'inline-table';
                lst.appendChild(nmLst);
                lst.appendChild(inpEv);
                lst.appendChild(ev);
                lst.appendChild(mrk);
                // хранение событий
                var blockEvent = [];
                // работа с событиями, вставка событий, клонирование элемента, работа с CSS
                inpEv.addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        blockEvent.push(inpEv.value);
                        ev.style.display = 'block';
                        mrk.style.display = 'inline-block';
                        ev.innerHTML = blockEvent[0];
                        inpEv.value = '';
                        // клонирование блока события и метки '✓'
                        var evClone = ev.cloneNode(true);
                        var mrkClone = mrk.cloneNode(true);
                        // появление клонированного элемента
                        if (blockEvent.length > 1) {
                            for (var i = 1; i < blockEvent.length; i++) {
                                lst.append(evClone);
                                evClone.innerHTML = blockEvent[i];
                                lst.append(mrkClone);
                                mrkClone.style.top = '150px';
                                // смещение метки, в зависимости от количества
                                // блоков событий
                                if (blockEvent.length > 2) {
                                    var mrkClonePos = 50 * i;
                                    mrkClone.style.top = (mrkClonePos + 100) + 'px';
                                }
                            }
                        }
                    }
                });
                break;
        }
    }
});

