//Muestra los productos comprados 
const verFactura = () =>{
    let compras = JSON.parse(localStorage.getItem('fact'));
    for(const prod of compras){
        $("#fila").append(`<p>${prod.nombre} <p class="text-right"><b>$${prod.precio}</b></p></p>`);
    }
}
//Final calcular total de la factura
//calcular total de la factura

const calcularTotal = ()=>{
    let total = 0;
    let compras = JSON.parse(localStorage.getItem('fact'));
    for(let elemento of compras){
        total = total + elemento.precio;
    }
    $("#totalP").append(`<b>Total: $${total}</b>`)
}

//Fin calcular total de la factura