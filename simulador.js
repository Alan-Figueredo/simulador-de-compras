//Definicion de clases
class Factura{
    constructor(producto, monto, cuotas){
        this.fecha = new Date();
        this.producto = producto;
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
        this.cantidad;
    }
    sumarIva(){
        this.precio = this.precio *1.21;
    }
}

//Filtracion de datos
$("#btnfiltrar").click(filtrarDatos);

let inputBusqueda = document.getElementById("busqueda");
$("#busqueda").on("keyup", busquedaPorTeclado)

function busquedaPorTeclado(){
    if(inputBusqueda.value.length > 3){
        filtrarDatos();
    }
    if(inputBusqueda.value.length == 0){
        filtrarDatos();
    }
}
const aProductos = [
    {id: 2, nombre: "Macucas", precio: 60, descripcion:"Galletitas rellenas", categoria:"Galletitas", imagen: "Macucas.jfif", cantidad:0},
    {id: 4, nombre: "Nutella", precio: 600, descripcion:"Nutella Ferrero 350g Grande Chocolate Cacao Postre", categoria:"Dulces",imagen: "Nutella.jfif", cantidad:0},
    {id: 3, nombre: "Brahma", precio: 80, descripcion:"Lata Brahma 500cc", categoria:"Cervezas",imagen: "brahma.jpg", cantidad:0},
    {id: 4, nombre: "Dulce de leche", precio: 120, descripcion:"Dulce de leche repostero", categoria:"Dulces", imagen: "DDL.jfif", cantidad:0},
];
let productosFiltrados = aProductos;


function filtrarDatos(){
    let palabraClave = document.getElementById('busqueda');
    productosFiltrados = aProductos.filter(elemento => elemento.descripcion.includes(palabraClave.value) || elemento.nombre.includes(palabraClave.value));
    limpiarHTML();
    mostrarProductos();
}


//ordenar datos por menor
const ordenarXMenor = ()=>{
    productosFiltrados.sort((a,b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0));
    limpiarHTML();
    mostrarProductos();
}
$("#ordenarMenor").click(ordenarXMenor);


//ordenar datos por mayor
const ordenarXMayor = ()=>{
    productosFiltrados.sort((a,b) => (a.precio < b.precio) ? 1 : ((b.precio < a.precio) ? -1 : 0));
    limpiarHTML();
    mostrarProductos();
}
$("#ordenarMayor").click(ordenarXMayor);

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
const mostrarProductos = () =>{
    for(const producto of productosFiltrados){
        $("#fila").append(`<div class="col-12 mb-3 pr-4"><div class="card text-center"><div class="card-body"><div class="row"><div class="col-sm-2"><img src="assets/${producto.imagen}" alt="" class="img-fluid img-thumbnail" style="width: 210px;"></div><div class="col text-left"><h5 class="card-title">${producto.nombre}</h5><p class="card-text">${producto.descripcion}</p><p class="card-text"><b>$ ${producto.precio}</b></p><button href="#" class="btn btn-primary mt-4" onclick=obtenerProductosComprados(${producto.id});>Añadir </button></div></div></div></div></div>`);
        $("#fila").hide().fadeIn(200);

    }
    $("#fila").append(`<div class="col-12 mt-5 text-center pr-3 mb-5 pr-4" id="divError"><a text-right href="factura.html" class="btn btn-primary" id="obtenerFactura" target="_blank">Obtener Factura</a></div>`)
    $("#obtenerFactura").click(function(e){
        if(fact.length === 0){
            $("#divError").prepend(`<div class="alert alert-danger" role="alert" id="cartelError">¡Debe ingresar productos al carrito primero!</div>`);
          $("#cartelError").delay(2500).slideUp(1000)
            e.preventDefault();
        }
    })

}
$("#carrito").click(function(e){
    if(fact.length === 0){
        $("#fila").prepend(`<div class="alert alert-danger" role="alert" id="cartelError">¡Debe ingresar productos al carrito primero!</div>`);
      $("#cartelError").delay(2500).slideUp(1000)
        e.preventDefault();
    }
})

//Funcion que muestra las categorias de los productos
const mostrarCategorias = ()=>{
    let cat = [];
    for(const elemento of aProductos){
        if(cat.includes(elemento.categoria)){
            continue;
        }else{
            cat.push(elemento.categoria);
        }
        $("#categorias").append(`<a class="${elemento.categoria} mx-2 links">${elemento.categoria}</a><br>`);
        $(`.${elemento.categoria}`).on("click", function(){
            limpiarHTML();
            $("#fila").append(`<div class="col-12 mb-3 pr-4"><div class="card text-center"><div class="card-body"><div class="row"><div class="col-sm-2"><img src="assets/${elemento.imagen}" alt="" class="img-fluid img-thumbnail" style="width: 210px;"></div><div class="col text-left"><h5 class="card-title">${elemento.nombre}</h5><p class="card-text">${elemento.descripcion}</p><p class="card-text"><b>$ ${elemento.precio}</b></p><button href="#" class="btn btn-primary mt-4" onclick=obtenerProductosComprados(${elemento.id});>Añadir </button></div></div></div></div></div>`);
        });
    }
}

//funcion para filtrar por maximo y minimo

const filtrarMaxMin=()=>{
    let valMin = $("#inputMinimo").val();
    let valMax = $("#inputMaximo").val();
    limpiarHTML();
    for(const producto of productosFiltrados){
        if(producto.precio <= valMax && producto.precio >= valMin){
            $("#fila").append(`<div class="col-12 mb-3 pr-4"><div class="card"><div class="card-body"><div class="row"><div class="col-sm-2"><img src="assets/${producto.imagen}" alt="" class="img-fluid img-thumbnail" style="width: 210px;"></div><div class="col text-left"><h5 class="card-title">${producto.nombre}</h5><p class="card-text">${producto.descripcion}</p><p class="card-text"><b>$ ${producto.precio}</b></p><button href="#" class="btn btn-primary mt-4" onclick=obtenerProductosComprados(${producto.id});>Añadir </button></div></div></div></div></div>`)
        }
    }
    $("#fila").append(`<div class="col-12 mt-5 text-right pr-3 mb-5 pr-4"><a href="factura.html" class="btn btn-primary" target="_blank">Obtener Factura</a></div>`)
}
$("#enviarMaxMin").click(filtrarMaxMin);

function checkEnterClick(e){
    if(e.keyCode == 13){
        filtrarMaxMin();
    }
 }

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
    productoComprado.cantidad +=1;
    fact.push(productoComprado);
    localStorage.setItem('fact', JSON.stringify(fact));
    localStorage.setItem('Carrito', JSON.stringify(fact));
}