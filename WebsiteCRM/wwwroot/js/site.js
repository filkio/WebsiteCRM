function GetSources(elem) {
  //отключаем кнопку меню и включаем остальные
    MenuDisabled(elem);
    //получаем тег с таблицей
    let table = document.getElementById('myTable');
    //чистим все дочерние
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }  
    //создаём теги для таблицы
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
   // отправляем запрос на апи
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getsources');
    xhr.responseType = 'json';
    xhr.send();
    //как только ответ получен выполняем функцию
    xhr.onload = function () {
      //массив сорсов
        let sourcesArr = xhr.response;
        // массив ключей первого сорса
        let keys = [];
        //тег строки для заголовков
        let tr = document.createElement('tr');
        //получаем заголовки из первого сорса и заполняем первую строку таблицы
        for (key in sourcesArr[0]) {
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
   //на каждый источник создаем строку с его данными в тегах td.
        sourcesArr.forEach(function (arrayItem) {
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
            aopen.onclick = function () { OpenSource(arrayItem["ID"]); };
            let adelete = document.createElement('a');
            adelete.innerHTML = "Удалить";
            adelete.classList.add('nav-link');
            adelete.onclick = function () { DeleteSource(arrayItem["ID"]); };
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
function GetUsers(elem)
{
    //отключаем кнопку меню и включаем остальные
    MenuDisabled(elem);
    //получаем тег с таблицей
    let table = document.getElementById('myTable');
    //чистим все дочерние
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }    
    //создаем теги для таблицы
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    //отправляем запрос на апи
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getusers');
    xhr.responseType = 'json';
    xhr.send();
    //как только ответ получен выполняем функцию
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
{   //отключаем кнопку меню и включаем остальные
    MenuDisabled(elem);
    //получаем тег с таблицей
    let table = document.getElementById('myTable');
    //чистим все дочерние
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }  
    //создаем теги для таблицы
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    //отправляем запрос на апи
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getsegments');
    xhr.responseType = 'json';
    xhr.send();
    //как только ответ получен выполняем функцию
    xhr.onload = function () {
        //массив сегментов
        let segmentsArr = xhr.response;
        //массив ключей первого сегмента
        let keys = [];
        //тег строки для заголовков
        let tr = document.createElement('tr');
        //на каждый сегмент создаем строку с его данными в тегах td.
        for (key in segmentsArr[0]) {
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
        segmentsArr.forEach(function (arrayItem) {
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
            aopen.onclick = function () { OpenSegment(arrayItem["ID"]); };
            let adelete = document.createElement('a');
            adelete.innerHTML = "Удалить";
            adelete.classList.add('nav-link');
            adelete.onclick = function () { DeleteSegment(arrayItem["ID"]); };
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

function OpenUser(currentGuid)
{
    //получаем тег с таблицей
    let table = document.getElementById('myTable');
    //создаем теги для формы
    let form = document.createElement('form');
    form.method = 'post';
    //чистим все дочерние
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }  
    //let div = document.createElement('div');
    //div.classList.add('form-group');
    //отправляем запрос на апи
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getuser/' + currentGuid);
    xhr.responseType = 'json';
    xhr.send();
    //как только ответ получен выполняем функцию
    xhr.onload = function () {
        //пользователь
        let user = xhr.response;
        //перебираем ключи
        for (key in user) {
            //блок для размещения элементов формы по вертикали
            let div = document.createElement('div');

            let input = document.createElement('input');
            let label = document.createElement('label');
            label.innerHTML = key;
            input.id = key;
            label.htmlFor = key;
            if (key == 'Фамилия' || key == 'Имя' || key == 'Отчество' || key == 'Дата рождения')
            {
                input.type = 'text';
                input.value = user[key];
                input.classList.add('form-control');
            }
            if (key == 'ID')
            {
                input.type = 'text';
                input.setAttribute('readonly', 'readonly');
                input.value = user[key];
                input.classList.add('form-control');
            }
            if (key == 'Источник')
            {
                input = document.createElement('select');
                input.id = 'selectSource';
                let option = document.createElement('option');
                option.innerHTML = user[key];
                option.setAttribute('selected', '');
                option.setAttribute('disabled', 'disabled');
                input.appendChild(option);
                input.classList.add('form-control');
                //запрос всех источников
                let xhrsource = new XMLHttpRequest();
                xhrsource.open('GET', 'https://localhost:44306/api/getsourcenames/');
                xhrsource.responseType = 'json';
                xhrsource.send();
                //как только ответ получен выполняем функцию
                xhrsource.onload = function ()
                {
                    let sourceNamesArr = xhrsource.response;
                    sourceNamesArr.forEach(sourceName => {
                        let sourceNameOption = document.createElement('option');
                        sourceNameOption.innerHTML = sourceName;
                        input.appendChild(sourceNameOption);
                    });                   
                };
                 
            }
            if (key == 'Тип')
            {
                input = document.createElement('select');
                input.id = 'selectType';
                let option = document.createElement('option');
                option.innerHTML = user[key];
                option.setAttribute('selected', '');
                option.setAttribute('disabled', 'disabled');
                input.appendChild(option);
                input.classList.add('form-control');
                //запрос всех типов пользователей
                let xhrusertypes = new XMLHttpRequest();
                xhrusertypes.open('GET', 'https://localhost:44306/api/getusertypenames/');
                xhrusertypes.responseType = 'json';
                xhrusertypes.send();
                //как только ответ получен выполняем функцию
                xhrusertypes.onload = function ()
                {
                    let userTypesArr = xhrusertypes.response;
                    userTypesArr.forEach(userType => {
                        let userTypeOption = document.createElement('option');
                        userTypeOption.innerHTML = userType;
                        input.appendChild(userTypeOption);
                    });
                };
            }
            if (key == 'Количество детей')
            {
                input.type = 'number';
                input.value = user[key];
                input.classList.add('form-control');
            }
            if (key == 'Возраст')
            {
                input.type = 'number';
                input.setAttribute('disabled', 'disabled');
                input.value = user[key];
                input.classList.add('form-control');
            }
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        }
        //создаем еще кнопку для формы
        let div = document.createElement('div');
        let inputButton = document.createElement('input');
        inputButton.type = 'button';
        inputButton.value = 'Сохранить';
        inputButton.classList.add('btn');
        inputButton.classList.add('btn-success');
        inputButton.onclick = function () { UpdateUser(); };
        //TODO: добавить кнопке обработчик события на onclick, отправить post запрос, дождаться ответа ОК и вернуться в таблицу
        div.appendChild(inputButton);
        form.appendChild(div);
        //создаем строку и ячейку для формы и помещаем строку с формой в таблицу
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.appendChild(form);
        tr.appendChild(td);
        table.appendChild(tr);
        //TODO: Добавить другую строку в таблице. в её единственной ячейке будет другая таблица. заполнить запросом идентификаторов
    };

}
function UpdateUser()
{
    //Получаем все данные с формы
    let id = document.getElementById("ID").value;
    let selectSource = document.getElementById("selectSource");
    let source = selectSource.options[selectSource.selectedIndex].text;
    let selectUserType = document.getElementById("selectType");
    let userType = selectUserType.options[selectUserType.selectedIndex].text;
    let middlename = document.getElementById("Фамилия").value;
    let firstname = document.getElementById("Имя").value;
    let lastname = document.getElementById("Отчество").value;
    let childrenQuantity = Number(document.getElementById("Количество детей").value);
    let dateOfBirth = document.getElementById("Дата рождения").value; 
    //let sourceInput = document.getElementById("selectSource").options.selectedIndex.text;
    //let sourceInput = document.getElementById("selectSource").options.selectedIndex.value;
    //Суём в жсон
    console.log(id);
    var updateUser = JSON.stringify({
        "UserId": id,
        "Source": source,
        "UserType": userType,
        "FirstName": firstname,
        "MiddleName": middlename,
        "LastName": lastname,
        "ChildrenQuantity": childrenQuantity,
        "DateOfBirth": dateOfBirth
    });
    //Отправляем запрос на бек
    let xhrUpdateUser = new XMLHttpRequest();
    xhrUpdateUser.open('POST', 'https://localhost:44306/api/updateuser');
    xhrUpdateUser.responseType = 'json';
    xhrUpdateUser.setRequestHeader("Content-Type", "application/json");
    xhrUpdateUser.send(updateUser);
}
function DeleteUser(currentGuid)
{
    //отправляем запрос на апи
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://localhost:44306/api/removeuser/' + currentGuid);
    xhr.responseType = 'json';
    xhr.send();
    let menuItem = document.getElementById('menu-item1');
    //как только ответ получен выполняем обновление таблицы
    xhr.onload = function () {
        GetUsers(menuItem);
        };
}
function OpenSegment(currentGuid)
{
  //заглушка. сделать вывод таблицы при нажатии на кнопку
    alert('OpenSegment: ' + currentGuid);
}
function DeleteSegment(currentGuid)
{
  //заглушка. сделать вывод таблиця при нажатии на кнопку
    alert('DeleteSegment: ' + currentGuid);
}
function OpenSource(currentGuid)
{
  //заглушка. сделать вывод таюлицы при нажатии на кнопку
    alert('OpenSource: ' + currentGuid);
}
function DeleteSource(currentGuid)
{
  //заглушка. сделать вывод таблицы при нажатии на кнопкк
    alert('DeleteSource: ' + currentGuid);
}
