//CON ESTA PRIMERA SECCIÓN RESGUARDO LA INFORMACIÓN DEL CARRITO EN EL LOCAL STORAGE.

let carrito = JSON.parse(localStorage.getItem('articulos_carrito')) || [];

mostrar_carrito();

//ESTE SEGMENTO PERMITE MOSTRAR O ESCONDER EL CARRITO//

let display_carrito = document.getElementById("display_carrito");

display_carrito.addEventListener("click",function(){


    let body_carrito = document.getElementById("body_carrito");

    if( body_carrito.style.display != "none"){

        body_carrito.style.display = "none";
    }
    else{
        body_carrito.style.display = "block";
    }
})

// ESTE SEGMENTO RENDERIZA LOS PRODUCTOS DESDE UN ARREGLO 

let lista_productos_oro = [
    {id: "1", articulo: "Botella de Vino Dorado 500mL", precio: 22, cantidad: 1, img: "botella500.jpg"},
    {id: "2", articulo: "Botella de Vino Dorado 1L", precio: 37, cantidad: 1, img: "botella1L.jpg"},
    {id: "3", articulo: "Racimo de uvas doradas", precio: 17, cantidad: 1, img: "uvasDoradas.png"},
];

let carta_producto = document.getElementById("body_productos");

for( let producto of lista_productos_oro ){

    let carta = document.createElement("div");
    carta.innerHTML = `<div class="col centrar div_prod_1">
                       <div class="card centrar div_prod_2">
                       <img src="./assets/images/${producto.img}" class="card-img-top imgProducto">
                       <div class="card-body">
                       <h3 class="card-title nombreProducto">${producto.articulo}</h3>
                       <span class="precioProducto">${producto.precio} USD</span>
                       <span class="cantidadProducto d-none">${producto.cantidad}</span>
                       <br>
                       <a href="#" class="btn btn-primary boton_compra pb-3">Agregar al carrito</a>
                       </div>
                       </div>
                       </div>`;
    
    carta_producto.append( carta );
}

// ESTE SEGMENTO DESARROLLA LA FUNCIÓN DE AGREGAR ELEMENTOS AL ARREGLO CARRITO

function agregar_a_carrito(e){

    let nodo_hijo = e.target;
    let nodo_padre = nodo_hijo.parentNode;
    let nodo_abuelo = nodo_hijo.parentNode.parentNode;

    let nombreProducto = nodo_padre.querySelector("h3").textContent;
    let precioProducto = nodo_padre.querySelector(".precioProducto").textContent;
    let cantidadProducto = nodo_padre.querySelector(".cantidadProducto").textContent;
    let imgProducto = nodo_abuelo.querySelector(".imgProducto").src;

    let articulo = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: cantidadProducto,
        img: imgProducto,
    }
     
    function duplicados (articulo){
        if (articulo.nombre == nombreProducto){
            return true
        }
    }

    let evaluar_duplicados = carrito.some (duplicados);

    function agregar_cantidad(articulo){
        if(articulo.nombre == nombreProducto){
            articulo.cantidad++;
        }
    }

    if(evaluar_duplicados){
        carrito.map(agregar_cantidad);
    }
    else{
        carrito.push(articulo);
    }

    mostrar_carrito();

    let carrito_JSON = JSON.stringify(carrito);
    localStorage.setItem("articulos_carrito", carrito_JSON);

}

let btn_compra = document.querySelectorAll(".boton_compra");

for (let boton of btn_compra){

    boton.addEventListener("click", agregar_a_carrito);
}

//ESTE SEGMENTO AGREGA ELEMENTOS AL CARRITO

function mostrar_carrito (){

    let tabla = document.getElementById("tabla_carrito");
    tabla.innerHTML = ""; //PENSAR SOLUCION

    for (let articulo of carrito){
        
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${articulo.img}" class="img_en_carrito rounded"></td>
                          <td><p>${articulo.nombre}</p></td>
                          <td class="cantidad_elemento">${articulo.cantidad}</td>
                          <td>${articulo.precio}</td>
                          <td><button id="${articulo.nombre}" class="btn btn-danger sumar_elemento">+</  button></td>
                          <td><button id="${articulo.nombre}" class="btn btn-danger restar_elemento">-</button></td>`;
                        
        tabla.append( fila );
    }

    let btn_sumar = document.querySelectorAll(".sumar_elemento");

    for(let btn of btn_sumar){
        btn.addEventListener("click", sumar_cant);
    }

    let btn_resta = document.querySelectorAll(".restar_elemento");

    for(let btns of btn_resta){
        btns.addEventListener("click", restar_cant);
    }
}

//FUNCIONES PARA INTERACTUAR CON EL CARRITO

function sumar_cant(e){

    let index_prod = carrito.findIndex( parametro => parametro.nombre == e.target.id, 0);         

    carrito[index_prod].cantidad++;
    mostrar_carrito();
}

function eliminar_producto( producto ){

    return producto.cantidad >= 1;
}

function restar_cant(e){
        
    let index_prod = carrito.findIndex( parametro => parametro.nombre == e.target.id, 0);   
    carrito[index_prod].cantidad--;

    if (carrito[index_prod].cantidad < 1){
        e.target.parentNode.parentNode.remove();
    }

    let resultado_filter = carrito.filter( eliminar_producto );

    carrito = resultado_filter;
    console.log( carrito );

    mostrar_carrito();
}