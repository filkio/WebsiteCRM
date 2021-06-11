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
//test
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
    MenuDisabled(elem);
    let table = document.getElementById('myTable');
    while (table.firstChild)
    {
        table.removeChild(table.firstChild);
    }
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44306/api/getusers');
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
        let thmoves = document.createElement('th');
        thmoves.innerHTML = "Действия:";
        tr.appendChild(thmoves);
        thead.appendChild(tr);
        table.appendChild(thead);


        usersArr.forEach(function (arrayItem) {
            let tr = document.createElement('tr');
            keys.forEach(function (key) {
                let td = document.createElement('td');
                td.innerHTML = arrayItem[key];
                tr.appendChild(td);
            });
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

            let tdmoves = document.createElement('td');

            tdmoves.appendChild(aopen);
            tdmoves.appendChild(adelete);
            tr.appendChild(tdmoves);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    };
}
function MenuDisabled(elem)
{
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


