"use strict";

const getSelectedProduct = (src) => {
    let selected = [];
    if (src === "images/biscotti.jpg") {
        selected = ["biscotti", 1.95, "Biscotti"];
    } else if (src === "images/cappuccino.jpg") {
        selected = ["cappuccino", 3.45, "Cappuccino"];
    } else if (src === "images/latte.jpg") {
        selected = ["latte", 2.95, "Latte"];
    } else if (src === "images/espresso.jpg") {
        selected = ["espresso", 1.95, "Espresso"];
    } else if (src === "images/coffee.jpg") {
        selected = ["coffee", 1.75, "Drip Coffee"];
    } else if (src === "images/scone.jpg") {
        selected = ["scone", 2.95, "Scone"];
    }
    return selected;
};

$(document).ready(function() {
    // Preload images
    var images = ["espresso_info.jpg", "latte_info.jpg", "cappuccino_info.jpg", "coffee_info.jpg", "biscotti_info.jpg", "scone_info.jpg"];
    images.forEach(function(img) {
        $("<img />").attr("src", "images/" + img);
    });

    // Handle image hover
    $("#menu img").hover(function() {
        var src = $(this).attr("src").replace(".jpg", "_info.jpg");
        $(this).attr("src", src);
    }, function() {
        var src = $(this).attr("src").replace("_info.jpg", ".jpg");
        $(this).attr("src", src);
    });

    // Handle image click
    $("#menu img").click(function() {
        var src = $(this).attr("src");
        var product = getSelectedProduct(src);
        var item = product[2];
        var price = product[1];
        $("#order").append("<option data-price='" + price + "'>" + item + ": $" + price.toFixed(2) + "</option>");
        updateTotal();
    });

    // Handle Place Order button click
    $("#place_order").click(function() {
        if ($("#order option").length > 0) { // Check if there are items in the order
            window.location.href = "checkout.html"; // Redirect to checkout page
        } else {
            alert("Your order is empty. Please add items to your order before checking out."); // Alert user if order is empty
        }
    });

    // Handle Clear Order button click
    $("#clear_order").click(function() {
        $("#order").empty();
        updateTotal();
    });

    // Function to update total
    function updateTotal() {
        var total = 0;
        $("#order option").each(function() {
            total += parseFloat($(this).data("price"));
        });
        $("#total").text("$" + total.toFixed(2));
    }
});
