let url = 'http://localhost:4000/api/languages'

const contenedor = document.querySelector('tbody');
let resultados = "";

//Capturo el Form
const modalLenguaje = new bootstrap.Modal(document.getElementById('modalLenguaje'))
const formLenguaje = document.querySelector('form')
const lenguaje = document.getElementById('lenguaje')
const programadores = document.getElementById('programadores')
var opcion = ''





//Bajo el paner crear
btnCrear.addEventListener('click', () => {
    lenguaje.value = ''
    programadores.value = ''
    modalLenguaje.show()
    opcion = 'crear'
})

//Funcion para mostrar los resultados
const mostrar = (lenguajes) => {
    lenguajes.forEach(lenguaje => {
        resultados += `
                    <tr>
                        <td>${lenguaje.id}</td>
                        <td>${lenguaje.name}</td>
                        <td>${lenguaje.programmers}</td>
                        <td class="text-center"> <a class="btnEditar btn btn-primary ">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a> </td>
                    </tr>`
    })
    contenedor.innerHTML = resultados
}


//procedimiento mostrar 
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


//Metodo para asignar eventos a los elementos del DOM
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


//Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
        function () {

            fetch(url + "/" + id, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(() => location.reload())
            //alertify.success('Ok')

        },
        function () {
            alertify.error('Cancel')
        });
})



//EDITAR
let idForm = 0

on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML//Otra formar de capturar el ID
    const lenguajeFrom = fila.children[1].innerHTML
    const programadoresFrom = fila.children[2].innerHTML

    lenguaje.value = lenguajeFrom
    programadores.value = programadoresFrom

    opcion = 'editar'
    modalLenguaje.show()



})

//Crear y editar

//Procedimiento para Crear y Editar
formLenguaje.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        //console.log('OPCION CREAR')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: lenguaje.value,
                programmers: programadores.value
            })
        })
            .then(response => response.json())

            .then(data => {
                const newLenguaje = []
                newLenguaje.push(data)
                location.reload();
            })
        // .then(response => location.reload())

    }
    if (opcion == 'editar') {
        fetch(url + "/" + idForm, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: lenguaje.value,
                programmers: programadores.value
            })

        })
            .then(response => response.json())
            .then(response => location.reload())
    }
    modalLenguaje.hide()
})