/* =====================================================
   PETCARE - SISTEMA DE FAVORITOS
===================================================== */


/*
    Los favoritos se guardan en el navegador.

    Ejemplo de cómo se guardaría un producto:

    {
        id: 1,
        name: "Alimento Premium",
        category: "Alimentos",
        description: "...",
        price: 24.99,
        image: "..."
    }

*/


let favorites =
    JSON.parse(
        localStorage.getItem("petcareFavorites")
    ) || [];



/* =====================================================
   MOSTRAR FAVORITOS
===================================================== */

function renderFavorites(){

    const list =
        document.getElementById("favoritesList");

    const empty =
        document.getElementById("emptyState");

    const count =
        document.getElementById("favoriteCount");


    list.innerHTML = "";


    count.textContent = favorites.length;


    /* SI NO HAY PRODUCTOS */

    if(favorites.length === 0){

        list.style.display = "none";

        empty.style.display = "block";

        return;

    }


    /* SI HAY PRODUCTOS */

    list.style.display = "flex";

    empty.style.display = "none";


    favorites.forEach((product,index)=>{


        const card =
            document.createElement("article");


        card.className =
            "favorite-product";


        card.style.animationDelay =
            `${index * 0.08}s`;


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-rating">

                    ${createStars(product.rating || 5)}

                    <span>
                        (${product.reviews || 0} reseñas)
                    </span>

                </div>

            </div>


            <div class="product-price">

                <strong>
                    $${Number(product.price).toFixed(2)}
                </strong>


                <div class="product-actions">

                    <button
                        class="remove-btn"
                        data-favorite-action="remove" data-favorite-id="${encodeURIComponent(String(product.id))}"
                        title="Eliminar de favoritos">

                        <i class="fa-solid fa-heart"></i>

                    </button>


                    <button
                        class="cart-btn"
                        data-favorite-action="cart" data-favorite-id="${encodeURIComponent(String(product.id))}">

                        <i class="fa-solid fa-cart-plus"></i>

                        Agregar

                    </button>

                </div>

            </div>

        `;


        list.appendChild(card);

    });

}


/* =====================================================
   ESTRELLAS
===================================================== */

function createStars(rating){

    let result = "";

    for(let i=1; i<=5; i++){

        if(i <= rating){

            result +=
                '<i class="fa-solid fa-star"></i>';

        }else{

            result +=
                '<i class="fa-regular fa-star"></i>';

        }

    }

    return result;

}


/* =====================================================
   ELIMINAR FAVORITO
===================================================== */

function removeFavorite(id){

    favorites =
        favorites.filter(
            product => product.id !== id
        );


    localStorage.setItem(
        "petcareFavorites",
        JSON.stringify(favorites)
    );


    renderFavorites();

}


/* =====================================================
   AGREGAR AL CARRITO
===================================================== */

function addToCart(id){

    let cart =
        JSON.parse(
            localStorage.getItem("petcare_cart")
        ) || [];


    const product =
        favorites.find(
            item => item.id === id
        );


    if(!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,
            title: product.title || product.name || "Producto PetCare",
            name: product.name || product.title || "Producto PetCare",
            img: product.img || product.image || "",
            image: product.image || product.img || "",
            quantity:1

        });

    }


    localStorage.setItem(
        "petcare_cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


/* =====================================================
   CONTADOR DEL CARRITO
===================================================== */

function updateCartCount(){

    const cart =
        JSON.parse(
            localStorage.getItem("petcare_cart")
        ) || [];


    const total =
        cart.reduce(
            (sum,item)=>
                sum + (item.quantity || 0),
            0
        );


    document.querySelectorAll("#cartCount, .cart-bubble").forEach(el => el.textContent = total);

}


/* =====================================================
   INICIAR
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        renderFavorites();

        updateCartCount();

        const exploreProductsBtn =
            document.getElementById("exploreProductsBtn");

        if(exploreProductsBtn){
            exploreProductsBtn.addEventListener("click", ()=>{
                window.location.href = "productos.html";
            });
        }

    }
);
document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-favorite-action]");
    if (!action) return;

    const id = decodeURIComponent(action.dataset.favoriteId || "");
    if (action.dataset.favoriteAction === "remove") {
        removeFavorite(id);
    } else if (action.dataset.favoriteAction === "cart") {
        addToCart(id);
    }
});
