// Product class with constructor and properties.
class Product {
    constructor(title, image, description, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }
}

// Component class with constructor and createRootElement method.
class Component {
    constructor(renderHookId) {
        this.renderHookId = renderHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);

        if (cssClasses) {
            rootElement.className = cssClasses;
        }

        if (attributes && attributes.length > 0) {
            for (const attribute of attributes) {
                rootElement.setAttribute(attribute.name, attribute.value);
            }
        }

        document.getElementById(this.renderHookId).append(rootElement);
        return rootElement;
    }
}

class ElementAttribute {
    constructor(attributeName, attributeValue) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }
}

// ProductItem class with constructor and render method.
class ProductItem {
    constructor(product) {
        this.product = product;
    }

    // Get access to the add to cart button via the event listener, and add the product to the cart.
    addToCart() {
        App.addProductToCart(this.product);
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

    render() {
        const productListElement = document.createElement('ul');
        productListElement.className = 'product-list';
        for (const product of this.products) {
            const productItem = new ProductItem(product);
            const productItemElement = productItem.render();
            productListElement.append(productItemElement);
        }
        return productListElement;
    }
}

// ShoppingCart class with constructor and render, addProduct method.
class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        return this.items.reduce((previousValue, currentItem) => previousValue + currentItem.price, 0);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;

        console.log(product.title + ' added to cart!');
    }

    render() {
        const cartElement = this.createRootElement('section', 'cart');
        cartElement.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;        
        this.totalOutput = cartElement.querySelector('h2');

        return cartElement;
    }
}

// Shop class with constructor and render method.
class Shop {
    render() {
        const renderHook = document.getElementById('app');

        this.shoppingCart = new ShoppingCart();
        const shoppingCartElement = this.shoppingCart.render();

        const productList = new ProductList();
        const productListElement = productList.render();

        renderHook.append(shoppingCartElement);
        renderHook.append(productListElement);
    }
}

// App class with init and addProductToCart method.
class App {
    static shoppingCart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.shoppingCart = shop.shoppingCart;
    }

    static addProductToCart(product) {
        this.shoppingCart.addProduct(product);
    }
}

App.init();