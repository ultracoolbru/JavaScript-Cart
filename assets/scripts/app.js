// Product class with constructor and properties.
class Product {
    constructor(title, image, description, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }
}

// ProductItem class with constructor and render method.
class ProductItem {
    constructor(product) {
        this.product = product;
    }

    // Get access to the add to cart button via the event listener.
    addToCart() {
        console.log('Added to cart!');
        console.log(this.product);
    }

    render() {
        const productItemElement = document.createElement('li');
        productItemElement.className = 'product-item';
        productItemElement.innerHTML = `
                <div class="product">
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>    
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;

        // Because there is only one button per product, querySelector is fine.
        const addCartButton = productItemElement.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));

        return productItemElement;
    }
}

// ProductList class with constructor and render method.
class ProductList {
    products = [
        new Product(
            'Flowers',
            'https://picsum.photos/id/25/5000/3333',
            'Beautiful flowers!',
            19.99
        ),
        new Product(
            'Office Setup',
            'https://picsum.photos/id/26/4209/2769',
            'Cool office setup!',
            89.99
        )
    ];

    // constructor() {}

    render() {
        const renderHook = document.getElementById('app');
        const productListElement = document.createElement('ul');
        productListElement.className = 'product-list';
        for (const product of this.products) {
            const productItem = new ProductItem(product);
            const productItemElement = productItem.render();
            productListElement.append(productItemElement);
        }
        renderHook.append(productListElement);
    }
}

class ShoppingCart {
    items = [];

    render() {
        const cartElement = document.createElement('section');
        cartElement.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        cartElement.className = 'cart';
        return cartElement;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart();
        const cartElement = this.cart.render();
        const productList = new ProductList();
        const productListElement = productList.render();

        renderHook.append(cartElement);
        renderHook.append(productListElement);
    }
}

const shop = new Shop();
shop.render();