const products = {

    hoodie: {

        id: "hoodie",

        name: "DV ZIP HOODIE",

        price: 119,

        image: "img/hoodie-front.jpg",

        description:
            "Heavyweight washed charcoal zip hoodie with custom metallic hardware, oversized hood and structured streetwear fit.",

        details:
            "Heavyweight cotton fleece. Washed charcoal finish. Custom silver hardware. Full front zipper. Decorative V-shaped metal zippers. Pink hood lining. Ribbed cuffs and waistband."

    },

    pants: {

        id: "pants",

        name: "DV STREET PANTS",

        price: 99,

        image: "img/pants-front.jpg",

        description:
            "Wide-leg streetwear pants featuring contrast stitching, custom DV hardware and a relaxed structured silhouette.",

        details:
            "Heavyweight cotton construction. Wide straight-leg fit. Contrast stitching. Custom DV metal emblem. Side pockets. Rear pockets. Custom graphics."

    }

};



let selectedProduct = null;

let selectedSize = null;

let cart = JSON.parse(localStorage.getItem("diOlvreCart")) || [];



const cartElement = document.getElementById("cart");

const cartButton = document.getElementById("cartButton");

const closeCart = document.getElementById("closeCart");

const pageOverlay = document.getElementById("pageOverlay");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");



const productModal = document.getElementById("productModal");

const closeProduct = document.getElementById("closeProduct");

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

const addToCartButton =
    document.getElementById("addToCart");



const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMenu =
    document.getElementById("closeMenu");



const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");



/* =========================
   PRODUCT HOVER
========================= */

document.querySelectorAll(".product-card").forEach(card => {

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
   OPEN PRODUCT
========================= */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", () => {

        const productId =
            card.dataset.product;

        openProduct(productId);

    });

});



function openProduct(productId) {

    selectedProduct =
        products[productId];

    selectedSize = null;


    modalProductImage.src =
        selectedProduct.image;

    modalProductName.textContent =
        selectedProduct.name;

    modalProductPrice.textContent =
        `€${selectedProduct.price}`;

    modalDescription.textContent =
        selectedProduct.description;

    modalDetails.textContent =
        selectedProduct.details;


    document
        .querySelectorAll(".size-buttons button")
        .forEach(button => {

            button.classList.remove("selected");

        });


    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}



closeProduct.addEventListener("click", () => {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

});



/* =========================
   SIZE SELECTOR
========================= */

document
    .querySelectorAll(".size-buttons button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".size-buttons button")
                .forEach(btn => {

                    btn.classList.remove("selected");

                });


            button.classList.add("selected");


            selectedSize =
                button.dataset.size;

        });

    });



/* =========================
   ADD TO CART
========================= */

addToCartButton.addEventListener("click", () => {

    if (!selectedSize) {

        alert("Select a size.");

        return;

    }


    const cartProduct = {

        id:
            Date.now(),

        productId:
            selectedProduct.id,

        name:
            selectedProduct.name,

        price:
            selectedProduct.price,

        image:
            selectedProduct.image,

        size:
            selectedSize

    };


    cart.push(cartProduct);


    saveCart();

    renderCart();


    productModal.classList.remove("active");

    openCart();

});



/* =========================
   CART
========================= */

cartButton.addEventListener("click", openCart);


closeCart.addEventListener("click", closeCartPanel);


function openCart() {

    cartElement.classList.add("active");

    pageOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCartPanel() {

    cartElement.classList.remove("active");

    pageOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


pageOverlay.addEventListener("click", () => {

    closeCartPanel();

    mobileMenu.classList.remove("active");

});



/* =========================
   RENDER CART
========================= */

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

        const itemElement =
            document.createElement("div");


        itemElement.classList.add("cart-item");


        itemElement.innerHTML = `

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
                class="remove-item"
                onclick="removeFromCart(${item.id})"
            >
                REMOVE
            </button>

        `;


        cartItems.appendChild(itemElement);

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



function removeFromCart(id) {

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
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    mobileMenu.classList.add("active");

    pageOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

});


closeMenu.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    pageOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

});


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            pageOverlay.classList.remove("active");

            document.body.classList.remove("no-scroll");

        });

    });



/* =========================
   SEARCH
========================= */

searchButton.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

});



/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();


    const email =
        document.getElementById("newsletterEmail").value;


    newsletterMessage.textContent =
        "YOU'RE ON THE LIST.";


    console.log(
        "Newsletter:",
        email
    );


    newsletterForm.reset();

});



/* =========================
   INITIALIZE
========================= */

renderCart();