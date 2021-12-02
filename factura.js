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
//Final calcular total de la factura
//calcular total de la factura

const calcularTotal = ()=>{
    let total = 0;
    let compras = JSON.parse(localStorage.getItem('Carrito'));
    for(let elemento of compras){
        total = total + elemento.precio;
    }
    $("#totalP").append(`<b>Total: $${total}</b>`)
}

//Fin calcular total de la factura