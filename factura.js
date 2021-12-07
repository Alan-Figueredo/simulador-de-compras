//Muestra los productos comprados 
const verFactura = () =>{
    let compras = JSON.parse(localStorage.getItem('Carrito'));
    let fact = [];
    console.log(compras);
    for(const prod of compras){
        if(fact.includes(prod.categoria)){
            continue;
        }else{
            fact.push(prod.categoria);
        }
        $("#fila").append(`<p>${prod.nombre}<p class="text-right"><b>$${prod.precio} x ${prod.cantidad} = $${(prod.precio)*prod.cantidad}</b></p></p>`);
    }
}
//calcular total de la factura

const calcularTotal = ()=>{
    let total = 0;
    let compras = JSON.parse(localStorage.getItem('Carrito'));
    for(let elemento of compras){
        total = total + elemento.precio;
    }
    return total;
}
let total = calcularTotal();
$("#totalP").append(`<b>Total: $ ${total}</b>`)
$("#descarga").append(`<a href="#" class="card-link" id="save-btn">Descargar factura</a>`);

//Funcion que hace un archivo de texto con el monto final de la factura
$("#save-btn").click(function(){
    let fecha = new Date();
    fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
    let blob = new Blob(
    [`---------------------- Factura ----------------------      

Fecha: ${fecha}
Total: ${total}
---------------------- Simulador de compra ----------------------
    `], 
    {type: "text/plain; charset=utf-8"});
    saveAs(blob, "testfile1.txt");
})
