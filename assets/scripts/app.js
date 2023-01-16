const product = {
    products: [
        {
            title: 'Flowers',
            imageUrl: 'https://picsum.photos/id/25/5000/3333',
            description: 'Beautiful flowers!',
            price: 19.99
        },
        {
            title: 'Office Setup',
            imageUrl: 'https://picsum.photos/id/26/4209/2769',
            description: 'Cool office setup!',
            price: 89.99
        }
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div class="product">
                    <img src="${prod.imageUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>    
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
};

product.render();

