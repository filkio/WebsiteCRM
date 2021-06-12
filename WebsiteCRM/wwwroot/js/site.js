function GetSources(elem) {
    MenuDisabled(elem);
    let table = document.getElementById('myTable');
    while (table.firstChild)
    {
        table.removeChild(table.firstChild);
    }
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getsources');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
        let sourcesArr = xhr.response;
        let keys = [];
        let tr = document.createElement('tr');
        for (key in sourcesArr[0]) {
            var th = document.createElement('th');
            th.innerHTML = key;
            tr.appendChild(th);
            keys.push(key);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        sourcesArr.forEach(function (arrayItem) {
            let tr = document.createElement('tr');
            keys.forEach(function (key) {
                let td = document.createElement('td');
                td.innerHTML = arrayItem[key];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    };
}
function GetUsers(elem)
{
  //отключаем кнопку меню и включаем остальные
    MenuDisabled(elem);
    //получаем таблицу и чистим ее элементы
    let table = document.getElementById('myTable');
    while (table.firstChild)
    {
        table.removeChild(table.firstChild);
    }
    //создаем теги для таблицы
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    //отправляем запрос на бек
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getusers');
    xhr.responseType = 'json';
    xhr.send();
    //как только ответ будет получен делаем функцию
    xhr.onload = function () {
      //массив пользователей
        let usersArr = xhr.response;
        //массив ключей первого пользователя
        let keys = [];
        //тег строки для заголовков
        let tr = document.createElement('tr');
        //получаем заголовки из первого юзера и заполняем первую строку таблицы
        for (key in usersArr[0]) {
            var th = document.createElement('th');
            th.innerHTML = key;
            tr.appendChild(th);
            keys.push(key);
        }
        //тег для названия в первой колонке
        let thmoves = document.createElement('th');
        thmoves.innerHTML = "Действия:";
        //кладем в первую строку таблицы
        tr.appendChild(thmoves);
        //кладем первую строку таблицы в тег thead
        thead.appendChild(tr);
        //кладем thead в таблицу
        table.appendChild(thead);

        //на каждого пользователя создаем строку с его данными в тегах td.
        usersArr.forEach(function (arrayItem) {
            let tr = document.createElement('tr');
            keys.forEach(function (key) {
                let td = document.createElement('td');
                td.innerHTML = arrayItem[key];
                tr.appendChild(td);
            });
            //создаем теги ссылок. ссылки кликабельны и при клике вызывают метод с id записи.
            let aopen = document.createElement('a');
            aopen.innerHTML = "Открыть";
            aopen.classList.add('nav-link');
            aopen.href = "#";
            aopen.onclick = function () { OpenUser(arrayItem["ID"]); };
            let adelete = document.createElement('a');
            adelete.innerHTML = "Удалить";
            adelete.classList.add('nav-link');
            adelete.onclick = function () { DeleteUser(arrayItem["ID"]); };
            adelete.href = "#";
            //кладем теги с действиями в тег колонки таблицы
            let tdmoves = document.createElement('td');
            tdmoves.appendChild(aopen);
            tdmoves.appendChild(adelete);
            //кладем тег с действиями в тег строки пользователю
            tr.appendChild(tdmoves);
            //добавляем готовую строку в тег tbody
            tbody.appendChild(tr);
        });
        //добавляем собранный тег tbody в таблицу
        table.appendChild(tbody);
    };
}
function MenuDisabled(elem)
{
    //Метод для отключения текущей кнопки меню и включения остальных
    document.getElementById('menu-item1').classList.remove('disabled');
    document.getElementById('menu-item2').classList.remove('disabled');
    document.getElementById('menu-item3').classList.remove('disabled');
    document.getElementById('menu-item4').classList.remove('disabled');
    document.getElementById('menu-item5').classList.remove('disabled');
    elem.classList.add('disabled');
}
function GetSegments(elem)
{
    MenuDisabled(elem);
    let table = document.getElementById('myTable');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getsegments');
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function () {
        let usersArr = xhr.response;
        let keys = [];
        let tr = document.createElement('tr');
        for (key in usersArr[0]) {
            var th = document.createElement('th');
            th.innerHTML = key;
            tr.appendChild(th);
            keys.push(key);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        usersArr.forEach(function (arrayItem) {
            let tr = document.createElement('tr');
            keys.forEach(function (key) {
                let td = document.createElement('td');
                td.innerHTML = arrayItem[key];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    };
}

function OpenUser(currentGuid)
{
    alert('OpenUser: ' + currentGuid);
}
function DeleteUser(currentGuid)
{
    alert('DeleteUser: ' + currentGuid);
}
function OpenSegment(currentGuid)
{
    alert('OpenSegment: ' + currentGuid);
}
function DeleteSegment(currentGuid)
{
    alert('DeleteSegment: ' + currentGuid);
}
function OpenSource(currentGuid)
{
    alert('OpenSource: ' + currentGuid);
}
function DeleteSource(currentGuid)
{
    alert('DeleteSource: ' + currentGuid;
}
