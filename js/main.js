"use strict";


/* ========================================
   PRODUCTOS
======================================== */

const products = {

    hoodie: {

        id: "hoodie",

        name: "DV ZIP HOODIE",

        color: "WASHED CHARCOAL / PINK",

        price: 119,

        images: [
            "img/sudadera_parte_delantera.png",
            "img/sudadera_parte_trasera.png"
        ],

        description:
            "Heavyweight washed charcoal zip hoodie featuring custom metallic DV hardware, pink hood lining and signature diagonal zipper construction.",

        details:
            "Heavyweight construction. Washed charcoal finish. Pink hood lining. Full metallic front zipper. Decorative diagonal zippers. Ribbed cuffs and waistband. Custom DV detailing."

    },


    vest: {

        id: "vest",

        name: "DV PUFFER VEST",

        color: "GLOSS BLACK",

        /*
        Todavía no me has dado el precio real.
        Cuando lo decidas, cambia null por ejemplo por:
        price: 129
        */

        price: null,

        images: [
            "img/chaleco-parte-delantera.png",
            "img/chaleco-parte-trasera.png"
        ],

        description:
            "Gloss black hooded puffer vest featuring sculpted quilted panels, metallic DV details, reflective surface highlights and a structured streetwear silhouette.",

        details:
            "Gloss black padded construction. Hooded silhouette. Sculpted wave quilting. Silver centre zipper. DV chest emblem. DV hood details. Front hand pockets. DI OLVRE hem label."

    },


    pants: {

        id: "pants",

        name: "DV FLARE JEANS",

        color: "WASHED BLACK",

        price: 109,

        images: [
            "img/pantalones_parte_delantera.png",
            "img/pantalones_parte_trasera.png"
        ],

        description:
            "Washed black flare jeans featuring distressed detailing, paint effects, custom DV branding and an elongated flared silhouette.",

        details:
            "Washed black denim. Flared silhouette. Distressed construction. White paint detailing. Five-pocket design. Custom DV branding and hardware."

    }

};



/* ========================================
   ESTADO
======================================== */

let selectedProduct = null;

let selectedSize = null;

let currentImageIndex = 0;


let cart =
    JSON.parse(
        localStorage.getItem("diOlvreCart")
    ) || [];



/* ========================================
   ELEMENTOS
======================================== */

const body =
    document.body;


const header =
    document.getElementById("header");


const preloader =
    document.getElementById("preloader");


const overlay =
    document.getElementById("overlay");



/* MENU */

const menuPanel =
    document.getElementById("menuPanel");


const menuButton =
    document.getElementById("menuButton");


const closeMenu =
    document.getElementById("closeMenu");



/* SEARCH */

const searchOverlay =
    document.getElementById("searchOverlay");


const searchButton =
    document.getElementById("searchButton");


const closeSearch =
    document.getElementById("closeSearch");


const searchInput =
    document.getElementById("searchInput");


const searchResults =
    document.getElementById("searchResults");



/* PRODUCT */

const productModal =
    document.getElementById("productModal");


const closeProduct =
    document.getElementById("closeProduct");


const modalProductImage =
    document.getElementById("modalProductImage");


const modalProductName =
    document.getElementById("modalProductName");


const modalProductPrice =
    document.getElementById("modalProductPrice");


const modalDescription =
    document.getElementById("modalDescription");


const modalDetails =
    document.getElementById("modalDetails");


const previousImage =
    document.getElementById("previousImage");


const nextImage =
    document.getElementById("nextImage");


const galleryCounter =
    document.getElementById("galleryCounter");


const addToCart =
    document.getElementById("addToCart");



/* CART */

const cartPanel =
    document.getElementById("cartPanel");


const cartButton =
    document.getElementById("cartButton");


const closeCart =
    document.getElementById("closeCart");


const cartItems =
    document.getElementById("cartItems");


const cartCount =
    document.getElementById("cartCount");


const cartTotal =
    document.getElementById("cartTotal");





/* ========================================
   PRIVATE DROP ACCESS
   Password temporal: root
   Esto solo protege visualmente una web estática.
======================================== */

const DROP_ACCESS_PASSWORD =
    "root";


const dropGate =
    document.getElementById(
        "dropGate"
    );


const dropGateForm =
    document.getElementById(
        "dropGateForm"
    );


const dropGatePassword =
    document.getElementById(
        "dropGatePassword"
    );


const dropGateSubmit =
    document.getElementById(
        "dropGateSubmit"
    );


const dropGateMessage =
    document.getElementById(
        "dropGateMessage"
    );


const dropGateField =
    document.querySelector(
        ".drop-gate-field"
    );


function unlockDropGate() {

    sessionStorage.setItem(
        "diOlvreDropAccess",
        "granted"
    );


    dropGateMessage.textContent =
        "ACCESS GRANTED";


    dropGateMessage.classList.add(
        "success"
    );


    dropGateSubmit.disabled =
        true;


    dropGateSubmit.textContent =
        "ENTERING";


    setTimeout(() => {

        dropGate.classList.add(
            "unlocked"
        );


        body.classList.remove(
            "drop-gate-open"
        );


        setTimeout(() => {

            dropGate.setAttribute(
                "aria-hidden",
                "true"
            );

        }, 750);

    }, 420);

}


if (
    sessionStorage.getItem(
        "diOlvreDropAccess"
    ) === "granted"
) {

    dropGate.classList.add(
        "unlocked"
    );


    dropGate.setAttribute(
        "aria-hidden",
        "true"
    );

} else {

    body.classList.add(
        "drop-gate-open"
    );


    setTimeout(() => {

        dropGatePassword.focus();

    }, 250);

}


dropGateForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const password =
            dropGatePassword.value.trim();


        dropGateMessage.classList.remove(
            "success"
        );


        dropGateField.classList.remove(
            "error"
        );


        if (
            password ===
            DROP_ACCESS_PASSWORD
        ) {

            unlockDropGate();

            return;

        }


        dropGateMessage.textContent =
            "INCORRECT PASSWORD";


        dropGateField.classList.add(
            "error"
        );


        dropGatePassword.value =
            "";


        dropGatePassword.focus();


        setTimeout(() => {

            dropGateField.classList.remove(
                "error"
            );

        }, 420);

    }
);


/* ========================================
   PRELOADER
======================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add(
            "hidden"
        );

    }, 1300);

});



/* ========================================
   HEADER
======================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

});



/* ========================================
   PARALLAX HERO
======================================== */

window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;


    document
        .querySelectorAll("[data-parallax]")
        .forEach(element => {

            const speed =
                Number(
                    element.dataset.parallax
                );


            const movement =
                scroll *
                speed *
                0.01;


            /*
            El chaleco necesita conservar
            el translateX(-50%)
            */

            if (
                element.classList.contains(
                    "hero-vest"
                )
            ) {

                element.style.transform =
                    `translateX(-50%) translateY(${movement}px)`;

            } else {

                element.style.transform =
                    `translateY(${movement}px)`;

            }

        });

});



/* ========================================
   REVEAL
======================================== */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });



/* ========================================
   HOVER FRONT / BACK
======================================== */

document
    .querySelectorAll(".product-card")
    .forEach(card => {

        const image =
            card.querySelector(
                ".product-image"
            );


        card.addEventListener(
            "mouseenter",
            () => {

                image.src =
                    image.dataset.back;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.src =
                    image.dataset.front;

            }
        );

    });



/* ========================================
   ABRIR PRODUCTO
======================================== */

document
    .querySelectorAll(".product-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                openProduct(
                    card.dataset.product
                );

            }
        );

    });



document
    .querySelectorAll(".product-open")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openProduct(
                    button.dataset.product
                );

            }
        );

    });



function openProduct(productId) {

    selectedProduct =
        products[productId];


    selectedSize = null;

    currentImageIndex = 0;


    modalProductName.textContent =
        selectedProduct.name;


    if (
        selectedProduct.price === null
    ) {

        modalProductPrice.textContent =
            "PRICE TBA";


        addToCart.disabled =
            true;


        addToCart.textContent =
            "COMING SOON";

    } else {

        modalProductPrice.textContent =
            `€${selectedProduct.price}`;


        addToCart.disabled =
            false;


        addToCart.textContent =
            "ADD TO BAG";

    }


    modalDescription.textContent =
        selectedProduct.description;


    modalDetails.textContent =
        selectedProduct.details;


    document
        .querySelectorAll(
            ".size-options button"
        )
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    updateGallery();


    productModal.classList.add(
        "active"
    );


    body.classList.add(
        "no-scroll"
    );

}



function closeProductModal() {

    productModal.classList.remove(
        "active"
    );


    body.classList.remove(
        "no-scroll"
    );

}



closeProduct.addEventListener(
    "click",
    closeProductModal
);



/* ========================================
   GALERÍA PRODUCTO
======================================== */

function updateGallery() {

    if (!selectedProduct) {

        return;

    }


    modalProductImage.style.opacity =
        "0";


    setTimeout(() => {

        modalProductImage.src =
            selectedProduct.images[
                currentImageIndex
            ];


        modalProductImage.style.opacity =
            "1";

    }, 120);


    galleryCounter.textContent =
        `${currentImageIndex + 1} / ${selectedProduct.images.length}`;

}



nextImage.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {

            return;

        }


        currentImageIndex++;


        if (
            currentImageIndex >=
            selectedProduct.images.length
        ) {

            currentImageIndex = 0;

        }


        updateGallery();

    }
);



previousImage.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {

            return;

        }


        currentImageIndex--;


        if (
            currentImageIndex < 0
        ) {

            currentImageIndex =
                selectedProduct.images.length - 1;

        }


        updateGallery();

    }
);



/* ========================================
   TALLAS
======================================== */

document
    .querySelectorAll(
        ".size-options button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".size-options button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                selectedSize =
                    button.dataset.size;

            }
        );

    });



/* ========================================
   AÑADIR AL CARRITO
======================================== */

addToCart.addEventListener(
    "click",
    () => {

        if (
            !selectedProduct ||
            selectedProduct.price === null
        ) {

            return;

        }


        if (!selectedSize) {

            alert(
                "Selecciona una talla."
            );

            return;

        }


        const item = {

            id:
                Date.now(),

            productId:
                selectedProduct.id,

            name:
                selectedProduct.name,

            size:
                selectedSize,

            price:
                selectedProduct.price,

            image:
                selectedProduct.images[0]

        };


        cart.push(item);


        saveCart();

        renderCart();


        closeProductModal();

        openCartPanel();

    }
);



/* ========================================
   GUARDAR CARRITO
======================================== */

function saveCart() {

    localStorage.setItem(

        "diOlvreCart",

        JSON.stringify(cart)

    );

}



/* ========================================
   MOSTRAR CARRITO
======================================== */

function renderCart() {

    cartItems.innerHTML = "";


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                YOUR BAG IS EMPTY.
            </p>

        `;

    }


    cart.forEach(item => {

        const element =
            document.createElement(
                "div"
            );


        element.classList.add(
            "cart-item"
        );


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    SIZE: ${item.size}
                </p>

                <p>
                    €${item.price}
                </p>

            </div>

            <button
                type="button"
                onclick="removeCartItem(${item.id})"
            >
                REMOVE
            </button>

        `;


        cartItems.appendChild(
            element
        );

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum + item.price,

            0

        );


    cartCount.textContent =
        cart.length;


    cartTotal.textContent =
        `€${total}`;

}



/* ========================================
   ELIMINAR PRODUCTO
======================================== */

function removeCartItem(id) {

    cart =
        cart.filter(

            item =>
                item.id !== id

        );


    saveCart();

    renderCart();

}



/* ========================================
   ABRIR / CERRAR CARRITO
======================================== */

function openCartPanel() {

    cartPanel.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );


    body.classList.add(
        "no-scroll"
    );

}



function closeCartPanel() {

    cartPanel.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );


    body.classList.remove(
        "no-scroll"
    );

}



cartButton.addEventListener(
    "click",
    openCartPanel
);



closeCart.addEventListener(
    "click",
    closeCartPanel
);



/* ========================================
   MENÚ
======================================== */

menuButton.addEventListener(
    "click",
    () => {

        menuPanel.classList.add(
            "active"
        );


        overlay.classList.add(
            "active"
        );


        body.classList.add(
            "no-scroll"
        );

    }
);



function closeMenuPanel() {

    menuPanel.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );


    body.classList.remove(
        "no-scroll"
    );

}



closeMenu.addEventListener(
    "click",
    closeMenuPanel
);



document
    .querySelectorAll(
        ".menu-panel nav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenuPanel
        );

    });



/* ========================================
   SEARCH
======================================== */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "active"
            );


            body.classList.add(
                "no-scroll"
            );


            setTimeout(
                () =>
                    searchInput.focus(),

                100
            );

        }
    );

}



closeSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.remove(
            "active"
        );


        body.classList.remove(
            "no-scroll"
        );

    }
);



searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput
                .value
                .trim()
                .toLowerCase();


        searchResults.innerHTML =
            "";


        if (!query) {

            return;

        }


        const matches =
            Object
                .values(products)
                .filter(product => {

                    return (

                        product.name
                            .toLowerCase()
                            .includes(query)

                        ||

                        product.color
                            .toLowerCase()
                            .includes(query)

                    );

                });


        if (
            matches.length === 0
        ) {

            searchResults.innerHTML = `

                <p
                    style="
                        font-size: 10px;
                        color: #777;
                        padding: 20px 0;
                    "
                >
                    NO PRODUCTS FOUND.
                </p>

            `;


            return;

        }


        matches.forEach(product => {

            const result =
                document.createElement(
                    "button"
                );


            result.classList.add(
                "search-result"
            );


            const priceText =
                product.price === null
                    ? "PRICE TBA"
                    : `€${product.price}`;


            result.innerHTML = `

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                >

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <small>
                        ${product.color}
                    </small>

                </div>

                <span class="search-result-price">
                    ${priceText}
                </span>

            `;


            result.addEventListener(
                "click",
                () => {

                    searchOverlay
                        .classList
                        .remove("active");


                    openProduct(
                        product.id
                    );

                }
            );


            searchResults.appendChild(
                result
            );

        });

    }
);



/* ========================================
   OVERLAY
======================================== */

overlay.addEventListener(
    "click",
    () => {

        closeCartPanel();

        closeMenuPanel();

    }
);



/* ========================================
   ESC
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeCartPanel();

        closeMenuPanel();


        searchOverlay.classList.remove(
            "active"
        );


        productModal.classList.remove(
            "active"
        );


        body.classList.remove(
            "no-scroll"
        );

    }
);



/* ========================================
   NEWSLETTER
======================================== */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


const newsletterMessage =
    document.getElementById(
        "newsletterMessage"
    );



newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        newsletterMessage.textContent =
            "WELCOME TO DI OLVRE.";


        newsletterForm.reset();

    }
);



/* ========================================
   INICIAR
======================================== */

renderCart();