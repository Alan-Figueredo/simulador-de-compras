const verFactura = () =>{
    let compras = JSON.parse(localStorage.getItem('fact'));
    let fact = [];
    for(const prod of compras){
        if(fact.includes(prod.categoria)){
            continue;
        }else{
            fact.push(prod.categoria);
        }
        $("#fila").append(`<div class="row mb-5"><div class="col"><p>${prod.nombre}</p></div><div class="col text-right"> <i class="fas fa-minus-square" id="restar${prod.id}"></i> <input type="text" placeholder="${prod.cantidad}" style="width: 50px;height: 34px;padding-bottom: 6px;"> <i class="fas fa-plus-square" id="sumar${prod.id}"></i> </div></div>`);
        $(`#restar${prod.id}`).click(function(){
            prod.cantidad-=1;
            console.log(prod.cantidad)
        })
        $(`#sumar${prod.id}`).click(function(){
            prod.cantidad+=1;
            console.log(prod.cantidad)
            console.log(compras);
        })
    }

    localStorage.setItem('Carrito', JSON.stringify(compras));
}

