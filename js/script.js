let nav = document.getElementById("nav")

let section__HttpStatusDogs = document.getElementById("section__HttpStatusDogs") 
let section__TheDogAPI = document.getElementById("section__TheDogAPI")


// Función para cambiar de api
const cambiarApi = (event) => {

    // API Http Status Dogs
    if(event.target.id == "nav__HttpStatusDogs"){

        section__TheDogAPI.classList.add("ocultar")
        section__TheDogAPI.classList.remove("aparecer")

        section__HttpStatusDogs.classList.remove("ocultar")
        section__HttpStatusDogs.classList.add("aparecer")

    }//if

    // API TheDogAPI
    if(event.target.id == "nav__TheDogAPI"){

        section__HttpStatusDogs.classList.add("ocultar")
        section__HttpStatusDogs.classList.remove("aparecer")

        section__TheDogAPI.classList.remove("ocultar")
        section__TheDogAPI.classList.add("aparecer")

    }//if

}





nav.addEventListener("click", cambiarApi)