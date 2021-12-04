const verFactura = () =>{
    let compras = JSON.parse(localStorage.getItem('fact'));
    let fact = [];
    for(const prod of compras){
        if(fact.includes(prod.categoria)){
            continue;
        }else{
            fact.push(prod.categoria);
        }
        $("#fila").append(`<div class="row mb-5"><div class="col"><p>${prod.nombre}</p></div><div class="col text-right" id="fila${prod.id}"><a id="modificar${prod.id}" href="#"><i class="fas fa-edit"></i></a></div>`);
        $(`#modificar${prod.id}`).click(function(){
            $(`#fila${prod.id}`).append(`<div class="col text-right"><button class="btn btn-primary mr-2" id="restar${prod.id}" style="padding-left: 14px;padding-right: 14px;">-</button><input type="text" placeholder="${prod.cantidad}" style="width: 50px;height: 34px;padding-bottom: 6px;"><button class="btn btn-primary ml-2" id="sumar${prod.id}">+</button></div></div>`)
            $(`#modificar${prod.id}`).remove();
        })
        $(`#restar${prod.id}`).click(function(){
            prod.cantidad-=1;
            console.log(prod.cantidad)
        })
        $(`#sumar${prod.id}`).click(function(){
            compras.push(prod);
            prod.cantidad+=1;
            localStorage.setItem('Carrito', JSON.stringify(compras));
            console.log(prod.cantidad)
        })
    }
}

