// Almaceno todos los productos cargados dentro de un array 
let articulosCarrito = [];

const listaProductos = document.querySelector('#lista-productos');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')

document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
    }
    carritoHTML();
})

listaProductos.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto)

/* Funcion para agregar productos al carrito */
function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
        leerDatosProducto(producto)
        
    }
}

function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h4').textContent,
        precio: item.querySelector('.precio span').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
// sumar la cantidad de los productos cuando se selecciona mas de 1
    if(articulosCarrito.some( item => item.id === infoProducto.id)){ 
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto;
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice();
    }else {
        articulosCarrito.push(infoProducto)
    }
    carritoHTML()
}

/* Muesta los elementos que hay dentro del carrito */
function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}"  width="100"/></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> ✖️ </a>
            </td>
        `;
        contenedorCarrito.appendChild(fila)
    })
    sincronizarStorage();
}

/*Funcion para que cuando se elimine los productos del carrito se eliminen del array*/
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

/*Funcion para vaciar el carrito tanto en el html como en el array del localStorage*/
function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}

