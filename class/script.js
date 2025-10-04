class Item {
    itemName;
    itemStock;
    itemPrice;
    itemDesc;

    // Constructor
    constructor(name, stock, price, description) {
        this.itemName = name;
        this.itemStock = stock;
        this.itemPrice = price;
        this.itemDesc = description;
    }

    // Member function to display item details
    displayItem() {
        return `
            <div class="item-card">
                <h3>Item Name: ${this.itemName}</h3>
                <p><strong>In Stock:</strong> ${this.itemStock}</p>
                <p><strong>Item Price:</strong> $${this.itemPrice.toFixed(2)}</p>
                <p><strong>Description:</strong> ${this.itemDesc}</p>
            </div>
        `;
    }

    // Getter methods
    getName() {
        return this.itemName;
    }

    getStock() {
        return this.itemStock;
    }

    getPrice() {
        return this.itemPrice;
    }

    getDesc() {
        return this.itemDesc;
    }

    // Setter method
    setPrice(newPrice) {
        if (newPrice >= 0) { // Basic validation
            this.itemPrice = newPrice;
            console.log(`Price for ${this.itemName} updated to $${newPrice.toFixed(2)}.`);
            return true; // Indicate success
        } else {
            console.error("Price cannot be negative."); // Use console.error for errors
            return false; // Indicate failure
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const itemDetailsContainer = document.getElementById('item-details-container');

    // Create an Item object
    const apple = new Item("Apple", 100, 0.99, "Granny Smith Apple");

    // Display item details
    itemDetailsContainer.innerHTML += apple.displayItem();
});