// Crear la clase PerroHttp
class PerroHttp {
    constructor(ruta, nombre, codigo){
        this.ruta = ruta;
        this.nombre = nombre;
        this.codigo = codigo;
    }

    getRuta(){
        return this.ruta
    }

    setRuta(ruta){
        this.ruta = ruta
    }

    getNombre(){
        return this.nombre
    }

    setNombre(nombre){
        this.nombre = nombre
    }

    getCodigo(){
        return this.codigo
    }

    setCodigo(codigo){
        this.codigo = codigo
    }

}

// let section__HttpStatusDogs = document.getElementById("section__HttpStatusDogs")
let input__codigo = document.getElementById("input__codigo")
let button__codigoHttp = document.getElementById("button__codigoHttp") 
let div__imagenHttpDog = document.getElementById("div__imagenHttpDog")
let error__httpDogs = document.getElementById("error__httpDogs")

let httpDogInfo = document.getElementById("httpDogInfo")
let httpDogInfo__cod = document.getElementById("httpDogInfo__cod")
let httpDogInfo__nom = document.getElementById("httpDogInfo__nom")

let galeriaHttp = document.getElementById("galeriaHttp")
let galeriaHttp__div = document.getElementById("galeriaHttp__div")

// Array de códigos HTTP
const codigosHttp = [
    100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
    300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403,
    404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
    417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500,
    501, 502, 503, 504, 505, 506, 507, 508, 510, 511, 520, 521, 522,
    523, 524, 525, 526, 527, 529, 530, 561, 598, 599, 999 
];

// console.log(codigosHttp)

// Array de la galeria
let arrayGaleriaHttpDogs = [];




// Funciones ***************************************************

// Cuando se hace clic en el botón de mostrar imagen
const manejarClickHttpDog = (event) => {

    if(event.target.tagName == "BUTTON"){

        // Ocultar mensaje de error
        error__httpDogs.classList.add("ocultar")

        // Ocultar información del código HTTP
        httpDogInfo.classList.add("ocultar")

        // Guardar el código HTTP que el usuario escribe
        let codigoHttpUsuario = input__codigo.value;

        // console.log(codigoHttpUsuario)

        // Mostrar mensaje de error si el input está vacío
        if(codigoHttpUsuario == ""){
            error__httpDogs.textContent = "Debes de intriducir un código HTTP"
            error__httpDogs.classList.remove("ocultar")
        }else{

            // Convertir el contenido del input en intener
            codigoHttpUsuario = parseInt(input__codigo.value)

            // console.log( codigosHttp.includes(codigoHttpUsuario) )

            /*
             Mostrar mensaje de error si el código HTTP no está
             en el array "codigosHttp".
            */
            if(codigosHttp.includes(codigoHttpUsuario) == false){
                error__httpDogs.textContent = "El código HTTP que has escrito no es correcto"
                error__httpDogs.classList.remove("ocultar")
            }else{

                // Llamar a la función "apiPerros"
                apiPerros(codigoHttpUsuario)

            }

        }

    }

}


/*
 Esta función será utilizada para mostrar la imagen que 
 el usuario solicita.
*/
const apiPerros = (codigoHttpUsuario) => {

    fetch("https://http.dog/"+codigoHttpUsuario+".json")
        .then(response => response.json())
        .then(res => {

            let miPerro = new PerroHttp;

            // console.log(res)

            miPerro.setCodigo(res.status_code);
            miPerro.setNombre(res.title);
            miPerro.setRuta(res.image.jpg);

            // console.log("El código de estado es: "+miPerro.getCodigo())
            // console.log("El nombre del estado es: "+miPerro.getNombre())
            // console.log("La dirección de la imagen en .jpg es: "+miPerro.getRuta())

            let datos_perro = {
                "codigo": miPerro.getCodigo(),
                "nombre": miPerro.getNombre(),
                "ruta": miPerro.getRuta()
            }
            
            // console.log(datos_perro)

            // Llamar a la funcion "mostrarImagenPerro"
            mostrarImagenPerro(datos_perro)

    })

}   

/*
 Función para mostrar la imagen del perro
 y la información del código HTTP.
*/
const mostrarImagenPerro = (datos_perro) => {

    // Vaciar "div__imagenHttpDog"
    div__imagenHttpDog.textContent = "";

    // Crear una nueva imagen
    let nuevaImagen = document.createElement("IMG")

    nuevaImagen.setAttribute("src", datos_perro.ruta)
    nuevaImagen.setAttribute("alt", datos_perro.nombre)
    nuevaImagen.classList.add("img__httpDog")

    // Añadir la imagen dentro del div "div__imagenHttpDog"
    div__imagenHttpDog.appendChild(nuevaImagen)

    // Mostrar información del código HTTP
    httpDogInfo.classList.remove("ocultar")
    httpDogInfo__cod.textContent = datos_perro.codigo
    httpDogInfo__nom.textContent = datos_perro.nombre

    httpLocalStorage(datos_perro)

}

// Esta función añade la información al localStorage
const httpLocalStorage = (datos_perro) => {

    // console.log(datos_perro)

    // console.log(JSON.stringify(arrayGaleriaHttpDogs).includes(JSON.stringify(datos_perro)))

    // Compruebo que el JSON no está añadido al array de la galería
    if(JSON.stringify(arrayGaleriaHttpDogs).includes(JSON.stringify(datos_perro)) == false){

        // Añado el JSON al array de la galería
        arrayGaleriaHttpDogs.push(datos_perro)

        // Añado el array al localStorage
        localStorage.setItem("datos", JSON.stringify(arrayGaleriaHttpDogs))

        tartarGaleria();

    }

}

// Esta función se utiliza para añadir imágenes a la galería
const tartarGaleria = () => {

    // Muestro la galería
    galeriaHttp.classList.remove("ocultar")

    // Vacio la galería
    galeriaHttp__div.textContent = "";

    // Recupero la información del localStorage
    let datos = JSON.parse(localStorage.getItem("datos"))

    // console.log(datos)

    // Creo un fragment
    let fragment = document.createDocumentFragment();

    // Recorro el array "datos"
    datos.forEach(dato => {
        
        // Creo una imagen nueva
        let nuevaImagen = document.createElement("IMG")

        nuevaImagen.setAttribute("src", dato.ruta)
        nuevaImagen.setAttribute("alt", dato.nombre)

        nuevaImagen.classList.add("img__galeriaHttp")

        // Añado las imágenes al fragment
        fragment.appendChild(nuevaImagen)

    });

    // Añado las imágenes a la galería
    galeriaHttp__div.appendChild(fragment)

}


button__codigoHttp.addEventListener("click", manejarClickHttpDog)