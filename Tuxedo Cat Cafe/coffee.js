//Eliseo Lopez-Garza
//4/24/2024
//Mrs. Hacker
//IST-226-B1Y

"use strict";

$(document).ready(function() {
    // Preload rollover images
    var rolloverImages = ["espresso_info.jpg", "latte_info.jpg", "cappuccino_info.jpg", "coffee_info.jpg", "biscotti_info.jpg", "scone_info.jpg"];
    rolloverImages.forEach(function(img) {
        $("<img>").attr("src", "images/" + img);
    });

    // Handle image hover
    $("#menu img").hover(function() {
        var $img = $(this);
        var id = $img.attr("id");
        var description = $img.data("description");
        var price = $img.data("price");
        $img.attr("src", "images/" + id + "_info.jpg");
        $img.after;}, function() {
        var $img = $(this);
        var id = $img.attr("id");
        $img.attr("src", "images/" + id + ".jpg");
        $img.next("p").remove();
    });

    // Handle image click
    $("#menu img").click(function() {
        var $img = $(this);
        var id = $img.attr("id");
        var description = $img.data("description");
        var price = $img.data("price");
        $("#order").append("<option>" + description + ": $" + price.toFixed(2) + "</option>");
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
            total += parseFloat($(this).text().split("$")[1]);
        });
        $("#total").text("Total: $" + total.toFixed(2));
    }
});
