const wrapper = document.querySelector(".lenguajes");
const carrusel = document.querySelector(".lenguaje");
let arrastrado=false,iniciarX,iniciarDesplazamiento,tiempofueraID
const hijosC=[...carrusel.children]
const primero=carrusel.querySelector(".l").offsetWidth;


let vp=Math.round(carrusel.offsetWidth/primero)

hijosC.slice(-vp).reverse().forEach(card=>{
    carrusel.insertAdjacentHTML("afterbegin",card.outerHTML)
})

hijosC.slice(0,vp).forEach(card=>{
    carrusel.insertAdjacentHTML("beforeend",card.outerHTML)
})


const inicio=(e)=>{
    arrastrado=true
    carrusel.classList.add("arrastrando")
    iniciarX=e.pageX
    iniciarDesplazamiento=carrusel.scrollLeft
}

const arrastra=(e)=>{
    if(!arrastrado) return;
    carrusel.scrollLeft = iniciarDesplazamiento - (e.pageX - iniciarX)
}

const parar=()=>{
    arrastrado=false
    carrusel.classList.remove("arrastrando")
}

const play=()=>{
    //si es menor no hagas nada
    if(window.innerWidth<800)return;

    tiempofueraID=setTimeout(()=>carrusel.scrollLeft+=primero,2500)
}

play()

const infinito=()=>{
    if(carrusel.scrollLeft===0){
        carrusel.classList.add("no-transicion")
        //llega al inicio itere otra vez al final
        carrusel.scrollLeft=carrusel.scrollWidth-(2*carrusel.offsetWidth)
    }else if(Math.ceil(carrusel.scrollLeft)===carrusel.scrollWidth-carrusel.offsetWidth){
        //itera al inicio cuando se llegue al final
        carrusel.scrollLeft=carrusel.offsetWidth
    }
    clearTimeout(tiempofueraID);
    if(!wrapper.matches(":hover"))play();

}

carrusel.addEventListener("mousedown",inicio)
carrusel.addEventListener("mousemove",arrastra)
document.addEventListener("mouseup",parar)
carrusel.addEventListener("scroll",infinito)
wrapper.addEventListener("mouseenter",()=>clearTimeout(tiempofueraID));
wrapper.addEventListener("mouseleave",infinito)