// Crear la clase PerroAPI
class PerroAPI {
    constructor(ruta){
        this.ruta = ruta;
    }

    getRuta(){
        return this.ruta;
    }

    setRuta(ruta){
        this.ruta = ruta
    }

}


let input__TheDogAPI = document.getElementById("input__TheDogAPI")
let button__TheDogAPI = document.getElementById("button__TheDogAPI")
let error__TheDogAPI = document.getElementById("error__TheDogAPI")

let galeriaTheDogAPI = document.getElementById("galeriaTheDogAPI") 



// Funciones ******************************************

// Cuando se hace clic en el botón de mostrar imagen/es
const manejarClickTheDogAPI = (event) => {

    if(event.target.tagName == "BUTTON"){

        // Oculto el mensaje de error
        error__TheDogAPI.classList.add("ocultar")

        // Número de imagenes de perros que el usuario quiere
        let num_imagenes = input__TheDogAPI.value;

        // console.log(num_imagenes)

        // Comrpobar que el número de imágenes no sea menor que 1
        if(num_imagenes < 1){

            error__TheDogAPI.textContent = "El número de imágenes tiene que ser 1 o más"
            error__TheDogAPI.classList.remove("ocultar")

        }else{
            // Comprobar que el número de imágenes no sea mayor que 100
            if(num_imagenes > 100){

                error__TheDogAPI.textContent = "El número de imágenes no puede ser mayor de 100"
                error__TheDogAPI.classList.remove("ocultar")

            }else{

                // Llamo a la función "apiTheDogAPI"
                apiTheDogAPI(num_imagenes);
            }
        }

    }

}

// Función que hace el fetch a la API
const apiTheDogAPI = (num_imagenes) => {

    fetch("https://api.thedogapi.com/v1/images/search?limit="
    +num_imagenes+"&api_key=live_iN1nAp7V3NWzuvtrx0gWYmCjKJBg8iO5sE5OfMoDzGfY8KZaZOGbjYysSJDkmsu3")
        .then(response => response.json())
        .then(res => {
            
            // console.log(res)

            // Array de las imágenes d ela galería
            let galeria = [];

            res.forEach(perro => {
                
                let nuevoPerro = new PerroAPI;

                nuevoPerro.setRuta(perro.url)

                let datos_perro = {
                    "ruta": nuevoPerro.getRuta()
                }

                galeria.push(datos_perro)

            });

            // console.log(galeria)

            localStorage.setItem("galeria", JSON.stringify(galeria))

            // Saco la información del local Storage
            sacarInfoLocalStorage();

        })

}

// Función para sacar la información del local storage
const sacarInfoLocalStorage = () => {

    // Saco la información del local storage
    let datos = JSON.parse(localStorage.getItem("galeria"))

    // console.log(datos)

    // Añado las imágenes a la galería
    añadirImagenesGaleria(datos)

}

// Función para añadir las imágenes a la galeria
const añadirImagenesGaleria = (datos) =>{

    // Muestro la galería
    galeriaTheDogAPI.classList.remove("ocultar")

    // Vació la galería
    galeriaTheDogAPI.textContent = "";

    // Creo un fragment
    let fragment = document.createDocumentFragment();

    // Recorro el array "datos"
    datos.forEach(perro => {
        
        // Creo una nueva imagen
        let nuevaImagen = document.createElement("IMG")

        nuevaImagen.setAttribute("src", perro.ruta)
        nuevaImagen.classList.add("img__galeriaTheDogAPI")

        fragment.appendChild(nuevaImagen)

    });

    // Añado el fragment a la galería
    galeriaTheDogAPI.appendChild(fragment)

}


button__TheDogAPI.addEventListener("click", manejarClickTheDogAPI)