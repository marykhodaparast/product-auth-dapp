// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProductRegistry {
    struct Product {
        string productId;
        string name;
        uint256 price;
        address manufacturer;
        bool exists;
        bool isFake;
    }

    mapping(string => Product) products;

    address public owner;

    event ProductAdded(
        string productId,
        string name,
        uint256 price,
        address manufacturer
    );

    event ProductReportedFake(string productId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function isProductExist(
        string memory productId
    ) public view returns (bool) {
        return products[productId].exists;
    }

    function addProduct(
        string memory productId,
        string memory name,
        uint256 price
    ) public {
        require(!products[productId].exists, "Product already exists");
        require(bytes(productId).length > 0, "Product ID is required");
        require(bytes(name).length > 0, "Name is required");
        require(price > 0, "Invalid price");

        products[productId] = Product({
            productId: productId,
            name: name,
            price: price,
            manufacturer: msg.sender,
            exists: true,
            isFake: false
        });

        emit ProductAdded(productId, name, price, msg.sender);
    }

    function getProduct(
        string memory productId
    ) public view returns (Product memory) {
        require(products[productId].exists, "Product not found");

        return products[productId];
    }

    function reportFake(string memory productId) public onlyOwner {
        require(products[productId].exists, "Product not found");

        products[productId].isFake = true;

        emit ProductReportedFake(productId);
    }
}
