!function(a,b){"use strict";var c={productChosen:function(b,c){var d=b.closest(".subscription"),c=d.data("productId"),e=d.data("forceAnonymous"),f=d.find(".product-name").text(),g=d.find(".product-price").text();if(a(".chosen-subscription").first().find(".product-name").text("Selected: "+f).end().find(".product-price").text(g).end().find(".anonymous-checkbox-input").attr("checked",e).attr("disabled",e).end().data("productId",c),e){var h=a(".chosen-subscription").first().find(".anonymous-checkbox > label");h.text(h.text()+" (mandatory for your user group)")}a(".subscription, .cold-open").fadeOut(function(){a(".chosen-subscription").fadeIn()})},productChoiceCancel:function(){a(".chosen-subscription").fadeOut(function(){a(".subscription, .cold-open").fadeIn()})},continueToPaypal:function(c){c.find("button").attr("disabled","disabled").end().find(".spinner-inline").show();var d=function(){c.find("button").attr("disabled",!1).end().find(".spinner-inline").hide()},e={productId:c.data("productId")};c.find(".anonymous-checkbox-input").is(":checked")&&(e.isAnonymous=!0),a.ajax({url:"/subscribe/purchase/",method:"POST",dataType:"json",data:e}).done(function(e){if(e.success===!0)b.location=e.redirectLink;else{d();var f=a("<p></p>").text(e.error);c.find(".transaction-error").empty().append(f).append('<p>Sorry about that. Please <a href="">contact us</a> for assistance.</p>').show()}}).fail(function(){d(),c.find(".transaction-error").empty().append('<p>An unknown error occurred. Sorry about that. Please <a href="http://www.neowin.net/contact">contact us</a> for assistance.</p>').show()})},executePayment:function(b){var c=a("input[name=paymentId]").val(),d=a("input[name=payerId]").val();a(".success-status").text("Communicating with PayPal..."),a.ajax({url:"/subscribe/purchase/execute",method:"POST",dataType:"json",data:{paymentId:c,payerId:d}}).done(function(c){a(".success-status").text("Your subscription has been activated. Thank you!"),b.find(".success-page-loading").hide()}).fail(function(c){c.responseJSON?a(".success-status").text(c.responseJSON.error):a(".success-status").text("An error occurred completing your payment."),b.find(".success-page-loading").hide()})}};a(function(){a(".subscription-products-page").length>0&&1===a(".subscription-products-page").data("loggedIn")&&(a(".buy-subscription").on("click tap",function(){c.productChosen(a(this).closest(".subscription"))}),a(".return-to-products").on("click tap",function(){c.productChoiceCancel()}),a(".continue-to-payment").on("click tap",function(){c.continueToPaypal(a(this).closest(".chosen-subscription"))}),a(".anonymous-checkbox-help").on("click tap",function(b){return a(".anonymous-checkbox-help-content").slideDown(),b.stopPropagation(),b.preventDefault(),!1})),a(".subscription-success-page").length>0&&c.executePayment(a(".subscription-success-page"))})}(jQuery,window);
//# sourceMappingURL=sourcemap.map
