// Product class with constructor and properties.
class Product {
    constructor(title, image, description, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }
}

// ElementAttribute class with constructor and properties.
class ElementAttribute {
    constructor(attributeName, attributeValue) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }
}

// Component class with constructor and createRootElement method.
class Component {
    constructor(renderHookId, shouldRender = true) {
        this.renderHookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() { }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);

        if (cssClasses) {
            rootElement.className = cssClasses;
        }

        if (attributes && attributes.length > 0) {
            for (const attribute of attributes) {
                rootElement.setAttribute(attribute.attributeName, attribute.attributeValue);
            }
        }

        document.getElementById(this.renderHookId).append(rootElement);
        return rootElement;
    }
}

// ProductItem class with constructor and render method.
class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    // Get access to the add to cart button via the event listener, and add the product to the cart.
    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const productItem = this.createRootElement('li', 'product-item');
        productItem.innerHTML = `
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
        const addCartButton = productItem.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
}

// ProductList class with constructor and render method.
class ProductList extends Component {
    products = [];

    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
    }

    //This could be a DB or API call to obtain the data.
    fetchProducts() {
        this.products = [
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
        this.renderProducts();
    }

    renderProducts() {
        for (const product of this.products) {
            new ProductItem(product, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        if (this.products && this.products.length > 0) {
            this.renderProducts();
        }
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

    constructor(renderHookId) {
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log('Ordering...');
            console.log(this.items);
        };
        this.render();
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;

        console.log(product.title + ' added to cart!');
    }

    render() {
        const cartElement = this.createRootElement('section', 'cart');
        cartElement.innerHTML = `<h2>Total: \$${0}</h2><button>Order Now!</button>`;
        const orderButton = cartElement.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts);
        this.totalOutput = cartElement.querySelector('h2');
    }
}

// Shop class with constructor and render method.
class Shop {
    constructor() {
        this.render();
    }

    render() {
        this.shoppingCart = new ShoppingCart('app');
        new ProductList('app');
    }
}

// App class with init and addProductToCart method.
class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();