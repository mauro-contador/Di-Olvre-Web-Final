const products = {

    hoodie: {

        id: "hoodie",

        name: "DV ZIP HOODIE",

        price: 119,

        images: [
            "img/sudadera_parte_delantera.png",
            "img/sudadera_parte_trasera.png"
        ],

        description:
            "Heavyweight washed charcoal zip hoodie with custom metallic DV hardware, pink hood lining and signature diagonal zipper construction.",

        details:
            "Heavyweight cotton fleece. Washed charcoal finish. Pink hood lining. Silver metal hardware. Full front zipper. Decorative diagonal zippers. Ribbed cuffs and waistband. Custom DV back artwork."

    },


    pants: {

        id: "pants",

        name: "DV FLARE JEANS",

        price: 109,

        images: [
            "img/pantalones_parte_delantera.png",
            "img/pantalones_parte_trasera.png"
        ],

        description:
            "Washed black flare jeans featuring distressed details, paint splashes, custom DV branding and an elongated wide-leg silhouette.",

        details:
            "Washed black denim. Flared silhouette. Distressed construction. White paint detailing. Five-pocket construction. Custom DV details. Wide hem opening."

    }

};



let selectedProduct = null;

let selectedSize = null;

let currentImageIndex = 0;

let cart =
    JSON.parse(
        localStorage.getItem("diOlvreCart")
    ) || [];



/* =========================
   ELEMENTOS
========================= */

const overlay =
    document.getElementById("overlay");


const menuPanel =
    document.getElementById("menuPanel");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");


const searchOverlay =
    document.getElementById("searchOverlay");

const searchButton =
    document.getElementById("searchButton");

const closeSearch =
    document.getElementById("closeSearch");


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



/* =========================
   HOVER PRODUCTOS
========================= */

document
    .querySelectorAll(".product-card")
    .forEach(card => {

        const image =
            card.querySelector(".product-image");


        card.addEventListener("mouseenter", () => {

            image.src =
                image.dataset.back;

        });


        card.addEventListener("mouseleave", () => {

            image.src =
                image.dataset.front;

        });

    });



/* =========================
   ABRIR PRODUCTO
========================= */

document
    .querySelectorAll(".product-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            openProduct(
                card.dataset.product
            );

        });

    });



document
    .querySelectorAll(".product-open")
    .forEach(button => {

        button.addEventListener("click", () => {

            openProduct(
                button.dataset.product
            );

        });

    });



function openProduct(productId) {

    selectedProduct =
        products[productId];

    selectedSize = null;

    currentImageIndex = 0;


    modalProductName.textContent =
        selectedProduct.name;

    modalProductPrice.textContent =
        `€${selectedProduct.price}`;

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


    updateProductImage();


    productModal.classList.add(
        "active"
    );


    document.body.classList.add(
        "no-scroll"
    );

}



function closeProductModal() {

    productModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}



closeProduct.addEventListener(
    "click",
    closeProductModal
);



/* =========================
   GALERÍA
========================= */

function updateProductImage() {

    modalProductImage.src =
        selectedProduct.images[
            currentImageIndex
        ];


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


        updateProductImage();

    }
);



previousImage.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {
            return;
        }


        currentImageIndex--;


        if (currentImageIndex < 0) {

            currentImageIndex =
                selectedProduct.images.length - 1;

        }


        updateProductImage();

    }
);



/* =========================
   TALLAS
========================= */

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
                    .forEach(btn => {

                        btn.classList.remove(
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



/* =========================
   AÑADIR AL CARRITO
========================= */

addToCart.addEventListener(
    "click",
    () => {

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



/* =========================
   CARRITO
========================= */

function openCartPanel() {

    cartPanel.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

    document.body.classList.add(
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

    document.body.classList.remove(
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



function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                YOUR BAG IS EMPTY.
            </p>
        `;

    }


    cart.forEach(item => {

        const element =
            document.createElement("div");


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



function removeCartItem(id) {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveCart();

    renderCart();

}



function saveCart() {

    localStorage.setItem(
        "diOlvreCart",
        JSON.stringify(cart)
    );

}



/* =========================
   MENU
========================= */

menuButton.addEventListener(
    "click",
    () => {

        menuPanel.classList.add(
            "active"
        );

        overlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }
);



closeMenu.addEventListener(
    "click",
    closeMenuPanel
);



function closeMenuPanel() {

    menuPanel.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}



document
    .querySelectorAll(
        ".main-nav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenuPanel
        );

    });



/* =========================
   SEARCH
========================= */

searchButton.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }
);



closeSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }
);



/* =========================
   OVERLAY
========================= */

overlay.addEventListener(
    "click",
    () => {

        closeCartPanel();

        closeMenuPanel();

    }
);



/* =========================
   NEWSLETTER
========================= */

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
            "YOU'RE ON THE LIST.";


        newsletterForm.reset();

    }
);



/* =========================
   INICIALIZAR
========================= */

renderCart();