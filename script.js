import { users } from './users.js'



// Genera las filas de la tabla para mostrar los usuarios
function htmlRowsUsers(table) {
    const html = table.map(function(user) {
        return `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="removeButton(${user.id})">Eliminar</button>
                    </td>
                </tr>`
    })
    return html.join("")
}
// devuelve el body 
function getTablebody() {
    return document.getElementById('table-body')
}
// Imprime los usuarios en el documento
function printUsers(array) {
    const htmlDataUsers = htmlRowsUsers(array)
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}
// Obtiene los datos del nuevo usuario
function getNewUser () {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputAge = document.getElementById('input-age')
    const inputGender = document.getElementById('select-age')
    const newUser = {
        name: inputName.value,
        email: inputEmail.value,
        age: inputAge.value,
        gender: inputGender.value
    }
    return newUser
}
// Imprime los datos de un usuario nuevo en el documento
function addUser() {
    const newUser = getNewUser()
    users.unshift(newUser)
    orderIDs()
    printUsers(users)
}

// Asigna el id correcto a cada elemento
function orderIDs() {
    users.forEach(function(user, index) {
        user.id = index + 1
    })
}


// Llamadas al cargar la página
printUsers(users)
// Volvemos la función addUser parte del objeto window
window.addUser = addUser



// Ejercicios:
// Asingar el id del nuevo usuario
// Agregar el nuevo usuario al inicio
// Hacer que funcione el botón eliminar

//obtener valor del filtro seleccionado
function getfiltervalue()
{
    const inputfilter = document.getElementById("select-filter")
    const fvalue = inputfilter.value 
    return fvalue
}
//obtiene los usuarios filtrados
function getfilterusers(filtervalue)
{
    var arrayfilter = []
    switch (filtervalue) 
    {
        case 'female':
            arrayfilter =  users.filter(function(user) 
                           {
                               return user.gender == 'female'
                           })
            break;

        case 'academlo':
            arrayfilter = users.filter(function(user) 
                          {
                            var mail = user.email
                           
                            var caracter1 = mail.indexOf('@');
                            var caracter2 = mail.indexOf('.');

                            var dominio = mail.substring(caracter1 + 1, caracter2);
                        
                            return dominio == 'academlo'
                          })
            break;

        case 'sort':
            arrayfilter =  users.sort(function(a, b) 
                           {
                               var user1 = a.name;
                               var user2 = b.name;

                               return user1.localeCompare(user2)
                           })
            break;    
    }

    return arrayfilter
}


function filter() {
    const filtervalue = getfiltervalue()
    const filterusers = getfilterusers(filtervalue)
    printUsers(filterusers)
}
window.filter = filter

function removeUser(id)
{
    users.splice(id-1, 1)
}

function removeButton(id)
{ 
    alert("id = " + id)
    removeUser(id)
    orderIDs()
    printUsers(users)

}
window.removeButton = removeButton
// Ejercicio - aplicar filtros
// Hacer que funcione el botón eliminar