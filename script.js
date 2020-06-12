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
{   //obtengo elemento del filtro
    const inputfilter = document.getElementById("select-filter")
    //obtengo el texto seleccionado 
    const fvalue = inputfilter.value
    //retorno seleccion 
    return fvalue
}
//obtiene los usuarios filtrados
function getfilterusers(filtervalue)
{
    //crear array
    var arrayfilter = []
    // obtego datos de users
    switch (filtervalue) 
    {
        //si es femenino
        case 'female':
            //busco y filtro
            arrayfilter =  users.filter(function(user) 
                           {
                               return user.gender == 'female'
                           })
            break;
        //correo academlo                   
        case 'academlo':
            arrayfilter = users.filter(function(user) 
                          {
                            //obtengo el email  
                            var mail = user.email
                           // genero direccion inicial substring
                            var caracter1 = mail.indexOf('@');
                            //genero direccion final substring
                            var caracter2 = mail.indexOf('.');
                            //indico que solo quiero el dominio del correo
                            var dominio = mail.substring(caracter1 + 1, caracter2);
                            //retorno dominio que sea de academlo
                            return dominio == 'academlo'
                          })
            break;
        // orden alfabetico 
        case 'sort':
            arrayfilter =  users.sort(function(a, b) 
                           {
                               //primer valor a comparar
                               var user1 = a.name;
                               //segundo valor a comparar
                               var user2 = b.name;
                               // retorno el orden alfabetico de las dos opciones
                               return user1.localeCompare(user2)
                           })
            break;    
    }
    //retorno tabla filtrada
    return arrayfilter
}


function filter() {
    //obtengo el valor del filtro
    const filtervalue = getfiltervalue()
    //genero tabla filtrada
    const filterusers = getfilterusers(filtervalue)
    //imprimo tabla filtrada
    printUsers(filterusers)
}
window.filter = filter
//remueve usuario
function removeUser(id)
{
    //indico que elimine una posicion anterior al id ya que el array empieza de 0
    //y que solo elimine 1 elemento
    users.splice(id-1, 1)
}
//funcion del boton donde paso id como parametro desde el button
function removeButton(id)
{ 
    //elimino usuario
    removeUser(id)
    //ordeno id
    orderIDs()
    //imprime usuarios de nuevo 
    printUsers(users)

}
window.removeButton = removeButton
// Ejercicio - aplicar filtros
// Hacer que funcione el botón eliminar