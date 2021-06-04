const agregarAlCarritoBotones = document.querySelectorAll('.addToCarrito');
agregarAlCarritoBotones.forEach((agregarAlCarritoBoton) => {
    agregarAlCarritoBoton.addEventListener('click', agregarAlCarritoClick);
});

const botonComprar = document.querySelector('.comprarButton')
botonComprar.addEventListener('click', comprarButtonClicked)

const carritoItemsContainer = document.querySelector(
    '.carritoItemsContainer'
);


function agregarAlCarritoClick(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector(".item-image").src;

    agregarItemAlCarrito(itemTitle, itemPrice, itemImage);

}

function agregarItemAlCarrito(itemTitle, itemPrice, itemImage) {
    const elementsTitle = carritoItemsContainer.getElementsByClassName(
        'carritoItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementoCantidad = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.carritoItemCantidad');
            console.log(elementsTitle[i].innerText)
            elementoCantidad.value++;
            $('.toast').toast('show');
            actualizarCarritoTotal();
            return;
        }
    }

    const carritoRow = document.createElement('div');
    const carritoContent = `
    <div class="row carritoItem">
          <div class="col-6">
              <div class="carrito-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="carrito-image">
                  <h6 class="carrito-item-title carritoItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 carritoItemPrecio">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="carrito-input-de-cantidad carritoItemCantidad" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;

    carritoRow.innerHTML = carritoContent;
    carritoItemsContainer.append(carritoRow);

    carritoRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeCarritoItem);

    carritoRow
        .querySelector('.carritoItemCantidad')
        .addEventListener('change', cantidadCambiada);

    actualizarCarritoTotal();
}

function actualizarCarritoTotal() {
    let total = 0;
    const carritoTotal = document.querySelector('.carritoTotal');

    const carritoItems = document.querySelectorAll('.carritoItem');

    carritoItems.forEach((carritoItem) => {
        const carritoItemPrecioElemento = carritoItem.querySelector(
            '.carritoItemPrecio'
        );
        const carritoItemPrecio = Number(
            carritoItemPrecioElemento.textContent.replace('$', '')
        );
        const carritoItemCantidadElemento = carritoItem.querySelector(
            '.carritoItemCantidad'
        );
        const carritoItemCantidad = Number(
            carritoItemCantidadElemento.value
        );
        total = total + carritoItemPrecio * carritoItemCantidad;
    });
    carritoTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeCarritoItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.carritoItem').remove();
    actualizarCarritoTotal();
}

function cantidadCambiada(event) {
    const input = event.target;
    if (input.value <= 0) {
         input.value = 1;
    }
    actualizarCarritoTotal();
}

function comprarButtonClicked() {
    carritoItemsContainer.innerHTML = '';
    actualizarCarritoTotal();
}
