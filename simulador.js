//Definicion de clases
class Factura{
    constructor(producto, cantidad, monto, cuotas){
        this.fecha = new Date();
        this.producto = producto;
        this.cantidad = cantidad;
        this.monto = monto;
        this.cuotas = cuotas;

    }
}

class Producto{
    constructor(id, nombre, precio, descripcion, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
    sumarIva(){
        this.precio = this.precio *1.21;
    }
}

//Filtracion de datos
//let boton = document.getElementById("btnFiltrar");
$("#btnfiltrar").click(filtrarDatos);
//boton.addEventListener("click", filtrarDatos); //error al ingresar a la factura

let inputBusqueda = document.getElementById("busqueda");
$("#busqueda").on("keyup", busquedaPorTeclado)
//inputBusqueda.addEventListener("keyup", busquedaPorTeclado); //error al ingresar a la factura

function busquedaPorTeclado(){
    if(inputBusqueda.value.length > 3){
        filtrarDatos();
    }
    if(inputBusqueda.value.length == 0){
        filtrarDatos();
    }
}
const aProductos = [
    {id: 2, nombre: "Macucas", precio: 60, descripcion:"Galletitas rellenas", categoria:"Galletitas", imagen: "Macucas.jfif"},
    {id: 4, nombre: "Nutella", precio: 600, descripcion:"Nutella Ferrero 350g Grande Chocolate Cacao Postre", categoria:"Dulces",imagen: "Nutella.jfif"},
    {id: 3, nombre: "Brahma", precio: 80, descripcion:"Lata Brahma 500cc", categoria:"Cervezas",imagen: "brahma.jpg"},
    {id: 4, nombre: "Dulce de leche", precio: 120, descripcion:"Dulce de leche repostero", categoria:"Dulces", imagen: "DDL.jfif"},
];
let productosFiltrados = aProductos;

//
function filtrarDatos(){
    let palabraClave = document.getElementById('busqueda');
    productosFiltrados = aProductos.filter(elemento => elemento.descripcion.includes(palabraClave.value) || elemento.nombre.includes(palabraClave.value));
    limpiarHTML();
    mostrarProductos();
}

//Fin de filtracion de datos

//ordenar datos por menor
const ordenarXMenor = ()=>{
    productosFiltrados.sort((a,b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0));
    limpiarHTML();
    mostrarProductos();
}
$("#ordenarMenor").click(ordenarXMenor);

//Fin ordenar datos por menor

//ordenar datos por mayor
//let ordenarMayor = document.getElementById("ordenarMayor");
const ordenarXMayor = ()=>{
    productosFiltrados.sort((a,b) => (a.precio < b.precio) ? 1 : ((b.precio < a.precio) ? -1 : 0));
    limpiarHTML();
    mostrarProductos();
}
$("#ordenarMayor").click(ordenarXMayor);

//Fin ordenar datos por mayor

//Limpiar estructura de productos
const limpiarHTML = ()=>{
    let fila = document.getElementById('fila');
    $("#fila").empty(fila);

    fila = document.createElement('div');
    let a = document.createAttribute("id");
    a.value = 'fila';
    fila.setAttributeNode(a);
    $("#fila").append(fila);
}


//Funcion que muestra los productos cargados en el array aProductos en la estructura HTML
//check
const mostrarProductos = () =>{
    for(const producto of productosFiltrados){
        $("#fila").append(`<div class="col-12 mb-3 pr-4"><div class="card text-center"><div class="card-body"><div class="row"><div class="col-sm-2"><img src="assets/${producto.imagen}" alt="" class="img-fluid img-thumbnail" style="width: 210px;"></div><div class="col text-left"><h5 class="card-title">${producto.nombre}</h5><p class="card-text">${producto.descripcion}</p><p class="card-text"><b>$ ${producto.precio}</b></p><a href="#" class="btn btn-primary mt-4" onclick=obtenerProductosComprados(${producto.id});>Añadir </a></div></div></div></div></div>`);
        $("#fila").hide().fadeIn(200);

    }
    $("#fila").append(`<div class="col-12 mt-5 text-right pr-3 mb-5 pr-4"><a href="factura.html" class="btn btn-primary" target="_blank">Obtener Factura</a></div>`)
}

//Funcion que muestra las categorias de los productos
const mostrarCategorias = ()=>{
    for(const elemento of aProductos){
        $("#categorias").append(`<p class="mx-2">${elemento.categoria}</p><br>`);
    }
}

//funcion para filtrar por maximo y minimo

const filtrarMaxMin=()=>{
    let valMin = $("#inputMinimo").val();
    let valMax = $("#inputMaximo").val();
    limpiarHTML();
    for(const producto of productosFiltrados){
        if(producto.precio <= valMax && producto.precio >= valMin){
            $("#fila").append(`<div class="col-12 mb-3 pr-4"><div class="card"><div class="card-body"><div class="row"><div class="col-sm-2"><img src="assets/${producto.imagen}" alt="" class="img-fluid img-thumbnail" style="width: 210px;"></div><div class="col text-left"><h5 class="card-title">${producto.nombre}</h5><p class="card-text">${producto.descripcion}</p><p class="card-text"><b>$ ${producto.precio}</b></p><a href="#" class="btn btn-primary mt-4" onclick=obtenerProductosComprados(${producto.id});>Añadir </a></div></div></div></div></div>`)
        }
    }
    $("#fila").append(`<div class="col-12 mt-5 text-right pr-3 mb-5 pr-4"><a href="factura.html" class="btn btn-primary" target="_blank">Obtener Factura</a></div>`)
}
$("#enviarMaxMin").click(filtrarMaxMin);

//Fin funcion para filtrar por maximo y minimo

//Funcion que obtiene los productos comprados y los agrega al carrito
const obtenerProductosComprados = (idProducto) =>{
    var elemento = document.getElementsByTagName('span')[0];
    var cantidad = parseFloat(elemento.innerHTML) +1;
    elemento.innerHTML = cantidad;
    agregarProductoAlCarrito(idProducto);
}


let prod =[];

localStorage.setItem('Fact', JSON.stringify(prod));
let fact = JSON.parse(localStorage.getItem('Fact'));

const agregarProductoAlCarrito = (idProducto) =>{
    let productoComprado = aProductos.find(x=>x.id == idProducto);
    fact.push(productoComprado);
    localStorage.setItem('fact', JSON.stringify(fact));
}