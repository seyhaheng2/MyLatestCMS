var nw = {},
    newsOffset, moreComments = !1,
    spinnerOff = !1,
    disabledEvents, jumpToNewComment, promoslider, promos = "",
    mobile = !1;
nw.orion = {}, $(document).ready(function() {
        function a() {
            var a = $(window).scrollTop();
            Math.abs(e - a) <= f || (a > e && a > g ? ("1" != nw.orion.common.readCookie("menupinned"), $("body").addClass("show-top-link")) : a + $(window).height() < $(document).height() && ("1" != nw.orion.common.readCookie("menupinned"), $("body").removeClass("show-top-link")), e = a)
        }

        function b() {
            var a = $(window).scrollTop();
            Math.abs(e - a) <= f || (a > e && a > g ? $("body").addClass("show-top-link") : a + $(window).height() < $(document).height() && $("body").removeClass("show-top-link"), e = a)
        }

        function c(a) {
            width = window.innerWidth > 0 ? window.innerWidth : screen.width, width < 480 && (0 == mobile || 1 == a) ? (mobile = !0, destination = ".main-carousel", 0 == a && $promoslider.flickity("destroy"), promos = $("#promos").html(), 0 == a ? $(".gallery-cell").removeClass("promo gallery-cell promo--small promo--small-tall pos-1 pos-2 pos-3 pos-4 pos-5 pos-6 pos-7 pos-8").addClass("carousel-cell").appendTo(".main-carousel") : $(".gallery-cell").removeClass("promo gallery-cell promo--small promo--small-tall pos-1 pos-2 pos-3 pos-4 pos-5 pos-6 pos-7 pos-8").addClass("carousel-cell").appendTo(".flickity-slider"), $(".promo-block-image").each(function() {
                bg = $(this).css("background-image"), bg = bg.replace(/.*\s?url\([\'\"]?/, "").replace(/[\'\"]?\).*/, "").replace("small", "medium"), img = $("<img>"), img.attr("src", bg), $(this).closest("a").prepend(img)
            }), $(".promo-block").remove(), initialIndex = $(".promos .main-carousel").data("initialindex"), $promoslider = $(".promos .main-carousel").flickity({
                cellSelector: ".carousel-cell",
                cellAlign: "left",
                wrapAround: !0,
                setGallerySize: !0,
                autoPlay: 5e3,
                pageDots: !0,
                initialIndex: initialIndex
            })) : width >= 480 && (1 == mobile || 1 == a) && (mobile = !1, 0 == a && $promoslider.flickity("destroy"), promos.length > 0 && $("#promos").html(promos), initialIndex = $(".promos .main-carousel").data("initialindex"), $promoslider = $(".promos .main-carousel").flickity({
                cellSelector: ".carousel-cell",
                cellAlign: "left",
                wrapAround: !0,
                setGallerySize: !0,
                autoPlay: 5e3,
                pageDots: !0,
                initialIndex: initialIndex
            }))
        }
        nw.orion.common.init(), nw.orion.articleViewing.init(), $("html").attr("data-useragent", navigator.userAgent), $("html").attr("data-platform", navigator.platform), $("body").addClass("js-loaded"), c(!0), $(window).resize(function() {
            c(!1)
        });
        $(".gallery .main-carousel").flickity({
            cellSelector: ".carousel-cell",
            cellAlign: "left",
            wrapAround: !0,
            setGallerySize: !0,
            pageDots: !0
        });
        $(".gallery .nav-carousel").flickity({
            asNavFor: ".main-carousel",
            contain: !0,
            pageDots: !1,
            prevNextButtons: !1
        }), $(".news-list img.lazyLoad").show().lazyload({
            container: $(".news-list"),
            threshold: 100,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXu7u6DSdFtAAAAE0lEQVQ4y2MYBaNgFIyCUUBXAAAFeAABxVDVdQAAAABJRU5ErkJggg=="
        }), $("#sidebar img.lazyLoad").show().lazyload({
            container: $("#sidebar"),
            threshold: 100,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXu7u6DSdFtAAAAE0lEQVQ4y2MYBaNgFIyCUUBXAAAFeAABxVDVdQAAAABJRU5ErkJggg=="
        }), $("#nav img.lazyLoad:not([src])").each(function() {
            $(this).attr("src", $(this).data("original")).show()
        });
        var d, e = 0,
            f = 2 * $(".site-header").outerHeight(),
            g = 2 * $(".site-header").outerHeight();
        $(window).scroll(function() {
            d = !0
        }), window.location.href.indexOf("admin") == -1 ? setInterval(function() {
            d && (a(), d = !1)
        }, 250) : setInterval(function() {
            d && (b(), d = !1)
        }, 250)
    }), $.fn.center = function() {
        return this.css("position", "absolute"), this.css("top", ($(window).height() - this.height()) / 4 + "px"), this.css("left", ($(window).width() - this.width()) / 2 + "px"), this
    }, nw.orion.common = function() {
        return {
            settings: {
                googleAnalyticsId: "UA-7094499-1"
            },
            init: function() {
                nw.orion.common.settings.cookieDomain = "." + window.location.hostname.split(".").reverse()[1] + "." + window.location.hostname.split(".").reverse()[0], nw.orion.common.setAjaxDefaults(), nw.orion.common.setTriggers(), nw.orion.common.initViewSelector(), nw.orion.common.initThemeSelector(), nw.orion.common.initPinMainMenu(), nw.orion.common.initScrollNews(), nw.orion.common.initInitialScroll()
            },
            initInitialScroll: function() {
                $(".scrollto").bind("click", function(a) {
                    var b = $(this),
                        c = $(".site-header").outerHeight(),
                        d = 0;
                    d = $(".staffbar").outerHeight(), $scrollOffset = c + d, $("html, body").stop().animate({
                        scrollTop: $(b.attr("href")).offset().top - $scrollOffset
                    }, 350, "swing"), a.preventDefault()
                })
            },
            initViewSelector: function() {
                $(".news-view-switcher").on("click", "span", function() {
                    $(this).siblings().each(function() {
                        $("body").removeClass($(this).data("view-style"))
                    }), $("body").addClass($(this).data("view-style")), nw.orion.common.setCookie("view-style", $(this).data("view-style"), 365), "view-headline" == $(this).data("view-style") && nw.orion.common.appendContentPage()
                })
            },
            initPromos: function() {
                initialIndex = $(".promos .main-carousel").data("initialindex"), $promoslider = $(".promos .main-carousel").flickity({
                    cellSelector: ".carousel-cell",
                    cellAlign: "left",
                    wrapAround: !0,
                    setGallerySize: !0,
                    autoPlay: 5e3,
                    pageDots: !0,
                    initialIndex: initialIndex
                })
            },
            initPinMainMenu: function() {
                $("#menu-pin").on("click", function() {
                    $(this).toggleClass("menu-pinned"), $(this).hasClass("menu-pinned") ? nw.orion.common.setCookie("menupinned", "1", 365) : nw.orion.common.setCookie("menupinned", "0", 365), window.location.reload()
                })
            },
            initThemeSelector: function() {
                $(".theme-switcher").on("click", function() {
                    $(this).siblings().each(function() {
                        $("body").removeClass($(this).data("theme"))
                    }), $("body").addClass($(this).data("theme")), nw.orion.common.setCookie("theme", $(this).data("theme"), 365);
                    var a = (new Date).getHours();
                    a > 21 || a < 7 ? $("body").addClass("night") : $("body").addClass("day")
                })
            },
            initScrollNews: function() {
                "search" != window.location.href.split("/")[3] && (newsOffset = 1, $("#ajax-appendContentPage").on("click", function(a) {
                    $(a.currentTarget).addClass("active"), nw.orion.common.appendContentPage(a.currentTarget)
                }))
            },
            appendContentPage: function(a) {
                $.getJSON($(location).attr("href"), {
                    ajax: !0,
                    newsOffset: newsOffset
                }, function(b) {
                    "ok" == b.status && ($("#news-content").append(b.data.news).find("img.lazyLoad:not([src])").show().lazyload({
                        threshold: 100,
                        placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXu7u6DSdFtAAAAE0lEQVQ4y2MYBaNgFIyCUUBXAAAFeAABxVDVdQAAAABJRU5ErkJggg=="
                    }), newsOffset++, $(a).removeClass("active"))
                })
            },
            setAjaxDefaults: function() {
                $(document).ajaxStart(function() {
                    0 == spinnerOff && $("#ajax-spinner").fadeIn(300)
                }).ajaxStop(function() {
                    0 == spinnerOff && $("#ajax-spinner").fadeOut(300)
                }), $.ajaxSetup({
                    cache: !1,
                    dataType: "json",
                    timeout: 1e4
                })
            },
            setTriggers: function() {
                $(".modal-trigger").on("click", function(a) {
                    a.preventDefault(), nw.orion.common.launchModal($(this).attr("rel"))
                }), $(document).on("click", ".modal-close, #overlay", function() {
                    nw.orion.common.closeModals()
                }), $(".modal").on("click", function(a) {
                    a.target === this && nw.orion.common.closeModals()
                }), $(".modal").on("click", ".modal-close", function() {
                    nw.orion.common.closeModals($(this).closest(".modal"))
                }), $("a").filter(function() {
                    return this.hostname && "internal" != $(this).attr("rel") && this.hostname.split(":")[0] !== location.hostname.split(":")[0] && "static.neow.in" != this.hostname.split(":")[0] && "s3.amazonaws.com" != this.hostname.split(":")[0] || "external" == $(this).attr("rel")
                }).not(":has(img, mailto)").end().click(function(a) {
                    open(this.href), a.preventDefault()
                }), $(document).on("popup_opened.social-likes", function(a, b) {
                    ga("send", "social", b, "share", location.href)
                }), $(".nav-user-login-button").on("click", function(a) {
                    nw.orion.common.launchModal("site-signin"), a.preventDefault()
                }), $(document).on("click", "a#comment-login", function(a) {
                    nw.orion.common.launchModal("site-signin"), a.preventDefault()
                }), $(".software-toggle").on("click", function(a) {
                    nw.orion.common.toggleSoftwarenews(), a.preventDefault()
                }), $(".sponsored-toggle").on("click", function(a) {
                    nw.orion.common.toggleSponsored(), a.preventDefault()
                }), $(".profile-link").on("click", function(a) {
                    a.preventDefault(), $.getJSON($(this).attr("href"), {
                        ajax: !0
                    }, function(a) {
                        "ok" == a.status ? ($(".profile-card").empty().append(a.data), nw.orion.common.launchModal("profile-card")) : window.location.replace("http://www.neowin.net/forum/user/" + a.data)
                    })
                }), $("#profile-card").on("click", ".profile-card-actions .profile-card-pm-toggle", function(a) {
                    a.preventDefault(), $(this).toggleClass("toggled"), $(".profile-card-pm").slideToggle("normal", function() {})
                }), $("#profile-card").on("click", "button", function(a) {
                    a.preventDefault(), $.getJSON("/sendpm", {
                        ajax: !0,
                        pmto: $(this).data("pmto"),
                        pmtitle: $("input[name=pm-title]").val(),
                        pmtext: $("textarea[name=pm-text]").val(),
                        url: $(location).attr("href")
                    }, function(a) {
                        "ok" == a.status ? $("<p>Message sent.....</p>").hide().prependTo("#profile-card .profile-card-pm").slideDown().delay(1e3).slideUp("normal", function() {
                            $("#profile-card .profile-card-pm p").hide()
                        }) : nw.orion.common.ajaxError(a.data)
                    })
                }), $(".comment-list").on("click", "#comment-help", function() {
                    nw.orion.common.launchModal("pop-comment-help")
                }), $("#comment-login").on("click", function(a) {
                    nw.orion.common.launchModal("site-signin"), a.preventDefault()
                }), $("#elFullNotifications").on("click", function(a) {
                    a.preventDefault(), nw.orion.common.getNotifications($(this))
                }), $("#elFullInbox").on("click", function(a) {
                    a.preventDefault(), nw.orion.common.getMessages($(this))
                }), $(".toggle").click(function(a) {
                    a.preventDefault();
                    var b = "#" + $(this).data("toggle");
                    $(this).hasClass("toggled") ? ($(this).removeClass("toggled"), $(b).addClass("hidden"), $(b).removeClass("visible")) : ($(this).addClass("toggled"), $(b).removeClass("hidden"), $(b).addClass("visible"))
                }), $("#toggle-nav").on("click", function(a) {
                    $("body").toggleClass("nav-open"), a.stopPropagation()
                }), $(".admin-nav-toggle").on("click", function(a) {
                    $("body").toggleClass("admin-nav-open"), a.stopPropagation()
                }), $(".wrapper").on("click", function(a) {
                    a.target === this && $("body").removeClass("nav-open")
                }), $(".widget-community").on("click", ".widget-community-refresh", function(a) {
                    $(a.currentTarget).addClass("active"), spinnerOff = !0, $.getJSON("/refresh", {
                        ajax: !0
                    }, function(b) {
                        "ok" == b.status ? ($(".widget-community .widget-content ul").html(b.data), $(a.currentTarget).removeClass("active")) : nw.orion.common.ajaxError(b.data)
                    }), spinnerOff = !1
                }), $(".nav-search .search-wrapper").on("click", function() {
                    $(".nav-search .search-wrapper .search-input").focus()
                }), $(".search-input").on("blur", function() {
                    $(this).closest(".search-wrapper").removeClass("focus"), $(".site-header").removeClass("search-focus")
                }).on("focus", function() {
                    $(this).closest(".search-wrapper").addClass("focus"), $(".site-header").addClass("search-focus")
                });
                var a, b, c;
                $(".nav-menu > li.mega-parent").mouseenter(function(d) {
                    clearTimeout(a), b = setTimeout(function() {
                        $(".nav-menu > li.mega-parent").removeClass("show-menu"), $(d.currentTarget).addClass("show-menu"), $(".mega-menu-categories > li").mouseenter(function() {
                            c = "#" + $(this).data("category"), $(this).siblings().removeClass("active"), $(this).addClass("active"), $(this).closest("div").find(".mega-menu-categories-items > li").removeClass("active"), $(c).addClass("active")
                        })
                    }, 200)
                }).mouseleave(function() {
                    clearTimeout(b), a = setTimeout(function() {
                        $(".nav-menu > li.mega-parent").removeClass("show-menu")
                    }, 200)
                })
            },
            launchModal: function(a) {
                $(window).on("resize.modal", function() {
                    $("#" + a + " > div").center()
                }), $("#" + a + " > div").center(), $("#" + a).addClass("visible")
            },
            closeModals: function(a) {
                a ? ($(".image-overlays").is(":visible") && ($(".modal-content").toggleClass("d-col-8 w-col-8"), $(".image-overlays").empty().hide(), $(".overlay-buttons").hide()), $(a).removeClass("visible")) : $(".modal").removeClass("visible"), $(window).unbind("resize.modal")
            },
            ajaxError: function(a) {
                alert("Error received: " + a)
            },
            setCookie: function(a, b, c) {
                var d;
                if (c) {
                    var e = new Date;
                    e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = "; expires=" + e.toGMTString()
                } else d = "";
                document.cookie = a + "=" + b + d + "; path=/; domain=" + nw.orion.common.settings.cookieDomain
            },
            readCookie: function(a) {
                for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                    for (var e = c[d];
                        " " == e.charAt(0);) e = e.substring(1, e.length);
                    if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
                }
                return null
            },
            eraseCookie: function(a) {
                nw.orion.common.setCookie(a, "", -1)
            },
            getNotifications: function(a) {
                $.getJSON(a.attr("href"), {
                    ajax: !0
                }, function(a) {
                    $("#elNotificationsContent").empty().html(a.data), $("#elFullNotifications_menu").css({
                        visibility: "visible",
                        opacity: "1"
                    }).mouseleave(function() {
                        $(this).css({
                            visibility: "hidden",
                            opacity: "0"
                        })
                    }), $(".cNotifications var").remove()
                })
            },
            getMessages: function(a) {
                $.getJSON(a.attr("href"), {
                    ajax: !0
                }, function(a) {
                    $("#elInboxContent").empty().html(a.data), $("#elFullInbox_menu").css({
                        visibility: "visible",
                        opacity: "1"
                    }).mouseleave(function() {
                        $(this).css({
                            visibility: "hidden",
                            opacity: "0"
                        })
                    }), $(".cInbox var").remove()
                })
            },
            toggleSoftwarenews: function() {
                "1" == nw.orion.common.readCookie("show-software") ? (nw.orion.common.setCookie("show-software", "0", 365), window.location.reload()) : (nw.orion.common.setCookie("show-software", "1", 365), window.location.reload())
            },
            toggleSponsored: function() {
                "1" == nw.orion.common.readCookie("hide-sponsored") ? (nw.orion.common.setCookie("hide-sponsored", "0", 365), window.location.reload()) : (nw.orion.common.setCookie("hide-sponsored", "1", 365), window.location.reload())
            }
        }
    }(), nw.orion.articleViewing = function() {
        return {
            settings: {
                commentAddFragment: null
            },
            init: function() {
                $.ajaxSetup({
                    timeout: 6e4
                }), nw.orion.articleViewing.initComments(), nw.orion.articleViewing.initGalleries(), nw.orion.articleViewing.initReportConfirmation(), nw.orion.articleViewing.initLiveNews();
                var a = "comment-" + $("#comments").data("commentid");
                a.length > 10 && "comment-undefined" != a && (position = $("#" + a).offset().top - 50, console.log(position), $("html, body").animate({
                    scrollTop: position
                }, 500)), $(window).scroll(function() {
                    $(window).scrollTop() > $(document).height() - $(window).height() - 100 && (nw.orion.articleViewing.moreComments(), moreComments = !0)
                }), $(".show-comments-button").click(function(a) {
                    nw.orion.articleViewing.moreComments(), moreComments = !0
                }), $("#new-comment-jump").click(function(a) {
                    jumpToNewComment = !0, moreComments ? $("a[name='newcomment']").get(0).scrollIntoView() : (nw.orion.articleViewing.moreComments(), moreComments = !0)
                }), "#newcomment" == location.hash && (jumpToNewComment = !0, moreComments ? $("a[name='newcomment']").get(0).scrollIntoView() : (nw.orion.articleViewing.moreComments(), moreComments = !0)), $("#related-news img.lazyLoad").show().lazyload({
                    container: $("#related-news"),
                    threshold: 100,
                    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXu7u6DSdFtAAAAE0lEQVQ4y2MYBaNgFIyCUUBXAAAFeAABxVDVdQAAAABJRU5ErkJggg=="
                })
            },
            initComments: function() {
                var a = {
                    quoteComment: function(a) {
                        $.getJSON(a.attr("href"), {
                            ajax: !0,
                            topicID: $(".comment-list").data("topicid")
                        }, function(b) {
                            if ("ok" == b.status) {
                                $(".comment-add.inserted").remove();
                                var c = nw.orion.articleViewing.getLastChildCommentOrSelf(a.closest(".comment"));
                                c.find(".comment-content").parent().after(nw.orion.articleViewing.settings.commentAddFragment.clone().find("textarea").val(b.data).end().find("input.button").click(function() {
                                    $(this).prop("disabled", !0), nw.orion.articleViewing.confirmReply(a), a.preventDefault()
                                }).end()), $.scrollTo(c.find("textarea").focus().end(), 500), $("textarea.ckeditor").ckeditor(function() {}, {
                                    customConfig: "/js/ckeditor4/config_comments.js"
                                })
                            } else nw.orion.common.ajaxError(b.data)
                        })
                    },
                    replyComment: function(a) {
                        $(".comment-add.inserted").remove();
                        var b = nw.orion.articleViewing.getLastChildCommentOrSelf(a.closest(".comment"));
                        b.find(".comment-content").parent().after(nw.orion.articleViewing.settings.commentAddFragment.clone().find("textarea").end().find("input.button").click(function() {
                            $(this).prop("disabled", !0), nw.orion.articleViewing.confirmReply(a), a.preventDefault()
                        }).end()), $.scrollTo(b.find("textarea").focus().end(), 500), $("textarea.ckeditor").ckeditor(function() {}, {
                            customConfig: "/js/ckeditor4/config_comments.js"
                        })
                    },
                    deleteComment: function(a) {
                        confirm("Are you sure you want to (un)delete this comment, including any child comments?") && $.getJSON(a.attr("href"), {
                            ajax: !0,
                            submit: !0
                        }, function(a) {
                            if ("ok" == a.status)
                                for (var b = 0; b < a.data.length; b++) $("#comment-" + a.data[b]).toggleClass("comment-deleted");
                            else nw.orion.common.ajaxError(a.data)
                        })
                    },
                    editComment: function(a) {
                        $.getJSON(a.attr("href"), {
                            ajax: !0
                        }, function(b) {
                            if ("ok" == b.status) {
                                $(".comment-add.inserted").remove();
                                var c = a.closest(".comment");
                                c.find(".comment-content").html(nw.orion.articleViewing.settings.commentAddFragment.clone().find("textarea").val(b.data.comment).end().find("input.button").val("Edit comment").click(function(b) {
                                    b.preventDefault(), $(this).prop("disabled", !0), nw.orion.articleViewing.confirmEdit(a)
                                }).end()), $("textarea.ckeditor").ckeditor(function() {}, {
                                    customConfig: "/js/ckeditor4/config_comments.js"
                                })
                            } else nw.orion.common.ajaxError(b.data)
                        })
                    },
                    likeComment: function(a) {
                        $.getJSON(a.attr("href"), {
                            ajax: !0
                        }, function(b) {
                            "liked" == b.status ? ($(a).before('<span class="comment-buttons-liked">You like this comment.</span>'), $(a).text("Unlike").addClass("liked")) : "unliked" == b.status ? ($(a).prev("span").detach(), $(a).text("Like").removeClass("liked")) : nw.orion.common.ajaxError(b.data)
                        })
                    },
                    showComment: function(a) {
                        $(a).parent().hide(), $(a).parent().prev().show(), $(a).closest("footer").next().show()
                    },
                    reportComment: function(a) {
                        $("#pop-comment-report").attr("rel", a.attr("href")), nw.orion.common.launchModal("pop-comment-report")
                    }
                };
                nw.orion.articleViewing.settings.commentAddFragment = $(".comment-add").clone().addClass("inserted").find("a[name]").remove().end(), nw.orion.articleViewing.settings.commentAddFragment.find("form").replaceWith(nw.orion.articleViewing.settings.commentAddFragment.find("form").contents()), 0 != $("textarea.ckeditor").length && $("textarea.ckeditor").ckeditor(function() {}, {
                    customConfig: "/js/ckeditor4/config_comments.js"
                }), $("#comments").on("click", ".comment-interact a", function(b) {
                    a[$(this).data("action")]($(this)), b.preventDefault()
                }), $("#submit-reported-comment").click(function(a) {
                    nw.orion.articleViewing.confirmReport(), a.preventDefault()
                }), $("#comments").on("click", ".comment-button-cancel", function() {
                    nw.orion.articleViewing.cancelButton($(this))
                }), $(".comment-list").on("click", "#postingform input.button", function(a) {
                    $(this).prop("disabled", !0), nw.orion.articleViewing.postComment($(this)), a.preventDefault()
                }), $("#pollSubmit").click(function(a) {
                    nw.orion.articleViewing.votePoll(!0), a.preventDefault()
                }), $("#pollSubmitNull").click(function(a) {
                    nw.orion.articleViewing.votePoll(!1), a.preventDefault()
                }), $("#commentSort").change(function(a) {
                    nw.orion.articleViewing.changeSort($(this)), a.preventDefault()
                }), $(".comment-avatar").on("click", function(a) {
                    a.preventDefault(), $.getJSON($(this).attr("href"), {
                        ajax: !0
                    }, function(a) {
                        "ok" == a.status ? ($(".profile-card").empty().append(a.data), nw.orion.common.launchModal("profile-card")) : window.location.replace("http://www.neowin.net/forum/user/" + a.data)
                    })
                })
            },
            postComment: function(a) {
                $.ajax({
                    url: $(".comment-list #postingform").attr("action"),
                    method: "post",
                    data: {
                        ajax: !0,
                        submit: !0,
                        newsID: $(".comment-list").data("newsid"),
                        comment: $(a).closest("form").find("textarea").ckeditorGet().getData()
                    },
                    dataType: "json",
                    success: function(a) {
                        "ok" == a.status ? ($(".no-comments").remove(), $(".comment-list #postingform textarea").val(""), "newest" == nw.orion.common.readCookie("commentsort") ? $(a.data).css("display", "none").insertAfter("#add").fadeIn(500) : $(a.data).css("display", "none").insertBefore("#add").fadeIn(500), $("input[type=submit]").prop("disabled", !1)) : nw.orion.common.ajaxError(a.data)
                    }
                })
            },
            moreComments: function() {
                $(".comments-col").addClass("comments-loaded"), $(".show-comments-button").remove(), $(".comment-list").is(":empty") && 0 == moreComments && $.getJSON($(location).attr("href"), {
                    ajax: !0,
                    newsID: $(".comment-list").data("newsid"),
                    topicID: $(".comment-list").data("topicid")
                }, function(a) {
                    "ok" == a.status && a.data && ($(".comment-list").html(a.data), $("#article_next_to_comments").show(), nw.orion.articleViewing.settings.commentAddFragment = $(".comment-list .comment-add").clone().addClass("inserted").find("a[name]").remove().end(), nw.orion.articleViewing.settings.commentAddFragment.find("form").replaceWith(nw.orion.articleViewing.settings.commentAddFragment.find("form").contents()), $("textarea.ckeditor").ckeditor(function() {}, {
                        customConfig: "/js/ckeditor4/config_comments.js"
                    }), jumpToNewComment && $("a[name='newcomment']").get(0).scrollIntoView())
                })
            },
            confirmReply: function(a) {
                $.ajax({
                    url: a.attr("href"),
                    method: "post",
                    data: {
                        ajax: !0,
                        submit: !0,
                        newsID: $(".comment-list").data("newsid"),
                        topicID: $(".comment-list").data("topicid"),
                        comment: $(".comment-add.inserted textarea").ckeditorGet().getData(),
                        url: $(location).attr("href")
                    },
                    dataType: "json",
                    success: function(a) {
                        "ok" == a.status ? ($(a.data).css("display", "none").insertAfter($(".comment-add.inserted").closest(".comment")).fadeIn(500), $("input[type=submit]").prop("disabled", !1), $(".comment-add.inserted").remove()) : nw.orion.common.ajaxError(a.data)
                    }
                })
            },
            confirmEdit: function(a) {
                $.ajax({
                    url: a.attr("href"),
                    method: "post",
                    data: {
                        ajax: !0,
                        submit: !0,
                        comment: $(".comment-add.inserted textarea").val()
                    },
                    dataType: "json",
                    success: function(b) {
                        if ("ok" == b.status) {
                            var c = a.closest(".comment");
                            c.find(".comment-content").html(b.data.comment), $("input[type=submit]").prop("disabled", !1)
                        } else nw.orion.common.ajaxError(b.data)
                    }
                })
            },
            cancelButton: function(a) {
                var b = a.closest(".comment");
                "Edit comment" == b.find("input.button").val() ? (b.find(".comment-content").html(b.find("textarea").val().replace(/\n/g, "<br>")), $(".comment-add.inserted").fadeOut(200, function() {
                    $(this).remove()
                })) : $(".comment-add.inserted").fadeOut(200, function() {
                    $(this).remove()
                })
            },
            confirmReport: function() {
                var a = $("#pop-comment-report textarea").val();
                "" != a && null != a && $.ajax({
                    url: $("#pop-comment-report").attr("rel"),
                    method: "post",
                    data: {
                        reason: a,
                        ajax: !0
                    },
                    dataType: "json",
                    success: function(a) {
                        "ok" == a.status ? ($("input[type=submit]").prop("disabled", !1), alert("Thank you - a moderator will review your report and take action as appropriate.")) : nw.orion.common.ajaxError(a.data)
                    }
                }), nw.orion.common.closeModals()
            },
            initGalleries: function() {
                $(".article-content a").tosrus({
                    keys: {
                        prev: 37,
                        next: 39,
                        close: 27
                    },
                    wrapper: {
                        onClick: "close"
                    },
                    buttons: {
                        prev: !0,
                        next: !0,
                        close: !0
                    }
                })
            },
            getLastChildCommentOrSelf: function(a) {
                for (var b = a; b.next().hasClass("comment-child");) b = b.next();
                return b
            },
            changeSort: function(a) {
                nw.orion.common.setCookie("commentsort", a.val(), 365), window.location.reload()
            },
            initReportConfirmation: function() {
                $("#report-submit").click(function() {
                    alert("Thank you, our staff will look into your report as soon as possible.")
                })
            },
            votePoll: function(a) {
                var b = $("#poll-form").serialize() + "&pollSubmit=" + a + "&ajax=true";
                $.getJSON("/", b, function(a) {
                    "ok" == a.status ? $("#poll-bits").html(a.data) : nw.orion.common.ajaxError(a.data)
                })
            },
            initLiveNews: function() {
                $("#liveblog").length && setInterval(nw.orion.articleViewing.updateLiveNews, 1e4)
            },
            updateLiveNews: function() {
                $.getJSON(location.href, {
                    live: !0,
                    ajax: !0,
                    lastTimestamp: $("#liveblog-updates .onblog-update:eq(0)").attr("data-timestamp")
                }, function(a) {
                    "ok" == a.status ? $(a.data).hide().prependTo("#liveblog-updates").fadeIn(500) : nw.orion.common.ajaxError(a.data)
                })
            }
        }
    }(), ! function(a, b, c, d) {
        "use strict";

        function e(a, b, c) {
            return setTimeout(j(a, c), b)
        }

        function f(a, b, c) {
            return !!Array.isArray(a) && (g(a, c[b], c), !0)
        }

        function g(a, b, c) {
            var e;
            if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
        }

        function h(b, c, d) {
            var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
            return function() {
                var c = new Error("get-stack-trace"),
                    d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    f = a.console && (a.console.warn || a.console.log);
                return f && f.call(a.console, e, d), b.apply(this, arguments)
            }
        }

        function i(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && ha(d, c)
        }

        function j(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        function k(a, b) {
            return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a
        }

        function l(a, b) {
            return a === d ? b : a
        }

        function m(a, b, c) {
            g(q(b), function(b) {
                a.addEventListener(b, c, !1)
            })
        }

        function n(a, b, c) {
            g(q(b), function(b) {
                a.removeEventListener(b, c, !1)
            })
        }

        function o(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        }

        function p(a, b) {
            return a.indexOf(b) > -1
        }

        function q(a) {
            return a.trim().split(/\s+/g)
        }

        function r(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length;) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++
            }
            return -1
        }

        function s(a) {
            return Array.prototype.slice.call(a, 0)
        }

        function t(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length;) {
                var g = b ? a[f][b] : a[f];
                r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
            }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b]
            }) : d.sort()), d
        }

        function u(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
                if (c = ia[g], e = c ? c + f : b, e in a) return e;
                g++
            }
            return d
        }

        function v() {
            return qa++
        }

        function w(b) {
            var c = b.ownerDocument || b;
            return c.defaultView || c.parentWindow || a
        }

        function x(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
                k(a.options.enable, [a]) && c.handler(b)
            }, this.init()
        }

        function y(a) {
            var b, c = a.options.inputClass;
            return new(b = c ? c : ta ? M : ua ? P : sa ? R : L)(a, z)
        }

        function z(a, b, c) {
            var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & Aa && d - e === 0,
                g = b & (Ca | Da) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
        }

        function A(a, b) {
            var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = E(d);
            b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
            var j = F(b.deltaTime, b.deltaX, b.deltaY);
            b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = ma(j.x) > ma(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
            var k = a.element;
            o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
        }

        function B(a, b) {
            var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            (b.eventType === Aa || f.eventType === Ca) && (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
        }

        function C(a, b) {
            var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp;
            if (b.eventType != Da && (i > za || h.velocity === d)) {
                var j = b.deltaX - h.deltaX,
                    k = b.deltaY - h.deltaY,
                    l = F(i, j, k);
                e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
        }

        function D(a) {
            for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
                clientX: la(a.pointers[c].clientX),
                clientY: la(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: na(),
                pointers: b,
                center: E(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            }
        }

        function E(a) {
            var b = a.length;
            if (1 === b) return {
                x: la(a[0].clientX),
                y: la(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: la(c / b),
                y: la(d / b)
            }
        }

        function F(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            }
        }

        function G(a, b) {
            return a === b ? Ea : ma(a) >= ma(b) ? 0 > a ? Fa : Ga : 0 > b ? Ha : Ia
        }

        function H(a, b, c) {
            c || (c = Ma);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e)
        }

        function I(a, b, c) {
            c || (c = Ma);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI
        }

        function J(a, b) {
            return I(b[1], b[0], Na) + I(a[1], a[0], Na)
        }

        function K(a, b) {
            return H(b[0], b[1], Na) / H(a[0], a[1], Na)
        }

        function L() {
            this.evEl = Pa, this.evWin = Qa, this.allow = !0, this.pressed = !1, x.apply(this, arguments)
        }

        function M() {
            this.evEl = Ta, this.evWin = Ua, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function N() {
            this.evTarget = Wa, this.evWin = Xa, this.started = !1, x.apply(this, arguments)
        }

        function O(a, b) {
            var c = s(a.touches),
                d = s(a.changedTouches);
            return b & (Ca | Da) && (c = t(c.concat(d), "identifier", !0)), [c, d]
        }

        function P() {
            this.evTarget = Za, this.targetIds = {}, x.apply(this, arguments)
        }

        function Q(a, b) {
            var c = s(a.touches),
                d = this.targetIds;
            if (b & (Aa | Ba) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
            var e, f, g = s(a.changedTouches),
                h = [],
                i = this.target;
            if (f = c.filter(function(a) {
                    return o(a.target, i)
                }), b === Aa)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ca | Da) && delete d[g[e].identifier], e++;
            return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
        }

        function R() {
            x.apply(this, arguments);
            var a = j(this.handler, this);
            this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a)
        }

        function S(a, b) {
            this.manager = a, this.set(b)
        }

        function T(a) {
            if (p(a, db)) return db;
            var b = p(a, eb),
                c = p(a, fb);
            return b && c ? db : b || c ? b ? eb : fb : p(a, cb) ? cb : bb
        }

        function U(a) {
            this.options = ha({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = gb, this.simultaneous = {}, this.requireFail = []
        }

        function V(a) {
            return a & lb ? "cancel" : a & jb ? "end" : a & ib ? "move" : a & hb ? "start" : ""
        }

        function W(a) {
            return a == Ia ? "down" : a == Ha ? "up" : a == Fa ? "left" : a == Ga ? "right" : ""
        }

        function X(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a
        }

        function Y() {
            U.apply(this, arguments)
        }

        function Z() {
            Y.apply(this, arguments), this.pX = null, this.pY = null
        }

        function $() {
            Y.apply(this, arguments)
        }

        function _() {
            U.apply(this, arguments), this._timer = null, this._input = null
        }

        function aa() {
            Y.apply(this, arguments)
        }

        function ba() {
            Y.apply(this, arguments)
        }

        function ca() {
            U.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function da(a, b) {
            return b = b || {}, b.recognizers = l(b.recognizers, da.defaults.preset), new ea(a, b)
        }

        function ea(a, b) {
            this.options = ha({}, da.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = y(this), this.touchAction = new S(this, this.options.touchAction), fa(this, !0), g(this.options.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
            }, this)
        }

        function fa(a, b) {
            var c = a.element;
            c.style && g(a.options.cssProps, function(a, d) {
                c.style[u(c.style, d)] = b ? a : ""
            })
        }

        function ga(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
        }
        var ha, ia = ["", "webkit", "Moz", "MS", "ms", "o"],
            ja = b.createElement("div"),
            ka = "function",
            la = Math.round,
            ma = Math.abs,
            na = Date.now;
        ha = "function" != typeof Object.assign ? function(a) {
            if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var e = arguments[c];
                if (e !== d && null !== e)
                    for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
            }
            return b
        } : Object.assign;
        var oa = h(function(a, b, c) {
                for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
                return a
            }, "extend", "Use `assign`."),
            pa = h(function(a, b) {
                return oa(a, b, !0)
            }, "merge", "Use `assign`."),
            qa = 1,
            ra = /mobile|tablet|ip(ad|hone|od)|android/i,
            sa = "ontouchstart" in a,
            ta = u(a, "PointerEvent") !== d,
            ua = sa && ra.test(navigator.userAgent),
            va = "touch",
            wa = "pen",
            xa = "mouse",
            ya = "kinect",
            za = 25,
            Aa = 1,
            Ba = 2,
            Ca = 4,
            Da = 8,
            Ea = 1,
            Fa = 2,
            Ga = 4,
            Ha = 8,
            Ia = 16,
            Ja = Fa | Ga,
            Ka = Ha | Ia,
            La = Ja | Ka,
            Ma = ["x", "y"],
            Na = ["clientX", "clientY"];
        x.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
            }
        };
        var Oa = {
                mousedown: Aa,
                mousemove: Ba,
                mouseup: Ca
            },
            Pa = "mousedown",
            Qa = "mousemove mouseup";
        i(L, x, {
            handler: function(a) {
                var b = Oa[a.type];
                b & Aa && 0 === a.button && (this.pressed = !0), b & Ba && 1 !== a.which && (b = Ca), this.pressed && this.allow && (b & Ca && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [a],
                    changedPointers: [a],
                    pointerType: xa,
                    srcEvent: a
                }))
            }
        });
        var Ra = {
                pointerdown: Aa,
                pointermove: Ba,
                pointerup: Ca,
                pointercancel: Da,
                pointerout: Da
            },
            Sa = {
                2: va,
                3: wa,
                4: xa,
                5: ya
            },
            Ta = "pointerdown",
            Ua = "pointermove pointerup pointercancel";
        a.MSPointerEvent && !a.PointerEvent && (Ta = "MSPointerDown",
            Ua = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
            handler: function(a) {
                var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Ra[d],
                    f = Sa[a.pointerType] || a.pointerType,
                    g = f == va,
                    h = r(b, a.pointerId, "pointerId");
                e & Aa && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ca | Da) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [a],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1))
            }
        });
        var Va = {
                touchstart: Aa,
                touchmove: Ba,
                touchend: Ca,
                touchcancel: Da
            },
            Wa = "touchstart",
            Xa = "touchstart touchmove touchend touchcancel";
        i(N, x, {
            handler: function(a) {
                var b = Va[a.type];
                if (b === Aa && (this.started = !0), this.started) {
                    var c = O.call(this, a, b);
                    b & (Ca | Da) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: va,
                        srcEvent: a
                    })
                }
            }
        });
        var Ya = {
                touchstart: Aa,
                touchmove: Ba,
                touchend: Ca,
                touchcancel: Da
            },
            Za = "touchstart touchmove touchend touchcancel";
        i(P, x, {
            handler: function(a) {
                var b = Ya[a.type],
                    c = Q.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: va,
                    srcEvent: a
                })
            }
        }), i(R, x, {
            handler: function(a, b, c) {
                var d = c.pointerType == va,
                    e = c.pointerType == xa;
                if (d) this.mouse.allow = !1;
                else if (e && !this.mouse.allow) return;
                b & (Ca | Da) && (this.mouse.allow = !0), this.callback(a, b, c)
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var $a = u(ja.style, "touchAction"),
            _a = $a !== d,
            ab = "compute",
            bb = "auto",
            cb = "manipulation",
            db = "none",
            eb = "pan-x",
            fb = "pan-y";
        S.prototype = {
            set: function(a) {
                a == ab && (a = this.compute()), _a && this.manager.element.style && (this.manager.element.style[$a] = a), this.actions = a.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) {
                    k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
                }), T(a.join(" "))
            },
            preventDefaults: function(a) {
                if (!_a) {
                    var b = a.srcEvent,
                        c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions,
                        e = p(d, db),
                        f = p(d, fb),
                        g = p(d, eb);
                    if (e) {
                        var h = 1 === a.pointers.length,
                            i = a.distance < 2,
                            j = a.deltaTime < 250;
                        if (h && i && j) return
                    }
                    if (!g || !f) return e || f && c & Ja || g && c & Ka ? this.preventSrc(b) : void 0
                }
            },
            preventSrc: function(a) {
                this.manager.session.prevented = !0, a.preventDefault()
            }
        };
        var gb = 1,
            hb = 2,
            ib = 4,
            jb = 8,
            kb = jb,
            lb = 16,
            mb = 32;
        U.prototype = {
            defaults: {},
            set: function(a) {
                return ha(this.options, a), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = X(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
            },
            dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = X(a, this), delete this.simultaneous[a.id], this)
            },
            requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = X(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this
            },
            dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = X(a, this);
                var b = r(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id]
            },
            emit: function(a) {
                function b(b) {
                    c.manager.emit(b, a)
                }
                var c = this,
                    d = this.state;
                jb > d && b(c.options.event + V(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= jb && b(c.options.event + V(d))
            },
            tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void(this.state = mb)
            },
            canEmit: function() {
                for (var a = 0; a < this.requireFail.length;) {
                    if (!(this.requireFail[a].state & (mb | gb))) return !1;
                    a++
                }
                return !0
            },
            recognize: function(a) {
                var b = ha({}, a);
                return k(this.options.enable, [this, b]) ? (this.state & (kb | lb | mb) && (this.state = gb), this.state = this.process(b), void(this.state & (hb | ib | jb | lb) && this.tryEmit(b))) : (this.reset(), void(this.state = mb))
            },
            process: function(a) {},
            getTouchAction: function() {},
            reset: function() {}
        }, i(Y, U, {
            defaults: {
                pointers: 1
            },
            attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b
            },
            process: function(a) {
                var b = this.state,
                    c = a.eventType,
                    d = b & (hb | ib),
                    e = this.attrTest(a);
                return d && (c & Da || !e) ? b | lb : d || e ? c & Ca ? b | jb : b & hb ? b | ib : hb : mb
            }
        }), i(Z, Y, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: La
            },
            getTouchAction: function() {
                var a = this.options.direction,
                    b = [];
                return a & Ja && b.push(fb), a & Ka && b.push(eb), b
            },
            directionTest: function(a) {
                var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY;
                return e & b.direction || (b.direction & Ja ? (e = 0 === f ? Ea : 0 > f ? Fa : Ga, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ea : 0 > g ? Ha : Ia, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
            },
            attrTest: function(a) {
                return Y.prototype.attrTest.call(this, a) && (this.state & hb || !(this.state & hb) && this.directionTest(a))
            },
            emit: function(a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = W(a.direction);
                b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
            }
        }), i($, Y, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [db]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & hb)
            },
            emit: function(a) {
                if (1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    a.additionalEvent = this.options.event + b
                }
                this._super.emit.call(this, a)
            }
        }), i(_, U, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 251,
                threshold: 9
            },
            getTouchAction: function() {
                return [bb]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Ca | Da) && !f) this.reset();
                else if (a.eventType & Aa) this.reset(), this._timer = e(function() {
                    this.state = kb, this.tryEmit()
                }, b.time, this);
                else if (a.eventType & Ca) return kb;
                return mb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(a) {
                this.state === kb && (a && a.eventType & Ca ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)))
            }
        }), i(aa, Y, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [db]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & hb)
            }
        }), i(ba, Y, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .3,
                direction: Ja | Ka,
                pointers: 1
            },
            getTouchAction: function() {
                return Z.prototype.getTouchAction.call(this)
            },
            attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Ja | Ka) ? b = a.overallVelocity : c & Ja ? b = a.overallVelocityX : c & Ka && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && ma(b) > this.options.velocity && a.eventType & Ca
            },
            emit: function(a) {
                var b = W(a.offsetDirection);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
            }
        }), i(ca, U, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [cb]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & Aa && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Ca) return this.failTimeout();
                    var g = !this.pTime || a.timeStamp - this.pTime < b.interval,
                        h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = kb, this.tryEmit()
                    }, b.interval, this), hb) : kb
                }
                return mb
            },
            failTimeout: function() {
                return this._timer = e(function() {
                    this.state = mb
                }, this.options.interval, this), mb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == kb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), da.VERSION = "2.0.6", da.defaults = {
            domEvents: !1,
            touchAction: ab,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [aa, {
                    enable: !1
                }],
                [$, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [ba, {
                    direction: Ja
                }],
                [Z, {
                        direction: Ja
                    },
                    ["swipe"]
                ],
                [ca],
                [ca, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [_]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var nb = 1,
            ob = 2;
        ea.prototype = {
            set: function(a) {
                return ha(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
            },
            stop: function(a) {
                this.session.stopped = a ? ob : nb
            },
            recognize: function(a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & kb) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length;) c = d[f], b.stopped === ob || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (hb | ib | jb) && (e = b.curRecognizer = c), f++
                }
            },
            get: function(a) {
                if (a instanceof U) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c];
                return null
            },
            add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
            },
            remove: function(a) {
                if (f(a, "remove", this)) return this;
                if (a = this.get(a)) {
                    var b = this.recognizers,
                        c = r(b, a); - 1 !== c && (b.splice(c, 1), this.touchAction.update())
                }
                return this
            },
            on: function(a, b) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b)
                }), this
            },
            off: function(a, b) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                }), this
            },
            emit: function(a, b) {
                this.options.domEvents && ga(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function() {
                        b.srcEvent.preventDefault()
                    };
                    for (var d = 0; d < c.length;) c[d](b), d++
                }
            },
            destroy: function() {
                this.element && fa(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, ha(da, {
            INPUT_START: Aa,
            INPUT_MOVE: Ba,
            INPUT_END: Ca,
            INPUT_CANCEL: Da,
            STATE_POSSIBLE: gb,
            STATE_BEGAN: hb,
            STATE_CHANGED: ib,
            STATE_ENDED: jb,
            STATE_RECOGNIZED: kb,
            STATE_CANCELLED: lb,
            STATE_FAILED: mb,
            DIRECTION_NONE: Ea,
            DIRECTION_LEFT: Fa,
            DIRECTION_RIGHT: Ga,
            DIRECTION_UP: Ha,
            DIRECTION_DOWN: Ia,
            DIRECTION_HORIZONTAL: Ja,
            DIRECTION_VERTICAL: Ka,
            DIRECTION_ALL: La,
            Manager: ea,
            Input: x,
            TouchAction: S,
            TouchInput: P,
            MouseInput: L,
            PointerEventInput: M,
            TouchMouseInput: R,
            SingleTouchInput: N,
            Recognizer: U,
            AttrRecognizer: Y,
            Tap: ca,
            Pan: Z,
            Swipe: ba,
            Pinch: $,
            Rotate: aa,
            Press: _,
            on: m,
            off: n,
            each: g,
            merge: pa,
            extend: oa,
            assign: ha,
            inherit: i,
            bindFn: j,
            prefixed: u
        });
        var pb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
        pb.Hammer = da, "function" == typeof define && define.amd ? define(function() {
            return da
        }) : "undefined" != typeof module && module.exports ? module.exports = da : a[c] = da
    }(window, document, "Hammer"), ! function(a) {
        function b() {
            f = function(a) {
                return d + "-" + a
            }, g = function(a) {
                return d + "-" + a
            }, h = function(a) {
                return a + "." + d
            }, a.each([f, g, h], function(a, b) {
                b.add = function(a) {
                    a = a.split(" ");
                    for (var c in a) b[a[c]] = b(a[c])
                }
            }), f.add("touch desktop scale-1 scale-2 scale-3 wrapper opened opening fixed inline hover slider slide loading noanimation fastanimation"), g.add("slide anchor"), h.add("open opening close closing prev next slideTo sliding click pinch scroll resize orientationchange load loading loaded transitionend webkitTransitionEnd"), i = {
                complObject: function(b, c) {
                    return a.isPlainObject(b) || (b = c), b
                },
                complBoolean: function(a, b) {
                    return "boolean" != typeof a && (a = b), a
                },
                complNumber: function(b, c) {
                    return a.isNumeric(b) || (b = c), b
                },
                complString: function(a, b) {
                    return "string" != typeof a && (a = b), a
                },
                isPercentage: function(a) {
                    return "string" == typeof a && "%" == a.slice(-1)
                },
                getPercentage: function(a) {
                    return parseInt(a.slice(0, -1))
                },
                resizeRatio: function(a, b, c, d, e) {
                    var f = b.width(),
                        g = b.height();
                    c && f > c && (f = c), d && g > d && (g = d), e > f / g ? g = f / e : f = g * e, a.width(f).height(g)
                },
                transitionend: function(a, b, c) {
                    var d = !1,
                        e = function() {
                            d || b.call(a[0]), d = !0
                        };
                    a.one(h.transitionend, e), a.one(h.webkitTransitionEnd, e), setTimeout(e, 1.1 * c)
                },
                setViewportScale: function() {
                    if (j.viewportScale) {
                        var a = j.viewportScale.getScale();
                        "undefined" != typeof a && (a = 1 / a, j.$body.removeClass(f["scale-1"]).removeClass(f["scale-2"]).removeClass(f["scale-3"]).addClass(f["scale-" + Math.max(Math.min(Math.round(a), 3), 1)]))
                    }
                }
            }, j = {
                $wndw: a(window),
                $html: a("html"),
                $body: a("body"),
                scrollPosition: 0,
                viewportScale: null,
                viewportScaleInterval: null
            }, j.$body.addClass(a[c].support.touch ? f.touch : f.desktop), j.$wndw.on(h.scroll, function(a) {
                j.$body.hasClass(f.opened) && (window.scrollTo(0, j.scrollPosition), a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
            }), !j.viewportScale && a[c].support.touch && "undefined" != typeof FlameViewportScale && (j.viewportScale = new FlameViewportScale, i.setViewportScale(), j.$wndw.on(h.orientationchange + " " + h.resize, function() {
                j.viewportScaleInterval && (clearTimeout(j.viewportScaleInterval), j.viewportScaleInterval = null), j.viewportScaleInterval = setTimeout(function() {
                    i.setViewportScale()
                }, 500)
            })), a[c]._c = f, a[c]._d = g, a[c]._e = h, a[c]._f = i, a[c]._g = j
        }
        var c = "tosrus",
            d = "tos",
            e = "2.4.2";
        if (!a[c]) {
            var f = {},
                g = {},
                h = {},
                i = {},
                j = {};
            a[c] = function(a, b, c) {
                return this.$node = a, this.opts = b, this.conf = c, this.vars = {}, this.nodes = {}, this.slides = {}, this._init(), this
            }, a[c].prototype = {
                _init: function() {
                    var b = this;
                    this._complementOptions(), this.vars.fixed = "window" == this.opts.wrapper.target, this.nodes.$wrpr = a('<div class="' + f.wrapper + '" />'), this.nodes.$sldr = a('<div class="' + f.slider + '" />').appendTo(this.nodes.$wrpr), this.nodes.$wrpr.addClass(this.vars.fixed ? f.fixed : f.inline).addClass(f("fx-" + this.opts.effect)).addClass(f(this.opts.slides.scale)).addClass(this.opts.wrapper.classes), this.nodes.$wrpr.on(h.open + " " + h.close + " " + h.prev + " " + h.next + " " + h.slideTo, function(a) {
                        arguments = Array.prototype.slice.call(arguments);
                        var a = arguments.shift(),
                            c = a.type;
                        a.stopPropagation(), "function" == typeof b[c] && b[c].apply(b, arguments)
                    }).on(h.opening + " " + h.closing + " " + h.sliding + " " + h.loading + " " + h.loaded, function(a) {
                        a.stopPropagation()
                    }).on(h.click, function(c) {
                        switch (c.stopPropagation(), b.opts.wrapper.onClick) {
                            case "toggleUI":
                                b.nodes.$wrpr.toggleClass(f.hover);
                                break;
                            case "close":
                                a(c.target).is("img") || b.close()
                        }
                    }), this.nodes.$anchors = this._initAnchors(), this.nodes.$slides = this._initSlides(), this.slides.total = this.nodes.$slides.length, this.slides.visible = this.opts.slides.visible, this.slides.index = 0, this.vars.opened = !0;
                    for (var d = 0; d < a[c].addons.length; d++) a.isFunction(this["_addon_" + a[c].addons[d]]) && this["_addon_" + a[c].addons[d]]();
                    for (var e = 0; e < a[c].ui.length; e++) this.nodes.$wrpr.find("." + f[a[c].ui[e]]).length && this.nodes.$wrpr.addClass(f("has-" + a[c].ui[e]));
                    "close" == this.opts.wrapper.onClick && (this.nodes.$uibg || a().add(this.nodes.$capt || a()).add(this.nodes.$pagr || a()).on(h.click, function(a) {
                        a.stopPropagation()
                    })), this.vars.fixed ? (this.nodes.$wrpr.appendTo(j.$body), this.close(!0)) : (this.nodes.$wrpr.appendTo(this.opts.wrapper.target), this.opts.show ? (this.vars.opened = !1, this.open(0, !0)) : this.close(!0))
                },
                open: function(b, c) {
                    var d = this;
                    this.vars.opened || (this.vars.fixed && (j.scrollPosition = j.$wndw.scrollTop(), j.$body.addClass(f.opened), i.setViewportScale()), c ? this.nodes.$wrpr.addClass(f.opening).trigger(h.opening, [b, c]) : setTimeout(function() {
                        d.nodes.$wrpr.addClass(f.opening).trigger(h.opening, [b, c])
                    }, 5), this.nodes.$wrpr.addClass(f.hover).addClass(f.opened)), this.vars.opened = !0, this._loadContents(), a.isNumeric(b) && (c = c || !this.vars.opened, this.slideTo(b, c))
                },
                close: function(b) {
                    this.vars.opened && (this.vars.fixed && j.$body.removeClass(f.opened), b ? this.nodes.$wrpr.removeClass(f.opened) : i.transitionend(this.nodes.$wrpr, function() {
                        a(this).removeClass(f.opened)
                    }, this.conf.transitionDuration), this.nodes.$wrpr.removeClass(f.hover).removeClass(f.opening).trigger(h.closing, [this.slides.index, b])), this.vars.opened = !1
                },
                prev: function(b, c) {
                    a.isNumeric(b) || (b = this.opts.slides.slide), this.slideTo(this.slides.index - b, c)
                },
                next: function(b, c) {
                    a.isNumeric(b) || (b = this.opts.slides.slide), this.slideTo(this.slides.index + b, c)
                },
                slideTo: function(b, d) {
                    if (!this.vars.opened) return !1;
                    if (!a.isNumeric(b)) return !1;
                    var e = !0;
                    if (0 > b) {
                        var g = 0 == this.slides.index;
                        this.opts.infinite ? b = g ? this.slides.total - this.slides.visible : 0 : (b = 0, g && (e = !1))
                    }
                    if (b + this.slides.visible > this.slides.total) {
                        var j = this.slides.index + this.slides.visible >= this.slides.total;
                        this.opts.infinite ? b = j ? 0 : this.slides.total - this.slides.visible : (b = this.slides.total - this.slides.visible, j && (e = !1))
                    }
                    if (this.slides.index = b, this._loadContents(), e) {
                        var k = 0 - this.slides.index * this.opts.slides.width + this.opts.slides.offset;
                        this.slides.widthPercentage && (k += "%"), d && (this.nodes.$sldr.addClass(f.noanimation), i.transitionend(this.nodes.$sldr, function() {
                            a(this).removeClass(f.noanimation)
                        }, 5));
                        for (var l in a[c].effects)
                            if (l == this.opts.effect) {
                                a[c].effects[l].call(this, k, d);
                                break
                            }
                        this.nodes.$wrpr.trigger(h.sliding, [b, d])
                    }
                },
                _initAnchors: function() {
                    var b = this,
                        d = a();
                    if (this.$node.is("a"))
                        for (var e in a[c].media) d = d.add(this.$node.filter(function() {
                            if (b.opts.media[e] && b.opts.media[e].filterAnchors) {
                                var d = b.opts.media[e].filterAnchors.call(b, a(this));
                                if ("boolean" == typeof d) return d
                            }
                            return a[c].media[e].filterAnchors.call(b, a(this))
                        }));
                    return d
                },
                _initSlides: function() {
                    return this[this.$node.is("a") ? "_initSlidesFromAnchors" : "_initSlidesFromContent"](), this.nodes.$sldr.children().css("width", this.opts.slides.width + (this.slides.widthPercentage ? "%" : "px"))
                },
                _initSlidesFromAnchors: function() {
                    var b = this;
                    this.nodes.$anchors.each(function(c) {
                        var d = a(this),
                            e = a('<div class="' + f.slide + " " + f.loading + '" />').data(g.anchor, d).appendTo(b.nodes.$sldr);
                        d.data(g.slide, e).on(h.click, function(a) {
                            a.preventDefault(), b.open(c)
                        })
                    })
                },
                _initSlidesFromContent: function() {
                    var b = this;
                    this.$node.children().each(function() {
                        var d = a(this);
                        a('<div class="' + f.slide + '" />').append(d).appendTo(b.nodes.$sldr);
                        for (var e in a[c].media) {
                            var g = null;
                            if (b.opts.media[e] && b.opts.media[e].filterSlides && (g = b.opts.media[e].filterSlides.call(b, d)), "boolean" != typeof g && (g = a[c].media[e].filterSlides.call(b, d)), g) {
                                a[c].media[e].initSlides.call(b, d), d.parent().addClass(f(e));
                                break
                            }
                        }
                    })
                },
                _loadContents: function() {
                    var a = this;
                    switch (this.opts.slides.load) {
                        case "all":
                            this._loadContent(0, this.slides.total);
                            break;
                        case "visible":
                            this._loadContent(this.slides.index, this.slides.index + this.slides.visible);
                            break;
                        case "near-visible":
                        default:
                            this._loadContent(this.slides.index, this.slides.index + this.slides.visible), setTimeout(function() {
                                a._loadContent(a.slides.index - a.slides.visible, a.slides.index), a._loadContent(a.slides.index + a.slides.visible, a.slides.index + 2 * a.slides.visible)
                            }, this.conf.transitionDuration)
                    }
                },
                _loadContent: function(b, d) {
                    var e = this;
                    this.nodes.$slides.slice(b, d).each(function() {
                        var b = a(this);
                        if (0 == b.children().length) {
                            var d = b.data(g.anchor),
                                i = d.attr("href");
                            for (var j in a[c].media) {
                                var k = null;
                                if (e.opts.media[j] && e.opts.media[j].filterAnchors && (k = e.opts.media[j].filterAnchors.call(e, d)), "boolean" != typeof k && (k = a[c].media[j].filterAnchors.call(e, d)), k) {
                                    a[c].media[j].initAnchors.call(e, b, i), b.addClass(f(j));
                                    break
                                }
                            }
                            b.trigger(h.loading, [b.data(g.anchor)])
                        }
                    })
                },
                _complementOptions: function() {
                    if ("undefined" == typeof this.opts.wrapper.target && (this.opts.wrapper.target = this.$node.is("a") ? "window" : this.$node), "window" != this.opts.wrapper.target && "string" == typeof this.opts.wrapper.target && (this.opts.wrapper.target = a(this.opts.wrapper.target)), this.opts.show = i.complBoolean(this.opts.show, "window" != this.opts.wrapper.target), a.isNumeric(this.opts.slides.width)) this.slides.widthPercentage = !1, this.opts.slides.visible = i.complNumber(this.opts.slides.visible, 1);
                    else {
                        var b = !!i.isPercentage(this.opts.slides.width) && i.getPercentage(this.opts.slides.width);
                        this.slides.widthPercentage = !0, this.opts.slides.visible = i.complNumber(this.opts.slides.visible, b ? Math.floor(100 / b) : 1), this.opts.slides.width = b ? b : Math.ceil(1e4 / this.opts.slides.visible) / 100
                    }
                    this.opts.slides.slide = i.complNumber(this.opts.slides.slide, this.opts.slides.visible), this.opts.slides.offset = i.isPercentage(this.opts.slides.offset) ? i.getPercentage(this.opts.slides.offset) : i.complNumber(this.opts.slides.offset, 0)
                },
                _uniqueID: function() {
                    return this.__uniqueID || (this.__uniqueID = 0), this.__uniqueID++, f("uid-" + this.__uniqueID)
                }
            }, a.fn[c] = function(d, e, f, g) {
                j.$wndw || b(), d = a.extend(!0, {}, a[c].defaults, d), d = a.extend(!0, {}, d, a[c].support.touch ? f : e), g = a.extend(!0, {}, a[c].configuration, g);
                var h = new a[c](this, d, g);
                return this.data(c, h), h.nodes.$wrpr
            }, a[c].support = {
                touch: "ontouchstart" in window.document || navigator.msMaxTouchPoints
            }, a[c].defaults = {
                infinite: !1,
                effect: "slide",
                wrapper: {
                    classes: "",
                    onClick: "toggleUI"
                },
                slides: {
                    offset: 0,
                    scale: "fit",
                    load: "near-visible",
                    visible: 1
                },
                media: {}
            }, a[c].configuration = {
                transitionDuration: 400
            }, a[c].constants = {}, a[c].debug = function() {}, a[c].deprecated = function(a, b) {
                "undefined" != typeof console && "undefined" != typeof console.warn && console.warn(c + ": " + a + " is deprecated, use " + b + " instead.")
            }, a[c].effects = {
                slide: function(a) {
                    this.nodes.$sldr.css("left", a)
                },
                fade: function(b) {
                    i.transitionend(this.nodes.$sldr, function() {
                        a(this).css("left", b).css("opacity", 1)
                    }, this.conf.transitionDuration), this.nodes.$sldr.css("opacity", 0)
                }
            }, a[c].version = e, a[c].media = {}, a[c].addons = [], a[c].ui = []
        }
    }(jQuery), ! function(a) {
        function b(b, c) {
            return a('<a class="' + d[b] + c + '" href="#"><span></span></a>')
        }

        function c(a, b, c, d) {
            b.on(f.click, function(b) {
                b.preventDefault(), b.stopPropagation(), a.trigger(f[c], [d])
            })
        }
        var d, e, f, g, h, i = "tosrus",
            j = "buttons",
            k = !1;
        a[i].prototype["_addon_" + j] = function() {
            k || (d = a[i]._c, e = a[i]._d, f = a[i]._e, g = a[i]._f, h = a[i]._g, d.add("prev next close disabled"), k = !0);
            var l = this,
                m = this.opts[j];
            this.nodes.$prev = null, this.nodes.$next = null, this.nodes.$clse = null, ("boolean" == typeof m || "string" == typeof m && "inline" == m) && (m = {
                prev: m,
                next: m
            }), "undefined" == typeof m.close && (m.close = this.vars.fixed), this.nodes.$slides.length < 2 && (m.prev = !1, m.next = !1), a.each({
                prev: "prev",
                next: "next",
                close: "clse"
            }, function(e, g) {
                m[e] && ("string" == typeof m[e] && "inline" == m[e] ? l.vars.fixed && "close" != e && l.nodes.$slides.on(f.loading, function() {
                    var f = b(e, " " + d.inline)["prev" == e ? "prependTo" : "appendTo"](this);
                    c(l.nodes.$wrpr, f, e, 1), l.opts.infinite || ("prev" == e && a(this).is(":first-child") || "next" == e && a(this).is(":last-child")) && f.addClass(d.disabled)
                }) : ("string" == typeof m[e] && (m[e] = a(m[e])), l.nodes["$" + g] = m[e] instanceof a ? m[e] : b(e, "").appendTo(l.nodes.$wrpr), c(l.nodes.$wrpr, l.nodes["$" + g], e, null)))
            }), this.opts.infinite || (this.updateButtons(), this.nodes.$wrpr.on(f.sliding, function() {
                l.updateButtons()
            }))
        }, a[i].prototype.updateButtons = function() {
            this.nodes.$prev && this.nodes.$prev[(this.slides.index < 1 ? "add" : "remove") + "Class"](d.disabled), this.nodes.$next && this.nodes.$next[(this.slides.index >= this.slides.total - this.slides.visible ? "add" : "remove") + "Class"](d.disabled)
        }, a[i].defaults[j] = {
            prev: !a[i].support.touch,
            next: !a[i].support.touch
        }, a[i].addons.push(j), a[i].ui.push("prev"), a[i].ui.push("next"), a[i].ui.push("close")
    }(jQuery), ! function(a) {
        if ("function" == typeof Hammer) {
            var b, c, d, e, f, g = "tosrus",
                h = "drag",
                i = !1;
            a[g].prototype["_addon_" + h] = function() {
                i || (b = a[g]._c, c = a[g]._d, d = a[g]._e, e = a[g]._f, f = a[g]._g, i = !0);
                var j = this;
                if (this.opts[h] && "slide" == this.opts.effect) {
                    if (Hammer.VERSION < 2) return void a[g].deprecated("Older version of the Hammer library", "version 2 or newer");
                    if (this.nodes.$slides.length > 1) {
                        var k = 0,
                            l = !1,
                            m = !1,
                            n = new Hammer(this.nodes.$wrpr[0]);
                        n.on("panstart panleft panright panend swipeleft swiperight", function(a) {
                            a.preventDefault()
                        }).on("panstart", function() {
                            j.nodes.$sldr.addClass(b.noanimation)
                        }).on("panleft panright", function(a) {
                            switch (k = a.deltaX, m = !1, a.direction) {
                                case 2:
                                    l = "left";
                                    break;
                                case 4:
                                    l = "right";
                                    break;
                                default:
                                    l = !1
                            }("left" == l && j.slides.index + j.slides.visible >= j.slides.total || "right" == l && 0 == j.slides.index) && (k /= 2.5), j.nodes.$sldr.css("margin-left", Math.round(k))
                        }).on("swipeleft swiperight", function() {
                            m = !0
                        }).on("panend", function() {
                            if (j.nodes.$sldr.removeClass(b.noanimation).addClass(b.fastanimation), e.transitionend(j.nodes.$sldr, function() {
                                    j.nodes.$sldr.removeClass(b.fastanimation)
                                }, j.conf.transitionDuration / 2), j.nodes.$sldr.css("margin-left", 0), "left" == l || "right" == l) {
                                if (m) var a = j.slides.visible;
                                else var c = j.nodes.$slides.first().width(),
                                    a = Math.floor((Math.abs(k) + c / 2) / c);
                                a > 0 && j.nodes.$wrpr.trigger(d["left" == l ? "next" : "prev"], [a])
                            }
                            l = !1
                        })
                    }
                }
            }, a[g].defaults[h] = a[g].support.touch, a[g].addons.push(h)
        }
    }(jQuery), ! function(a) {
        var b, c, d, e, f, g = "tosrus",
            h = "keys",
            i = !1;
        a[g].prototype["_addon_" + h] = function() {
            i || (b = a[g]._c, c = a[g]._d, d = a[g]._e, e = a[g]._f, f = a[g]._g, d.add("keyup"), i = !0);
            var j = this,
                k = this.opts[h];
            if ("boolean" == typeof k && k && (k = {
                    prev: !0,
                    next: !0,
                    close: !0
                }), a.isPlainObject(k)) {
                for (var l in a[g].constants[h]) "boolean" == typeof k[l] && k[l] && (k[l] = a[g].constants[h][l]);
                this.nodes.$slides.length < 2 && (k.prev = !1, k.next = !1), a(document).on(d.keyup, function(a) {
                    if (j.vars.opened) {
                        var b = !1;
                        switch (a.keyCode) {
                            case k.prev:
                                b = d.prev;
                                break;
                            case k.next:
                                b = d.next;
                                break;
                            case k.close:
                                b = d.close
                        }
                        b && (a.preventDefault(), a.stopPropagation(), j.nodes.$wrpr.trigger(b))
                    }
                })
            }
        }, a[g].defaults[h] = !1, a[g].constants[h] = {
            prev: 37,
            next: 39,
            close: 27
        }, a[g].addons.push(h)
    }(jQuery), ! function(a) {
        var b = "tosrus",
            c = "image";
        a[b].media[c] = {
            filterAnchors: function(b) {
                return a.inArray(b.attr("href").toLowerCase().split(".").pop().split("?")[0], ["jpg", "jpe", "jpeg", "gif", "png"]) > -1
            },
            initAnchors: function(c, d) {
                a('<img border="0" />').on(a[b]._e.load, function(d) {
                    d.stopPropagation(), c.removeClass(a[b]._c.loading).trigger(a[b]._e.loaded)
                }).appendTo(c).attr("src", d)
            },
            filterSlides: function(a) {
                return a.is("img")
            },
            initSlides: function() {}
        }, a[b].defaults.media[c] = {}
    }(jQuery), ! function(a, b) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("jquery")) : a.jQueryBridget = b(a, a.jQuery)
    }(window, function(a, b) {
        "use strict";

        function c(c, f, h) {
            function i(a, b, d) {
                var e, f = "$()." + c + '("' + b + '")';
                return a.each(function(a, i) {
                    var j = h.data(i, c);
                    if (!j) return void g(c + " not initialized. Cannot call methods, i.e. " + f);
                    var k = j[b];
                    if (!k || "_" == b.charAt(0)) return void g(f + " is not a valid method");
                    var l = k.apply(j, d);
                    e = void 0 === e ? l : e
                }), void 0 !== e ? e : a
            }

            function j(a, b) {
                a.each(function(a, d) {
                    var e = h.data(d, c);
                    e ? (e.option(b), e._init()) : (e = new f(d, b), h.data(d, c, e))
                })
            }
            h = h || b || a.jQuery, h && (f.prototype.option || (f.prototype.option = function(a) {
                h.isPlainObject(a) && (this.options = h.extend(!0, this.options, a))
            }), h.fn[c] = function(a) {
                if ("string" == typeof a) {
                    var b = e.call(arguments, 1);
                    return i(this, a, b)
                }
                return j(this, a), this
            }, d(h))
        }

        function d(a) {
            !a || a && a.bridget || (a.bridget = c)
        }
        var e = Array.prototype.slice,
            f = a.console,
            g = "undefined" == typeof f ? function() {} : function(a) {
                f.error(a)
            };
        return d(b || a.jQuery), c
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : a.EvEmitter = b()
    }("undefined" != typeof window ? window : this, function() {
        function a() {}
        var b = a.prototype;
        return b.on = function(a, b) {
            if (a && b) {
                var c = this._events = this._events || {},
                    d = c[a] = c[a] || [];
                return d.indexOf(b) == -1 && d.push(b), this
            }
        }, b.once = function(a, b) {
            if (a && b) {
                this.on(a, b);
                var c = this._onceEvents = this._onceEvents || {},
                    d = c[a] = c[a] || {};
                return d[b] = !0, this
            }
        }, b.off = function(a, b) {
            var c = this._events && this._events[a];
            if (c && c.length) {
                var d = c.indexOf(b);
                return d != -1 && c.splice(d, 1), this
            }
        }, b.emitEvent = function(a, b) {
            var c = this._events && this._events[a];
            if (c && c.length) {
                var d = 0,
                    e = c[d];
                b = b || [];
                for (var f = this._onceEvents && this._onceEvents[a]; e;) {
                    var g = f && f[e];
                    g && (this.off(a, e), delete f[e]), e.apply(this, b), d += g ? 0 : 1, e = c[d]
                }
                return this
            }
        }, a
    }),
    function(a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
            return b()
        }) : "object" == typeof module && module.exports ? module.exports = b() : a.getSize = b()
    }(window, function() {
        "use strict";

        function a(a) {
            var b = parseFloat(a),
                c = a.indexOf("%") == -1 && !isNaN(b);
            return c && b
        }

        function b() {}

        function c() {
            for (var a = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, b = 0; b < j; b++) {
                var c = i[b];
                a[c] = 0
            }
            return a
        }

        function d(a) {
            var b = getComputedStyle(a);
            return b || h("Style returned " + b + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), b
        }

        function e() {
            if (!k) {
                k = !0;
                var b = document.createElement("div");
                b.style.width = "200px", b.style.padding = "1px 2px 3px 4px", b.style.borderStyle = "solid", b.style.borderWidth = "1px 2px 3px 4px", b.style.boxSizing = "border-box";
                var c = document.body || document.documentElement;
                c.appendChild(b);
                var e = d(b);
                f.isBoxSizeOuter = g = 200 == a(e.width), c.removeChild(b)
            }
        }

        function f(b) {
            if (e(), "string" == typeof b && (b = document.querySelector(b)), b && "object" == typeof b && b.nodeType) {
                var f = d(b);
                if ("none" == f.display) return c();
                var h = {};
                h.width = b.offsetWidth, h.height = b.offsetHeight;
                for (var k = h.isBorderBox = "border-box" == f.boxSizing, l = 0; l < j; l++) {
                    var m = i[l],
                        n = f[m],
                        o = parseFloat(n);
                    h[m] = isNaN(o) ? 0 : o
                }
                var p = h.paddingLeft + h.paddingRight,
                    q = h.paddingTop + h.paddingBottom,
                    r = h.marginLeft + h.marginRight,
                    s = h.marginTop + h.marginBottom,
                    t = h.borderLeftWidth + h.borderRightWidth,
                    u = h.borderTopWidth + h.borderBottomWidth,
                    v = k && g,
                    w = a(f.width);
                w !== !1 && (h.width = w + (v ? 0 : p + t));
                var x = a(f.height);
                return x !== !1 && (h.height = x + (v ? 0 : q + u)), h.innerWidth = h.width - (p + t), h.innerHeight = h.height - (q + u), h.outerWidth = h.width + r, h.outerHeight = h.height + s, h
            }
        }
        var g, h = "undefined" == typeof console ? b : function(a) {
                console.error(a)
            },
            i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            j = i.length,
            k = !1;
        return f
    }),
    function(a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", b) : "object" == typeof module && module.exports ? module.exports = b() : a.matchesSelector = b()
    }(window, function() {
        "use strict";
        var a = function() {
            var a = Element.prototype;
            if (a.matches) return "matches";
            if (a.matchesSelector) return "matchesSelector";
            for (var b = ["webkit", "moz", "ms", "o"], c = 0; c < b.length; c++) {
                var d = b[c],
                    e = d + "MatchesSelector";
                if (a[e]) return e
            }
        }();
        return function(b, c) {
            return b[a](c)
        }
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.matchesSelector)
    }(window, function(a, b) {
        var c = {};
        c.extend = function(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }, c.modulo = function(a, b) {
            return (a % b + b) % b
        }, c.makeArray = function(a) {
            var b = [];
            if (Array.isArray(a)) b = a;
            else if (a && "number" == typeof a.length)
                for (var c = 0; c < a.length; c++) b.push(a[c]);
            else b.push(a);
            return b
        }, c.removeFrom = function(a, b) {
            var c = a.indexOf(b);
            c != -1 && a.splice(c, 1)
        }, c.getParent = function(a, c) {
            for (; a != document.body;)
                if (a = a.parentNode, b(a, c)) return a
        }, c.getQueryElement = function(a) {
            return "string" == typeof a ? document.querySelector(a) : a
        }, c.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, c.filterFindElements = function(a, d) {
            a = c.makeArray(a);
            var e = [];
            return a.forEach(function(a) {
                if (a instanceof HTMLElement) {
                    if (!d) return void e.push(a);
                    b(a, d) && e.push(a);
                    for (var c = a.querySelectorAll(d), f = 0; f < c.length; f++) e.push(c[f])
                }
            }), e
        }, c.debounceMethod = function(a, b, c) {
            var d = a.prototype[b],
                e = b + "Timeout";
            a.prototype[b] = function() {
                var a = this[e];
                a && clearTimeout(a);
                var b = arguments,
                    f = this;
                this[e] = setTimeout(function() {
                    d.apply(f, b), delete f[e]
                }, c || 100)
            }
        }, c.docReady = function(a) {
            var b = document.readyState;
            "complete" == b || "interactive" == b ? setTimeout(a) : document.addEventListener("DOMContentLoaded", a)
        }, c.toDashed = function(a) {
            return a.replace(/(.)([A-Z])/g, function(a, b, c) {
                return b + "-" + c
            }).toLowerCase()
        };
        var d = a.console;
        return c.htmlInit = function(b, e) {
            c.docReady(function() {
                var f = c.toDashed(e),
                    g = "data-" + f,
                    h = document.querySelectorAll("[" + g + "]"),
                    i = document.querySelectorAll(".js-" + f),
                    j = c.makeArray(h).concat(c.makeArray(i)),
                    k = g + "-options",
                    l = a.jQuery;
                j.forEach(function(a) {
                    var c, f = a.getAttribute(g) || a.getAttribute(k);
                    try {
                        c = f && JSON.parse(f)
                    } catch (b) {
                        return void(d && d.error("Error parsing " + g + " on " + a.className + ": " + b))
                    }
                    var h = new b(a, c);
                    l && l.data(a, e, h)
                })
            })
        }, c
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("get-size")) : (a.Flickity = a.Flickity || {}, a.Flickity.Cell = b(a, a.getSize))
    }(window, function(a, b) {
        function c(a, b) {
            this.element = a,
                this.parent = b, this.create()
        }
        var d = c.prototype;
        return d.create = function() {
            this.element.style.position = "absolute", this.x = 0, this.shift = 0
        }, d.destroy = function() {
            this.element.style.position = "";
            var a = this.parent.originSide;
            this.element.style[a] = ""
        }, d.getSize = function() {
            this.size = b(this.element)
        }, d.setPosition = function(a) {
            this.x = a, this.updateTarget(), this.renderPosition(a)
        }, d.updateTarget = d.setDefaultTarget = function() {
            var a = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target = this.x + this.size[a] + this.size.width * this.parent.cellAlign
        }, d.renderPosition = function(a) {
            var b = this.parent.originSide;
            this.element.style[b] = this.parent.getPositionValue(a)
        }, d.wrapShift = function(a) {
            this.shift = a, this.renderPosition(this.x + this.parent.slideableWidth * a)
        }, d.remove = function() {
            this.element.parentNode.removeChild(this.element)
        }, c
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/slide", b) : "object" == typeof module && module.exports ? module.exports = b() : (a.Flickity = a.Flickity || {}, a.Flickity.Slide = b())
    }(window, function() {
        "use strict";

        function a(a) {
            this.parent = a, this.isOriginLeft = "left" == a.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
        }
        var b = a.prototype;
        return b.addCell = function(a) {
            if (this.cells.push(a), this.outerWidth += a.size.outerWidth, this.height = Math.max(a.size.outerHeight, this.height), 1 == this.cells.length) {
                this.x = a.x;
                var b = this.isOriginLeft ? "marginLeft" : "marginRight";
                this.firstMargin = a.size[b]
            }
        }, b.updateTarget = function() {
            var a = this.isOriginLeft ? "marginRight" : "marginLeft",
                b = this.getLastCell(),
                c = b ? b.size[a] : 0,
                d = this.outerWidth - (this.firstMargin + c);
            this.target = this.x + this.firstMargin + d * this.parent.cellAlign
        }, b.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }, b.select = function() {
            this.changeSelectedClass("add")
        }, b.unselect = function() {
            this.changeSelectedClass("remove")
        }, b.changeSelectedClass = function(a) {
            this.cells.forEach(function(b) {
                b.element.classList[a]("is-selected")
            })
        }, b.getCellElements = function() {
            return this.cells.map(function(a) {
                return a.element
            })
        }, a
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("fizzy-ui-utils")) : (a.Flickity = a.Flickity || {}, a.Flickity.animatePrototype = b(a, a.fizzyUIUtils))
    }(window, function(a, b) {
        var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
            d = 0;
        c || (c = function(a) {
            var b = (new Date).getTime(),
                c = Math.max(0, 16 - (b - d)),
                e = setTimeout(a, c);
            return d = b + c, e
        });
        var e = {};
        e.startAnimation = function() {
            this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
        }, e.animate = function() {
            this.applyDragForce(), this.applySelectedAttraction();
            var a = this.x;
            if (this.integratePhysics(), this.positionSlider(), this.settle(a), this.isAnimating) {
                var b = this;
                c(function() {
                    b.animate()
                })
            }
        };
        var f = function() {
            var a = document.documentElement.style;
            return "string" == typeof a.transform ? "transform" : "WebkitTransform"
        }();
        return e.positionSlider = function() {
            var a = this.x;
            this.options.wrapAround && this.cells.length > 1 && (a = b.modulo(a, this.slideableWidth), a -= this.slideableWidth, this.shiftWrapCells(a)), a += this.cursorPosition, a = this.options.rightToLeft && f ? -a : a;
            var c = this.getPositionValue(a);
            this.slider.style[f] = this.isAnimating ? "translate3d(" + c + ",0,0)" : "translateX(" + c + ")";
            var d = this.slides[0];
            if (d) {
                var e = -this.x - d.target,
                    g = e / this.slidesWidth;
                this.dispatchEvent("scroll", null, [g, e])
            }
        }, e.positionSliderAtSelected = function() {
            this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider())
        }, e.getPositionValue = function(a) {
            return this.options.percentPosition ? .01 * Math.round(a / this.size.innerWidth * 1e4) + "%" : Math.round(a) + "px"
        }, e.settle = function(a) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * a) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle"))
        }, e.shiftWrapCells = function(a) {
            var b = this.cursorPosition + a;
            this._shiftCells(this.beforeShiftCells, b, -1);
            var c = this.size.innerWidth - (a + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, c, 1)
        }, e._shiftCells = function(a, b, c) {
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    f = b > 0 ? c : 0;
                e.wrapShift(f), b -= e.size.outerWidth
            }
        }, e._unshiftCells = function(a) {
            if (a && a.length)
                for (var b = 0; b < a.length; b++) a[b].wrapShift(0)
        }, e.integratePhysics = function() {
            this.x += this.velocity, this.velocity *= this.getFrictionFactor()
        }, e.applyForce = function(a) {
            this.velocity += a
        }, e.getFrictionFactor = function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        }, e.getRestingPosition = function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        }, e.applyDragForce = function() {
            if (this.isPointerDown) {
                var a = this.dragX - this.x,
                    b = a - this.velocity;
                this.applyForce(b)
            }
        }, e.applySelectedAttraction = function() {
            if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
                var a = this.selectedSlide.target * -1 - this.x,
                    b = a * this.options.selectedAttraction;
                this.applyForce(b)
            }
        }, e
    }),
    function(a, b) {
        if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(c, d, e, f, g, h) {
            return b(a, c, d, e, f, g, h)
        });
        else if ("object" == typeof module && module.exports) module.exports = b(a, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
        else {
            var c = a.Flickity;
            a.Flickity = b(a, a.EvEmitter, a.getSize, a.fizzyUIUtils, c.Cell, c.Slide, c.animatePrototype)
        }
    }(window, function(a, b, c, d, e, f, g) {
        function h(a, b) {
            for (a = d.makeArray(a); a.length;) b.appendChild(a.shift())
        }

        function i(a, b) {
            var c = d.getQueryElement(a);
            if (!c) return void(l && l.error("Bad element for Flickity: " + (c || a)));
            if (this.element = c, this.element.flickityGUID) {
                var e = n[this.element.flickityGUID];
                return e.option(b), e
            }
            j && (this.$element = j(this.element)), this.options = d.extend({}, this.constructor.defaults), this.option(b), this._create()
        }
        var j = a.jQuery,
            k = a.getComputedStyle,
            l = a.console,
            m = 0,
            n = {};
        i.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        }, i.createMethods = [];
        var o = i.prototype;
        d.extend(o, b.prototype), o._create = function() {
            var b = this.guid = ++m;
            this.element.flickityGUID = b, n[b] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && a.addEventListener("resize", this), i.createMethods.forEach(function(a) {
                this[a]()
            }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
        }, o.option = function(a) {
            d.extend(this.options, a)
        }, o.activate = function() {
            if (!this.isActive) {
                this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
                var a = this._filterFindCellElements(this.element.children);
                h(a, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
                var b, c = this.options.initialIndex;
                b = this.isInitActivated ? this.selectedIndex : void 0 !== c && this.cells[c] ? c : 0, this.select(b, !1, !0), this.isInitActivated = !0
            }
        }, o._createSlider = function() {
            var a = document.createElement("div");
            a.className = "flickity-slider", a.style[this.originSide] = 0, this.slider = a
        }, o._filterFindCellElements = function(a) {
            return d.filterFindElements(a, this.options.cellSelector)
        }, o.reloadCells = function() {
            this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
        }, o._makeCells = function(a) {
            var b = this._filterFindCellElements(a),
                c = b.map(function(a) {
                    return new e(a, this)
                }, this);
            return c
        }, o.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }, o.getLastSlide = function() {
            return this.slides[this.slides.length - 1]
        }, o.positionCells = function() {
            this._sizeCells(this.cells), this._positionCells(0)
        }, o._positionCells = function(a) {
            a = a || 0, this.maxCellHeight = a ? this.maxCellHeight || 0 : 0;
            var b = 0;
            if (a > 0) {
                var c = this.cells[a - 1];
                b = c.x + c.size.outerWidth
            }
            for (var d = this.cells.length, e = a; e < d; e++) {
                var f = this.cells[e];
                f.setPosition(b), b += f.size.outerWidth, this.maxCellHeight = Math.max(f.size.outerHeight, this.maxCellHeight)
            }
            this.slideableWidth = b, this.updateSlides(), this._containSlides(), this.slidesWidth = d ? this.getLastSlide().target - this.slides[0].target : 0
        }, o._sizeCells = function(a) {
            a.forEach(function(a) {
                a.getSize()
            })
        }, o.updateSlides = function() {
            if (this.slides = [], this.cells.length) {
                var a = new f(this);
                this.slides.push(a);
                var b = "left" == this.originSide,
                    c = b ? "marginRight" : "marginLeft",
                    d = this._getCanCellFit();
                this.cells.forEach(function(b, e) {
                    if (!a.cells.length) return void a.addCell(b);
                    var g = a.outerWidth - a.firstMargin + (b.size.outerWidth - b.size[c]);
                    d.call(this, e, g) ? a.addCell(b) : (a.updateTarget(), a = new f(this), this.slides.push(a), a.addCell(b))
                }, this), a.updateTarget(), this.updateSelectedSlide()
            }
        }, o._getCanCellFit = function() {
            var a = this.options.groupCells;
            if (!a) return function() {
                return !1
            };
            if ("number" == typeof a) {
                var b = parseInt(a, 10);
                return function(a) {
                    return a % b !== 0
                }
            }
            var c = "string" == typeof a && a.match(/^(\d+)%$/),
                d = c ? parseInt(c[1], 10) / 100 : 1;
            return function(a, b) {
                return b <= (this.size.innerWidth + 1) * d
            }
        }, o._init = o.reposition = function() {
            this.positionCells(), this.positionSliderAtSelected()
        }, o.getSize = function() {
            this.size = c(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
        };
        var p = {
            center: {
                left: .5,
                right: .5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        return o.setCellAlign = function() {
            var a = p[this.options.cellAlign];
            this.cellAlign = a ? a[this.originSide] : this.options.cellAlign
        }, o.setGallerySize = function() {
            if (this.options.setGallerySize) {
                var a = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                this.viewport.style.height = a + "px"
            }
        }, o._getWrapShiftCells = function() {
            if (this.options.wrapAround) {
                this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                var a = this.cursorPosition,
                    b = this.cells.length - 1;
                this.beforeShiftCells = this._getGapCells(a, b, -1), a = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(a, 0, 1)
            }
        }, o._getGapCells = function(a, b, c) {
            for (var d = []; a > 0;) {
                var e = this.cells[b];
                if (!e) break;
                d.push(e), b += c, a -= e.size.outerWidth
            }
            return d
        }, o._containSlides = function() {
            if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                var a = this.options.rightToLeft,
                    b = a ? "marginRight" : "marginLeft",
                    c = a ? "marginLeft" : "marginRight",
                    d = this.slideableWidth - this.getLastCell().size[c],
                    e = d < this.size.innerWidth,
                    f = this.cursorPosition + this.cells[0].size[b],
                    g = d - this.size.innerWidth * (1 - this.cellAlign);
                this.slides.forEach(function(a) {
                    e ? a.target = d * this.cellAlign : (a.target = Math.max(a.target, f), a.target = Math.min(a.target, g))
                }, this)
            }
        }, o.dispatchEvent = function(a, b, c) {
            var d = b ? [b].concat(c) : c;
            if (this.emitEvent(a, d), j && this.$element) {
                a += this.options.namespaceJQueryEvents ? ".flickity" : "";
                var e = a;
                if (b) {
                    var f = j.Event(b);
                    f.type = a, e = f
                }
                this.$element.trigger(e, c)
            }
        }, o.select = function(a, b, c) {
            this.isActive && (a = parseInt(a, 10), this._wrapSelect(a), (this.options.wrapAround || b) && (a = d.modulo(a, this.slides.length)), this.slides[a] && (this.selectedIndex = a, this.updateSelectedSlide(), c ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select"), this.dispatchEvent("cellSelect")))
        }, o._wrapSelect = function(a) {
            var b = this.slides.length,
                c = this.options.wrapAround && b > 1;
            if (!c) return a;
            var e = d.modulo(a, b),
                f = Math.abs(e - this.selectedIndex),
                g = Math.abs(e + b - this.selectedIndex),
                h = Math.abs(e - b - this.selectedIndex);
            !this.isDragSelect && g < f ? a += b : !this.isDragSelect && h < f && (a -= b), a < 0 ? this.x -= this.slideableWidth : a >= b && (this.x += this.slideableWidth)
        }, o.previous = function(a, b) {
            this.select(this.selectedIndex - 1, a, b)
        }, o.next = function(a, b) {
            this.select(this.selectedIndex + 1, a, b)
        }, o.updateSelectedSlide = function() {
            var a = this.slides[this.selectedIndex];
            a && (this.unselectSelectedSlide(), this.selectedSlide = a, a.select(), this.selectedCells = a.cells, this.selectedElements = a.getCellElements(), this.selectedCell = a.cells[0], this.selectedElement = this.selectedElements[0])
        }, o.unselectSelectedSlide = function() {
            this.selectedSlide && this.selectedSlide.unselect()
        }, o.selectCell = function(a, b, c) {
            var d;
            "number" == typeof a ? d = this.cells[a] : ("string" == typeof a && (a = this.element.querySelector(a)), d = this.getCell(a));
            for (var e = 0; d && e < this.slides.length; e++) {
                var f = this.slides[e],
                    g = f.cells.indexOf(d);
                if (g != -1) return void this.select(e, b, c)
            }
        }, o.getCell = function(a) {
            for (var b = 0; b < this.cells.length; b++) {
                var c = this.cells[b];
                if (c.element == a) return c
            }
        }, o.getCells = function(a) {
            a = d.makeArray(a);
            var b = [];
            return a.forEach(function(a) {
                var c = this.getCell(a);
                c && b.push(c)
            }, this), b
        }, o.getCellElements = function() {
            return this.cells.map(function(a) {
                return a.element
            })
        }, o.getParentCell = function(a) {
            var b = this.getCell(a);
            return b ? b : (a = d.getParent(a, ".flickity-slider > *"), this.getCell(a))
        }, o.getAdjacentCellElements = function(a, b) {
            if (!a) return this.selectedSlide.getCellElements();
            b = void 0 === b ? this.selectedIndex : b;
            var c = this.slides.length;
            if (1 + 2 * a >= c) return this.getCellElements();
            for (var e = [], f = b - a; f <= b + a; f++) {
                var g = this.options.wrapAround ? d.modulo(f, c) : f,
                    h = this.slides[g];
                h && (e = e.concat(h.getCellElements()))
            }
            return e
        }, o.uiChange = function() {
            this.emitEvent("uiChange")
        }, o.childUIPointerDown = function(a) {
            this.emitEvent("childUIPointerDown", [a])
        }, o.onresize = function() {
            this.watchCSS(), this.resize()
        }, d.debounceMethod(i, "onresize", 150), o.resize = function() {
            if (this.isActive) {
                this.getSize(), this.options.wrapAround && (this.x = d.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                var a = this.selectedElements && this.selectedElements[0];
                this.selectCell(a, !1, !0)
            }
        }, o.watchCSS = function() {
            var a = this.options.watchCSS;
            if (a) {
                var b = k(this.element, ":after").content;
                b.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
            }
        }, o.onkeydown = function(a) {
            if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
                if (37 == a.keyCode) {
                    var b = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(), this[b]()
                } else if (39 == a.keyCode) {
                var c = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(), this[c]()
            }
        }, o.deactivate = function() {
            this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function(a) {
                a.destroy()
            }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), h(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
        }, o.destroy = function() {
            this.deactivate(), a.removeEventListener("resize", this), this.emitEvent("destroy"), j && this.$element && j.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete n[this.guid]
        }, d.extend(o, g), i.data = function(a) {
            a = d.getQueryElement(a);
            var b = a && a.flickityGUID;
            return b && n[b]
        }, d.htmlInit(i, "flickity"), j && j.bridget && j.bridget("flickity", i), i.Cell = e, i
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.Unipointer = b(a, a.EvEmitter)
    }(window, function(a, b) {
        function c() {}

        function d() {}
        var e = d.prototype = Object.create(b.prototype);
        e.bindStartEvent = function(a) {
            this._bindStartEvent(a, !0)
        }, e.unbindStartEvent = function(a) {
            this._bindStartEvent(a, !1)
        }, e._bindStartEvent = function(b, c) {
            c = void 0 === c || !!c;
            var d = c ? "addEventListener" : "removeEventListener";
            a.navigator.pointerEnabled ? b[d]("pointerdown", this) : a.navigator.msPointerEnabled ? b[d]("MSPointerDown", this) : (b[d]("mousedown", this), b[d]("touchstart", this))
        }, e.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, e.getTouch = function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (c.identifier == this.pointerIdentifier) return c
            }
        }, e.onmousedown = function(a) {
            var b = a.button;
            b && 0 !== b && 1 !== b || this._pointerDown(a, a)
        }, e.ontouchstart = function(a) {
            this._pointerDown(a, a.changedTouches[0])
        }, e.onMSPointerDown = e.onpointerdown = function(a) {
            this._pointerDown(a, a)
        }, e._pointerDown = function(a, b) {
            this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== b.pointerId ? b.pointerId : b.identifier, this.pointerDown(a, b))
        }, e.pointerDown = function(a, b) {
            this._bindPostStartEvents(a), this.emitEvent("pointerDown", [a, b])
        };
        var f = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"],
            MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
        };
        return e._bindPostStartEvents = function(b) {
            if (b) {
                var c = f[b.type];
                c.forEach(function(b) {
                    a.addEventListener(b, this)
                }, this), this._boundPointerEvents = c
            }
        }, e._unbindPostStartEvents = function() {
            this._boundPointerEvents && (this._boundPointerEvents.forEach(function(b) {
                a.removeEventListener(b, this)
            }, this), delete this._boundPointerEvents)
        }, e.onmousemove = function(a) {
            this._pointerMove(a, a)
        }, e.onMSPointerMove = e.onpointermove = function(a) {
            a.pointerId == this.pointerIdentifier && this._pointerMove(a, a)
        }, e.ontouchmove = function(a) {
            var b = this.getTouch(a.changedTouches);
            b && this._pointerMove(a, b)
        }, e._pointerMove = function(a, b) {
            this.pointerMove(a, b)
        }, e.pointerMove = function(a, b) {
            this.emitEvent("pointerMove", [a, b])
        }, e.onmouseup = function(a) {
            this._pointerUp(a, a)
        }, e.onMSPointerUp = e.onpointerup = function(a) {
            a.pointerId == this.pointerIdentifier && this._pointerUp(a, a)
        }, e.ontouchend = function(a) {
            var b = this.getTouch(a.changedTouches);
            b && this._pointerUp(a, b)
        }, e._pointerUp = function(a, b) {
            this._pointerDone(), this.pointerUp(a, b)
        }, e.pointerUp = function(a, b) {
            this.emitEvent("pointerUp", [a, b])
        }, e._pointerDone = function() {
            this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
        }, e.pointerDone = c, e.onMSPointerCancel = e.onpointercancel = function(a) {
            a.pointerId == this.pointerIdentifier && this._pointerCancel(a, a)
        }, e.ontouchcancel = function(a) {
            var b = this.getTouch(a.changedTouches);
            b && this._pointerCancel(a, b)
        }, e._pointerCancel = function(a, b) {
            this._pointerDone(), this.pointerCancel(a, b)
        }, e.pointerCancel = function(a, b) {
            this.emitEvent("pointerCancel", [a, b])
        }, d.getPointerPoint = function(a) {
            return {
                x: a.pageX,
                y: a.pageY
            }
        }, d
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("unipointer")) : a.Unidragger = b(a, a.Unipointer)
    }(window, function(a, b) {
        function c() {}

        function d() {}
        var e = d.prototype = Object.create(b.prototype);
        e.bindHandles = function() {
            this._bindHandles(!0)
        }, e.unbindHandles = function() {
            this._bindHandles(!1)
        };
        var f = a.navigator;
        return e._bindHandles = function(a) {
            a = void 0 === a || !!a;
            var b;
            b = f.pointerEnabled ? function(b) {
                b.style.touchAction = a ? "none" : ""
            } : f.msPointerEnabled ? function(b) {
                b.style.msTouchAction = a ? "none" : ""
            } : c;
            for (var d = a ? "addEventListener" : "removeEventListener", e = 0; e < this.handles.length; e++) {
                var g = this.handles[e];
                this._bindStartEvent(g, a), b(g), g[d]("click", this)
            }
        }, e.pointerDown = function(a, b) {
            if ("INPUT" == a.target.nodeName && "range" == a.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(a, b);
            var c = document.activeElement;
            c && c.blur && c.blur(), this._bindPostStartEvents(a), this.emitEvent("pointerDown", [a, b])
        }, e._dragPointerDown = function(a, c) {
            this.pointerDownPoint = b.getPointerPoint(c);
            var d = this.canPreventDefaultOnPointerDown(a, c);
            d && a.preventDefault()
        }, e.canPreventDefaultOnPointerDown = function(a) {
            return "SELECT" != a.target.nodeName
        }, e.pointerMove = function(a, b) {
            var c = this._dragPointerMove(a, b);
            this.emitEvent("pointerMove", [a, b, c]), this._dragMove(a, b, c)
        }, e._dragPointerMove = function(a, c) {
            var d = b.getPointerPoint(c),
                e = {
                    x: d.x - this.pointerDownPoint.x,
                    y: d.y - this.pointerDownPoint.y
                };
            return !this.isDragging && this.hasDragStarted(e) && this._dragStart(a, c), e
        }, e.hasDragStarted = function(a) {
            return Math.abs(a.x) > 3 || Math.abs(a.y) > 3
        }, e.pointerUp = function(a, b) {
            this.emitEvent("pointerUp", [a, b]), this._dragPointerUp(a, b)
        }, e._dragPointerUp = function(a, b) {
            this.isDragging ? this._dragEnd(a, b) : this._staticClick(a, b)
        }, e._dragStart = function(a, c) {
            this.isDragging = !0, this.dragStartPoint = b.getPointerPoint(c), this.isPreventingClicks = !0, this.dragStart(a, c)
        }, e.dragStart = function(a, b) {
            this.emitEvent("dragStart", [a, b])
        }, e._dragMove = function(a, b, c) {
            this.isDragging && this.dragMove(a, b, c)
        }, e.dragMove = function(a, b, c) {
            a.preventDefault(), this.emitEvent("dragMove", [a, b, c])
        }, e._dragEnd = function(a, b) {
            this.isDragging = !1, setTimeout(function() {
                delete this.isPreventingClicks
            }.bind(this)), this.dragEnd(a, b)
        }, e.dragEnd = function(a, b) {
            this.emitEvent("dragEnd", [a, b])
        }, e.onclick = function(a) {
            this.isPreventingClicks && a.preventDefault()
        }, e._staticClick = function(a, b) {
            if (!this.isIgnoringMouseUp || "mouseup" != a.type) {
                var c = a.target.nodeName;
                "INPUT" != c && "TEXTAREA" != c || a.target.focus(), this.staticClick(a, b), "mouseup" != a.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                    delete this.isIgnoringMouseUp
                }.bind(this), 400))
            }
        }, e.staticClick = function(a, b) {
            this.emitEvent("staticClick", [a, b])
        }, d.getPointerPoint = b.getPointerPoint, d
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(c, d, e) {
            return b(a, c, d, e)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : a.Flickity = b(a, a.Flickity, a.Unidragger, a.fizzyUIUtils)
    }(window, function(a, b, c, d) {
        function e() {
            return {
                x: a.pageXOffset,
                y: a.pageYOffset
            }
        }
        d.extend(b.defaults, {
            draggable: !0,
            dragThreshold: 3
        }), b.createMethods.push("_createDrag");
        var f = b.prototype;
        d.extend(f, c.prototype);
        var g = "createTouch" in document,
            h = !1;
        f._createDrag = function() {
            this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), g && !h && (a.addEventListener("touchmove", function() {}), h = !0)
        }, f.bindDrag = function() {
            this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
        }, f.unbindDrag = function() {
            this.isDragBound && (this.element.classList.remove("is-draggable"), this.unbindHandles(), delete this.isDragBound)
        }, f._uiChangeDrag = function() {
            delete this.isFreeScrolling
        }, f._childUIPointerDownDrag = function(a) {
            a.preventDefault(), this.pointerDownFocus(a)
        };
        var i = {
                TEXTAREA: !0,
                INPUT: !0,
                OPTION: !0
            },
            j = {
                radio: !0,
                checkbox: !0,
                button: !0,
                submit: !0,
                image: !0,
                file: !0
            };
        f.pointerDown = function(b, c) {
            var d = i[b.target.nodeName] && !j[b.target.type];
            if (d) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(b, c);
            var f = document.activeElement;
            f && f.blur && f != this.element && f != document.body && f.blur(), this.pointerDownFocus(b), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this._bindPostStartEvents(b), this.pointerDownScroll = e(), a.addEventListener("scroll", this), this.dispatchEvent("pointerDown", b, [c])
        };
        var k = {
                touchstart: !0,
                MSPointerDown: !0
            },
            l = {
                INPUT: !0,
                SELECT: !0
            };
        return f.pointerDownFocus = function(b) {
            if (this.options.accessibility && !k[b.type] && !l[b.target.nodeName]) {
                var c = a.pageYOffset;
                this.element.focus(), a.pageYOffset != c && a.scrollTo(a.pageXOffset, c)
            }
        }, f.canPreventDefaultOnPointerDown = function(a) {
            var b = "touchstart" == a.type,
                c = a.target.nodeName;
            return !b && "SELECT" != c
        }, f.hasDragStarted = function(a) {
            return Math.abs(a.x) > this.options.dragThreshold
        }, f.pointerUp = function(a, b) {
            delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", a, [b]), this._dragPointerUp(a, b)
        }, f.pointerDone = function() {
            a.removeEventListener("scroll", this), delete this.pointerDownScroll
        }, f.dragStart = function(b, c) {
            this.dragStartPosition = this.x, this.startAnimation(), a.removeEventListener("scroll", this), this.dispatchEvent("dragStart", b, [c])
        }, f.pointerMove = function(a, b) {
            var c = this._dragPointerMove(a, b);
            this.dispatchEvent("pointerMove", a, [b, c]), this._dragMove(a, b, c)
        }, f.dragMove = function(a, b, c) {
            a.preventDefault(), this.previousDragX = this.dragX;
            var d = this.options.rightToLeft ? -1 : 1,
                e = this.dragStartPosition + c.x * d;
            if (!this.options.wrapAround && this.slides.length) {
                var f = Math.max(-this.slides[0].target, this.dragStartPosition);
                e = e > f ? .5 * (e + f) : e;
                var g = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                e = e < g ? .5 * (e + g) : e
            }
            this.dragX = e, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", a, [b, c])
        }, f.dragEnd = function(a, b) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var c = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var d = this.getRestingPosition();
                this.isFreeScrolling = -d > this.slides[0].target && -d < this.getLastSlide().target
            } else this.options.freeScroll || c != this.selectedIndex || (c += this.dragEndBoostSelect());
            delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(c), delete this.isDragSelect, this.dispatchEvent("dragEnd", a, [b])
        }, f.dragEndRestingSelect = function() {
            var a = this.getRestingPosition(),
                b = Math.abs(this.getSlideDistance(-a, this.selectedIndex)),
                c = this._getClosestResting(a, b, 1),
                d = this._getClosestResting(a, b, -1),
                e = c.distance < d.distance ? c.index : d.index;
            return e
        }, f._getClosestResting = function(a, b, c) {
            for (var d = this.selectedIndex, e = 1 / 0, f = this.options.contain && !this.options.wrapAround ? function(a, b) {
                    return a <= b
                } : function(a, b) {
                    return a < b
                }; f(b, e) && (d += c, e = b, b = this.getSlideDistance(-a, d), null !== b);) b = Math.abs(b);
            return {
                distance: e,
                index: d - c
            }
        }, f.getSlideDistance = function(a, b) {
            var c = this.slides.length,
                e = this.options.wrapAround && c > 1,
                f = e ? d.modulo(b, c) : b,
                g = this.slides[f];
            if (!g) return null;
            var h = e ? this.slideableWidth * Math.floor(b / c) : 0;
            return a - (g.target + h)
        }, f.dragEndBoostSelect = function() {
            if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
            var a = this.getSlideDistance(-this.dragX, this.selectedIndex),
                b = this.previousDragX - this.dragX;
            return a > 0 && b > 0 ? 1 : a < 0 && b < 0 ? -1 : 0
        }, f.staticClick = function(a, b) {
            var c = this.getParentCell(a.target),
                d = c && c.element,
                e = c && this.cells.indexOf(c);
            this.dispatchEvent("staticClick", a, [b, d, e])
        }, f.onscroll = function() {
            var a = e(),
                b = this.pointerDownScroll.x - a.x,
                c = this.pointerDownScroll.y - a.y;
            (Math.abs(b) > 3 || Math.abs(c) > 3) && this._pointerDone()
        }, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("unipointer")) : a.TapListener = b(a, a.Unipointer)
    }(window, function(a, b) {
        function c(a) {
            this.bindTap(a)
        }
        var d = c.prototype = Object.create(b.prototype);
        return d.bindTap = function(a) {
            a && (this.unbindTap(), this.tapElement = a, this._bindStartEvent(a, !0))
        }, d.unbindTap = function() {
            this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
        }, d.pointerUp = function(c, d) {
            if (!this.isIgnoringMouseUp || "mouseup" != c.type) {
                var e = b.getPointerPoint(d),
                    f = this.tapElement.getBoundingClientRect(),
                    g = a.pageXOffset,
                    h = a.pageYOffset,
                    i = e.x >= f.left + g && e.x <= f.right + g && e.y >= f.top + h && e.y <= f.bottom + h;
                if (i && this.emitEvent("tap", [c, d]), "mouseup" != c.type) {
                    this.isIgnoringMouseUp = !0;
                    var j = this;
                    setTimeout(function() {
                        delete j.isIgnoringMouseUp
                    }, 400)
                }
            }
        }, d.destroy = function() {
            this.pointerDone(), this.unbindTap()
        }, c
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(c, d, e) {
            return b(a, c, d, e)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.TapListener, a.fizzyUIUtils)
    }(window, function(a, b, c, d) {
        "use strict";

        function e(a, b) {
            this.direction = a, this.parent = b, this._create()
        }

        function f(a) {
            return "string" == typeof a ? a : "M " + a.x0 + ",50 L " + a.x1 + "," + (a.y1 + 50) + " L " + a.x2 + "," + (a.y2 + 50) + " L " + a.x3 + ",50  L " + a.x2 + "," + (50 - a.y2) + " L " + a.x1 + "," + (50 - a.y1) + " Z"
        }
        var g = "http://www.w3.org/2000/svg";
        e.prototype = new c, e.prototype._create = function() {
            this.isEnabled = !0, this.isPrevious = this.direction == -1;
            var a = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == a;
            var b = this.element = document.createElement("button");
            b.className = "flickity-prev-next-button", b.className += this.isPrevious ? " previous" : " next", b.setAttribute("type", "button"), this.disable(), b.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
            var c = this.createSVG();
            b.appendChild(c), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, e.prototype.activate = function() {
            this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
        }, e.prototype.deactivate = function() {
            this.parent.element.removeChild(this.element), c.prototype.destroy.call(this), this.element.removeEventListener("click", this)
        }, e.prototype.createSVG = function() {
            var a = document.createElementNS(g, "svg");
            a.setAttribute("viewBox", "0 0 100 100");
            var b = document.createElementNS(g, "path"),
                c = f(this.parent.options.arrowShape);
            return b.setAttribute("d", c), b.setAttribute("class", "arrow"), this.isLeft || b.setAttribute("transform", "translate(100, 100) rotate(180) "), a.appendChild(b), a
        }, e.prototype.onTap = function() {
            if (this.isEnabled) {
                this.parent.uiChange();
                var a = this.isPrevious ? "previous" : "next";
                this.parent[a]()
            }
        }, e.prototype.handleEvent = d.handleEvent, e.prototype.onclick = function() {
            var a = document.activeElement;
            a && a == this.element && this.onTap()
        }, e.prototype.enable = function() {
            this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
        }, e.prototype.disable = function() {
            this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
        }, e.prototype.update = function() {
            var a = this.parent.slides;
            if (this.parent.options.wrapAround && a.length > 1) return void this.enable();
            var b = a.length ? a.length - 1 : 0,
                c = this.isPrevious ? 0 : b,
                d = this.parent.selectedIndex == c ? "disable" : "enable";
            this[d]()
        }, e.prototype.destroy = function() {
            this.deactivate()
        }, d.extend(b.defaults, {
            prevNextButtons: !0,
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
            }
        }), b.createMethods.push("_createPrevNextButtons");
        var h = b.prototype;
        return h._createPrevNextButtons = function() {
            this.options.prevNextButtons && (this.prevButton = new e(-1, this), this.nextButton = new e(1, this), this.on("activate", this.activatePrevNextButtons))
        }, h.activatePrevNextButtons = function() {
            this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
        }, h.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
        }, b.PrevNextButton = e, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(c, d, e) {
            return b(a, c, d, e)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.TapListener, a.fizzyUIUtils)
    }(window, function(a, b, c, d) {
        function e(a) {
            this.parent = a, this._create()
        }
        e.prototype = new c, e.prototype._create = function() {
            this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, e.prototype.activate = function() {
            this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
        }, e.prototype.deactivate = function() {
            this.parent.element.removeChild(this.holder), c.prototype.destroy.call(this)
        }, e.prototype.setDots = function() {
            var a = this.parent.slides.length - this.dots.length;
            a > 0 ? this.addDots(a) : a < 0 && this.removeDots(-a)
        }, e.prototype.addDots = function(a) {
            for (var b = document.createDocumentFragment(), c = []; a;) {
                var d = document.createElement("li");
                d.className = "dot", b.appendChild(d), c.push(d), a--
            }
            this.holder.appendChild(b),
                this.dots = this.dots.concat(c)
        }, e.prototype.removeDots = function(a) {
            var b = this.dots.splice(this.dots.length - a, a);
            b.forEach(function(a) {
                this.holder.removeChild(a)
            }, this)
        }, e.prototype.updateSelected = function() {
            this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
        }, e.prototype.onTap = function(a) {
            var b = a.target;
            if ("LI" == b.nodeName) {
                this.parent.uiChange();
                var c = this.dots.indexOf(b);
                this.parent.select(c)
            }
        }, e.prototype.destroy = function() {
            this.deactivate()
        }, b.PageDots = e, d.extend(b.defaults, {
            pageDots: !0
        }), b.createMethods.push("_createPageDots");
        var f = b.prototype;
        return f._createPageDots = function() {
            this.options.pageDots && (this.pageDots = new e(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
        }, f.activatePageDots = function() {
            this.pageDots.activate()
        }, f.updateSelectedPageDots = function() {
            this.pageDots.updateSelected()
        }, f.updatePageDots = function() {
            this.pageDots.setDots()
        }, f.deactivatePageDots = function() {
            this.pageDots.deactivate()
        }, b.PageDots = e, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(a, c, d) {
            return b(a, c, d)
        }) : "object" == typeof module && module.exports ? module.exports = b(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : b(a.EvEmitter, a.fizzyUIUtils, a.Flickity)
    }(window, function(a, b, c) {
        function d(a) {
            this.parent = a, this.state = "stopped", f && (this.onVisibilityChange = function() {
                this.visibilityChange()
            }.bind(this), this.onVisibilityPlay = function() {
                this.visibilityPlay()
            }.bind(this))
        }
        var e, f;
        "hidden" in document ? (e = "hidden", f = "visibilitychange") : "webkitHidden" in document && (e = "webkitHidden", f = "webkitvisibilitychange"), d.prototype = Object.create(a.prototype), d.prototype.play = function() {
            if ("playing" != this.state) {
                var a = document[e];
                if (f && a) return void document.addEventListener(f, this.onVisibilityPlay);
                this.state = "playing", f && document.addEventListener(f, this.onVisibilityChange), this.tick()
            }
        }, d.prototype.tick = function() {
            if ("playing" == this.state) {
                var a = this.parent.options.autoPlay;
                a = "number" == typeof a ? a : 3e3;
                var b = this;
                this.clear(), this.timeout = setTimeout(function() {
                    b.parent.next(!0), b.tick()
                }, a)
            }
        }, d.prototype.stop = function() {
            this.state = "stopped", this.clear(), f && document.removeEventListener(f, this.onVisibilityChange)
        }, d.prototype.clear = function() {
            clearTimeout(this.timeout)
        }, d.prototype.pause = function() {
            "playing" == this.state && (this.state = "paused", this.clear())
        }, d.prototype.unpause = function() {
            "paused" == this.state && this.play()
        }, d.prototype.visibilityChange = function() {
            var a = document[e];
            this[a ? "pause" : "unpause"]()
        }, d.prototype.visibilityPlay = function() {
            this.play(), document.removeEventListener(f, this.onVisibilityPlay)
        }, b.extend(c.defaults, {
            pauseAutoPlayOnHover: !0
        }), c.createMethods.push("_createPlayer");
        var g = c.prototype;
        return g._createPlayer = function() {
            this.player = new d(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
        }, g.activatePlayer = function() {
            this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
        }, g.playPlayer = function() {
            this.player.play()
        }, g.stopPlayer = function() {
            this.player.stop()
        }, g.pausePlayer = function() {
            this.player.pause()
        }, g.unpausePlayer = function() {
            this.player.unpause()
        }, g.deactivatePlayer = function() {
            this.player.stop(), this.element.removeEventListener("mouseenter", this)
        }, g.onmouseenter = function() {
            this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
        }, g.onmouseleave = function() {
            this.player.unpause(), this.element.removeEventListener("mouseleave", this)
        }, c.Player = d, c
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(c, d) {
            return b(a, c, d)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.fizzyUIUtils)
    }(window, function(a, b, c) {
        function d(a) {
            var b = document.createDocumentFragment();
            return a.forEach(function(a) {
                b.appendChild(a.element)
            }), b
        }
        var e = b.prototype;
        return e.insert = function(a, b) {
            var c = this._makeCells(a);
            if (c && c.length) {
                var e = this.cells.length;
                b = void 0 === b ? e : b;
                var f = d(c),
                    g = b == e;
                if (g) this.slider.appendChild(f);
                else {
                    var h = this.cells[b].element;
                    this.slider.insertBefore(f, h)
                }
                if (0 === b) this.cells = c.concat(this.cells);
                else if (g) this.cells = this.cells.concat(c);
                else {
                    var i = this.cells.splice(b, e - b);
                    this.cells = this.cells.concat(c).concat(i)
                }
                this._sizeCells(c);
                var j = b > this.selectedIndex ? 0 : c.length;
                this._cellAddedRemoved(b, j)
            }
        }, e.append = function(a) {
            this.insert(a, this.cells.length)
        }, e.prepend = function(a) {
            this.insert(a, 0)
        }, e.remove = function(a) {
            var b, d, e = this.getCells(a),
                f = 0,
                g = e.length;
            for (b = 0; b < g; b++) {
                d = e[b];
                var h = this.cells.indexOf(d) < this.selectedIndex;
                f -= h ? 1 : 0
            }
            for (b = 0; b < g; b++) d = e[b], d.remove(), c.removeFrom(this.cells, d);
            e.length && this._cellAddedRemoved(0, f)
        }, e._cellAddedRemoved = function(a, b) {
            b = b || 0, this.selectedIndex += b, this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)), this.cellChange(a, !0), this.emitEvent("cellAddedRemoved", [a, b])
        }, e.cellSizeChange = function(a) {
            var b = this.getCell(a);
            if (b) {
                b.getSize();
                var c = this.cells.indexOf(b);
                this.cellChange(c)
            }
        }, e.cellChange = function(a, b) {
            var c = this.slideableWidth;
            if (this._positionCells(a), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("cellChange", [a]), this.options.freeScroll) {
                var d = c - this.slideableWidth;
                this.x += d * this.cellAlign, this.positionSlider()
            } else b && this.positionSliderAtSelected(), this.select(this.selectedIndex)
        }, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(c, d) {
            return b(a, c, d)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.fizzyUIUtils)
    }(window, function(a, b, c) {
        "use strict";

        function d(a) {
            if ("IMG" == a.nodeName && a.getAttribute("data-flickity-lazyload")) return [a];
            var b = a.querySelectorAll("img[data-flickity-lazyload]");
            return c.makeArray(b)
        }

        function e(a, b) {
            this.img = a, this.flickity = b, this.load()
        }
        b.createMethods.push("_createLazyload");
        var f = b.prototype;
        return f._createLazyload = function() {
            this.on("select", this.lazyLoad)
        }, f.lazyLoad = function() {
            var a = this.options.lazyLoad;
            if (a) {
                var b = "number" == typeof a ? a : 0,
                    c = this.getAdjacentCellElements(b),
                    f = [];
                c.forEach(function(a) {
                    var b = d(a);
                    f = f.concat(b)
                }), f.forEach(function(a) {
                    new e(a, this)
                }, this)
            }
        }, e.prototype.handleEvent = c.handleEvent, e.prototype.load = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
        }, e.prototype.onload = function(a) {
            this.complete(a, "flickity-lazyloaded")
        }, e.prototype.onerror = function(a) {
            this.complete(a, "flickity-lazyerror")
        }, e.prototype.complete = function(a, b) {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            var c = this.flickity.getParentCell(this.img),
                d = c && c.element;
            this.flickity.cellSizeChange(d), this.img.classList.add(b), this.flickity.dispatchEvent("lazyLoad", a, d)
        }, b.LazyLoader = e, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], b) : "object" == typeof module && module.exports && (module.exports = b(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
    }(window, function(a) {
        return a
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], b) : "object" == typeof module && module.exports ? module.exports = b(require("flickity"), require("fizzy-ui-utils")) : a.Flickity = b(a.Flickity, a.fizzyUIUtils)
    }(window, function(a, b) {
        function c(a, b, c) {
            return (b - a) * c + a
        }
        a.createMethods.push("_createAsNavFor");
        var d = a.prototype;
        return d._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
            var a = this.options.asNavFor;
            if (a) {
                var b = this;
                setTimeout(function() {
                    b.setNavCompanion(a)
                })
            }
        }, d.setNavCompanion = function(c) {
            c = b.getQueryElement(c);
            var d = a.data(c);
            if (d && d != this) {
                this.navCompanion = d;
                var e = this;
                this.onNavCompanionSelect = function() {
                    e.navCompanionSelect()
                }, d.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
            }
        }, d.navCompanionSelect = function(a) {
            if (this.navCompanion) {
                var b = this.navCompanion.selectedCells[0],
                    d = this.navCompanion.cells.indexOf(b),
                    e = d + this.navCompanion.selectedCells.length - 1,
                    f = Math.floor(c(d, e, this.navCompanion.cellAlign));
                if (this.selectCell(f, !1, a), this.removeNavSelectedElements(), !(f >= this.cells.length)) {
                    var g = this.cells.slice(d, e + 1);
                    this.navSelectedElements = g.map(function(a) {
                        return a.element
                    }), this.changeNavSelectedClass("add")
                }
            }
        }, d.changeNavSelectedClass = function(a) {
            this.navSelectedElements.forEach(function(b) {
                b.classList[a]("is-nav-selected")
            })
        }, d.activateAsNavFor = function() {
            this.navCompanionSelect(!0)
        }, d.removeNavSelectedElements = function() {
            this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
        }, d.onNavStaticClick = function(a, b, c, d) {
            "number" == typeof d && this.navCompanion.selectCell(d)
        }, d.deactivateAsNavFor = function() {
            this.removeNavSelectedElements()
        }, d.destroyAsNavFor = function() {
            this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
        }, a
    }),
    function(a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.imagesLoaded = b(a, a.EvEmitter)
    }(window, function(a, b) {
        function c(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }

        function d(a) {
            var b = [];
            if (Array.isArray(a)) b = a;
            else if ("number" == typeof a.length)
                for (var c = 0; c < a.length; c++) b.push(a[c]);
            else b.push(a);
            return b
        }

        function e(a, b, f) {
            return this instanceof e ? ("string" == typeof a && (a = document.querySelectorAll(a)), this.elements = d(a), this.options = c({}, this.options), "function" == typeof b ? f = b : c(this.options, b), f && this.on("always", f), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new e(a, b, f)
        }

        function f(a) {
            this.img = a
        }

        function g(a, b) {
            this.url = a, this.element = b, this.img = new Image
        }
        var h = a.jQuery,
            i = a.console;
        e.prototype = Object.create(b.prototype), e.prototype.options = {}, e.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, e.prototype.addElementImages = function(a) {
            "IMG" == a.nodeName && this.addImage(a), this.options.background === !0 && this.addElementBackgroundImages(a);
            var b = a.nodeType;
            if (b && j[b]) {
                for (var c = a.querySelectorAll("img"), d = 0; d < c.length; d++) {
                    var e = c[d];
                    this.addImage(e)
                }
                if ("string" == typeof this.options.background) {
                    var f = a.querySelectorAll(this.options.background);
                    for (d = 0; d < f.length; d++) {
                        var g = f[d];
                        this.addElementBackgroundImages(g)
                    }
                }
            }
        };
        var j = {
            1: !0,
            9: !0,
            11: !0
        };
        return e.prototype.addElementBackgroundImages = function(a) {
            var b = getComputedStyle(a);
            if (b)
                for (var c = /url\((['"])?(.*?)\1\)/gi, d = c.exec(b.backgroundImage); null !== d;) {
                    var e = d && d[2];
                    e && this.addBackground(e, a), d = c.exec(b.backgroundImage)
                }
        }, e.prototype.addImage = function(a) {
            var b = new f(a);
            this.images.push(b)
        }, e.prototype.addBackground = function(a, b) {
            var c = new g(a, b);
            this.images.push(c)
        }, e.prototype.check = function() {
            function a(a, c, d) {
                setTimeout(function() {
                    b.progress(a, c, d)
                })
            }
            var b = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(b) {
                b.once("progress", a), b.check()
            }) : void this.complete()
        }, e.prototype.progress = function(a, b, c) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emitEvent("progress", [this, a, b]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, a), this.progressedCount == this.images.length && this.complete(), this.options.debug && i && i.log("progress: " + c, a, b)
        }, e.prototype.complete = function() {
            var a = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(a, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var b = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[b](this)
            }
        }, f.prototype = Object.create(b.prototype), f.prototype.check = function() {
            var a = this.getIsImageComplete();
            return a ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, f.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, f.prototype.confirm = function(a, b) {
            this.isLoaded = a, this.emitEvent("progress", [this, this.img, b])
        }, f.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, f.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, f.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, f.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, g.prototype = Object.create(f.prototype), g.prototype.check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
            var a = this.getIsImageComplete();
            a && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, g.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, g.prototype.confirm = function(a, b) {
            this.isLoaded = a, this.emitEvent("progress", [this, this.element, b])
        }, e.makeJQueryPlugin = function(b) {
            b = b || a.jQuery, b && (h = b, h.fn.imagesLoaded = function(a, b) {
                var c = new e(this, a, b);
                return c.jqDeferred.promise(h(this))
            })
        }, e.makeJQueryPlugin(), e
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(c, d) {
            return b(a, c, d)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("flickity"), require("imagesloaded")) : a.Flickity = b(a, a.Flickity, a.imagesLoaded)
    }(window, function(a, b, c) {
        "use strict";
        b.createMethods.push("_createImagesLoaded");
        var d = b.prototype;
        return d._createImagesLoaded = function() {
            this.on("activate", this.imagesLoaded)
        }, d.imagesLoaded = function() {
            function a(a, c) {
                var d = b.getParentCell(c.img);
                b.cellSizeChange(d && d.element), b.options.freeScroll || b.positionSliderAtSelected()
            }
            if (this.options.imagesLoaded) {
                var b = this;
                c(this.slider).on("progress", a)
            }
        }, b
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define(["flickity/js/index", "fizzy-ui-utils/utils"], b) : "object" == typeof module && module.exports ? module.exports = b(require("flickity"), require("fizzy-ui-utils")) : a.Flickity = b(a.Flickity, a.fizzyUIUtils)
    }(window, function(a, b) {
        "use strict";

        function c(a, b, c) {
            return (b - a) * c + a
        }
        a.createMethods.push("_createAsNavFor");
        var d = a.prototype;
        return d._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
            var a = this.options.asNavFor;
            if (a) {
                var b = this;
                setTimeout(function() {
                    b.setNavCompanion(a)
                })
            }
        }, d.setNavCompanion = function(c) {
            c = b.getQueryElement(c);
            var d = a.data(c);
            if (d && d != this) {
                this.navCompanion = d;
                var e = this;
                this.onNavCompanionSelect = function() {
                    e.navCompanionSelect()
                }, d.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
            }
        }, d.navCompanionSelect = function(a) {
            if (this.navCompanion) {
                var b = this.navCompanion.selectedCells[0],
                    d = this.navCompanion.cells.indexOf(b),
                    e = d + this.navCompanion.selectedCells.length - 1,
                    f = Math.floor(c(d, e, this.navCompanion.cellAlign));
                if (this.selectCell(f, !1, a), this.removeNavSelectedElements(), !(f >= this.cells.length)) {
                    var g = this.cells.slice(d, e + 1);
                    this.navSelectedElements = g.map(function(a) {
                        return a.element
                    }), this.changeNavSelectedClass("add")
                }
            }
        }, d.changeNavSelectedClass = function(a) {
            this.navSelectedElements.forEach(function(b) {
                b.classList[a]("is-nav-selected")
            })
        }, d.activateAsNavFor = function() {
            this.navCompanionSelect(!0)
        }, d.removeNavSelectedElements = function() {
            this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
        }, d.onNavStaticClick = function(a, b, c, d) {
            "number" == typeof d && this.navCompanion.selectCell(d)
        }, d.deactivateAsNavFor = function() {
            this.removeNavSelectedElements()
        }, d.destroyAsNavFor = function() {
            this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
        }, a
    }),
    function(a) {
        "use strict";
        a(["jquery"], function(a) {
            function b(b) {
                return a.isFunction(b) || a.isPlainObject(b) ? b : {
                    top: b,
                    left: b
                }
            }
            var c = a.scrollTo = function(b, c, d) {
                return a(window).scrollTo(b, c, d)
            };
            return c.defaults = {
                axis: "xy",
                duration: 0,
                limit: !0
            }, c.window = function(b) {
                return a(window)._scrollable()
            }, a.fn._scrollable = function() {
                return this.map(function() {
                    var b = this,
                        c = !b.nodeName || a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
                    if (!c) return b;
                    var d = (b.contentWindow || b).document || b.ownerDocument || b;
                    return /webkit/i.test(navigator.userAgent) || "BackCompat" == d.compatMode ? d.body : d.documentElement
                })
            }, a.fn.scrollTo = function(d, e, f) {
                return "object" == typeof e && (f = e, e = 0), "function" == typeof f && (f = {
                    onAfter: f
                }), "max" == d && (d = 9e9), f = a.extend({}, c.defaults, f), e = e || f.duration, f.queue = f.queue && f.axis.length > 1, f.queue && (e /= 2), f.offset = b(f.offset), f.over = b(f.over), this._scrollable().each(function() {
                    function g(a) {
                        j.animate(l, e, f.easing, a && function() {
                            a.call(this, k, f)
                        })
                    }
                    if (null != d) {
                        var h, i = this,
                            j = a(i),
                            k = d,
                            l = {},
                            m = j.is("html,body");
                        switch (typeof k) {
                            case "number":
                            case "string":
                                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                                    k = b(k);
                                    break
                                }
                                if (k = m ? a(k) : a(k, this), !k.length) return;
                            case "object":
                                (k.is || k.style) && (h = (k = a(k)).offset())
                        }
                        var n = a.isFunction(f.offset) && f.offset(i, k) || f.offset;
                        a.each(f.axis.split(""), function(a, b) {
                            var d = "x" == b ? "Left" : "Top",
                                e = d.toLowerCase(),
                                o = "scroll" + d,
                                p = i[o],
                                q = c.max(i, b);
                            if (h) l[o] = h[e] + (m ? 0 : p - j.offset()[e]), f.margin && (l[o] -= parseInt(k.css("margin" + d)) || 0, l[o] -= parseInt(k.css("border" + d + "Width")) || 0), l[o] += n[e] || 0, f.over[e] && (l[o] += k["x" == b ? "width" : "height"]() * f.over[e]);
                            else {
                                var r = k[e];
                                l[o] = r.slice && "%" == r.slice(-1) ? parseFloat(r) / 100 * q : r
                            }
                            f.limit && /^\d+$/.test(l[o]) && (l[o] = l[o] <= 0 ? 0 : Math.min(l[o], q)), !a && f.queue && (p != l[o] && g(f.onAfterFirst), delete l[o])
                        }), g(f.onAfter)
                    }
                }).end()
            }, c.max = function(b, c) {
                var d = "x" == c ? "Width" : "Height",
                    e = "scroll" + d;
                if (!a(b).is("html,body")) return b[e] - a(b)[d.toLowerCase()]();
                var f = "client" + d,
                    g = b.ownerDocument.documentElement,
                    h = b.ownerDocument.body;
                return Math.max(g[e], h[e]) - Math.min(g[f], h[f])
            }, c
        })
    }("function" == typeof define && define.amd ? define : function(a, b) {
        "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : b(jQuery)
    });
var $beforeafter = $(".before-after-slider .before");

  $(".before-after-slider").mousemove(function(a) {
          var b = a.offsetX || a.clientX - $beforeafter.offset().left;
          $beforeafter.width(b)
      }), $(".before-after-slider").mouseleave(function(a) {
          $beforeafter.stop().animate({
              width: "50%"
          }, 350)
      }), ! function(a) {
          "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
      }(function(a, b) {
          "use strict";

          function c(a, b) {
              this.container = a, this.options = b, this.init()
          }

          function d(b, c) {
              this.widget = b, this.options = a.extend({}, c), this.detectService(), this.service && this.init()
          }

          function e(a) {
              function b(a, b) {
                  return b.toUpper()
              }
              var c = {},
                  d = a.data();
              for (var e in d) {
                  var f = d[e];
                  "yes" === f ? f = !0 : "no" === f && (f = !1), c[e.replace(/-(\w)/g, b)] = f
              }
              return c
          }

          function f(a, b) {
              return g(a, b, encodeURIComponent)
          }

          function g(a, b, c) {
              return a.replace(/\{([^}]+)\}/g, function(a, d) {
                  return d in b ? c ? c(b[d]) : b[d] : a
              })
          }

          function h(a, b) {
              var c = l + a;
              return c + " " + c + "_" + b
          }

          function i(b, c) {
              function d(g) {
                  "keydown" === g.type && 27 !== g.which || a(g.target).closest(b).length || (b.removeClass(m), e.off(f, d), a.isFunction(c) && c())
              }
              var e = a(document),
                  f = "click touchstart keydown";
              e.on(f, d)
          }

          function j(a) {
              var b = 10;
              if (document.documentElement.getBoundingClientRect) {
                  var c = parseInt(a.css("left"), 10),
                      d = parseInt(a.css("top"), 10),
                      e = a[0].getBoundingClientRect();
                  e.left < b ? a.css("left", b - e.left + c) : e.right > window.innerWidth - b && a.css("left", window.innerWidth - e.right - b + c), e.top < b ? a.css("top", b - e.top + d) : e.bottom > window.innerHeight - b && a.css("top", window.innerHeight - e.bottom - b + d)
              }
              a.addClass(m)
          }
          var k = "social-likes",
              l = k + "__",
              m = k + "_opened",
              n = "https:" === location.protocol ? "https:" : "http:",
              o = {
                  facebook: {
                      counterUrl: "https://graph.facebook.com/?id={url}",
                      convertNumber: function(a) {
                          return a.share.share_count
                      },
                      popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
                      popupWidth: 600,
                      popupHeight: 359
                  },
                  twitter: {
                      counters: !1,
                      popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
                      popupWidth: 600,
                      popupHeight: 250,
                      click: function() {
                          return /[.?:\-–—]\s*$/.test(this.options.title) || (this.options.title += ":"), !0
                      }
                  },
                  mailru: {
                      counterUrl: n + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
                      convertNumber: function(a) {
                          for (var b in a)
                              if (a.hasOwnProperty(b)) return a[b].shares
                      },
                      popupUrl: "https://connect.mail.ru/share?share_url={url}&title={title}",
                      popupWidth: 492,
                      popupHeight: 500
                  },
                  vkontakte: {
                      counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
                      counter: function(b, c) {
                          var d = o.vkontakte;
                          d._ || (d._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                              count: function(a, b) {
                                  d._[a].resolve(b)
                              }
                          });
                          var e = d._.length;
                          d._.push(c), a.getScript(f(b, {
                              index: e
                          })).fail(c.reject)
                      },
                      popupUrl: "https://vk.com/share.php?url={url}&title={title}",
                      popupWidth: 655,
                      popupHeight: 450
                  },
                  odnoklassniki: {
                      counterUrl: n + "//connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",
                      counter: function(b, c) {
                          var d = o.odnoklassniki;
                          d._ || (d._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function(a, b) {
                              d._[a].resolve(b)
                          });
                          var e = d._.length;
                          d._.push(c), a.getScript(f(b, {
                              index: e
                          })).fail(c.reject)
                      },
                      popupUrl: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",
                      popupWidth: 580,
                      popupHeight: 336
                  },
                  plusone: {
                      counterUrl: n + "//share.yandex.ru/gpp.xml?url={url}&callback=?",
                      convertNumber: function(a) {
                          return parseInt(a.replace(/\D/g, ""), 10)
                      },
                      popupUrl: "https://plus.google.com/share?url={url}",
                      popupWidth: 500,
                      popupHeight: 550
                  },
                  pinterest: {
                      counterUrl: n + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
                      convertNumber: function(a) {
                          return a.count
                      },
                      popupUrl: "https://pinterest.com/pin/create/button/?url={url}&description={title}",
                      popupWidth: 740,
                      popupHeight: 550
                  }
              },
              p = {
                  promises: {},
                  fetch: function(b, c, d) {
                      p.promises[b] || (p.promises[b] = {});
                      var e = p.promises[b];
                      if (!d.forceUpdate && e[c]) return e[c];
                      var g = a.extend({}, o[b], d),
                          h = a.Deferred(),
                          i = g.counterUrl && f(g.counterUrl, {
                              url: c
                          });
                      return i && a.isFunction(g.counter) ? g.counter(i, h) : g.counterUrl ? a.getJSON(i).done(function(b) {
                          try {
                              var c = b;
                              a.isFunction(g.convertNumber) && (c = g.convertNumber(b)), h.resolve(c)
                          } catch (a) {
                              h.reject()
                          }
                      }).fail(h.reject) : h.reject(), e[c] = h.promise(), e[c]
                  }
              };
          a.fn.socialLikes = function(b) {
              return this.each(function() {
                  var d = a(this),
                      f = d.data(k);
                  f ? a.isPlainObject(b) && f.update(b) : (f = new c(d, a.extend({}, a.fn.socialLikes.defaults, b, e(d))), d.data(k, f))
              })
          }, a.fn.socialLikes.defaults = {
              url: window.location.href.replace(window.location.hash, ""),
              title: document.title,
              counters: !0,
              zeroes: !1,
              wait: 500,
              timeout: 1e4,
              popupCheckInterval: 500,
              singleTitle: "Share"
          }, c.prototype = {
              init: function() {
                  this.container.addClass(k), this.single = this.container.hasClass(k + "_single"), this.initUserButtons(), this.countersLeft = 0, this.number = 0, this.container.on("counter." + k, a.proxy(this.updateCounter, this));
                  var b = this.container.children();
                  this.makeSingleButton(), this.buttons = [], b.each(a.proxy(function(b, c) {
                      var e = new d(a(c), this.options);
                      this.buttons.push(e), e.options.counterUrl && this.countersLeft++
                  }, this)), this.options.counters ? (this.timer = setTimeout(a.proxy(this.appear, this), this.options.wait), this.timeout = setTimeout(a.proxy(this.ready, this, !0), this.options.timeout)) : this.appear()
              },
              initUserButtons: function() {
                  !this.userButtonInited && window.socialLikesButtons && a.extend(!0, o, socialLikesButtons), this.userButtonInited = !0
              },
              makeSingleButton: function() {
                  if (this.single) {
                      var b = this.container;
                      b.addClass(k + "_vertical"), b.wrap(a("<div>", {
                          class: k + "_single-w"
                      })), b.wrapInner(a("<div>", {
                          class: k + "__single-container"
                      }));
                      var c = b.parent(),
                          d = a("<div>", {
                              class: h("widget", "single")
                          }),
                          e = a(g('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                              buttonCls: h("button", "single"),
                              iconCls: h("icon", "single"),
                              title: this.options.singleTitle
                          }));
                      d.append(e), c.append(d), d.on("click", function() {
                          var a = k + "__widget_active";
                          return d.toggleClass(a), d.hasClass(a) ? (b.css({
                              left: -(b.width() - d.width()) / 2,
                              top: -b.height()
                          }), j(b), i(b, function() {
                              d.removeClass(a)
                          })) : b.removeClass(m), !1
                      }), this.widget = d
                  }
              },
              update: function(b) {
                  if (b.forceUpdate || b.url !== this.options.url) {
                      this.number = 0, this.countersLeft = this.buttons.length, this.widget && this.widget.find("." + k + "__counter").remove(), a.extend(this.options, b);
                      for (var c = 0; c < this.buttons.length; c++) this.buttons[c].update(b)
                  }
              },
              updateCounter: function(a, b, c) {
                  c = c || 0, (c || this.options.zeroes) && (this.number += c, this.single && this.getCounterElem().text(this.number)), this.countersLeft--, 0 === this.countersLeft && (this.appear(), this.ready())
              },
              appear: function() {
                  this.container.addClass(k + "_visible")
              },
              ready: function(a) {
                  this.timeout && clearTimeout(this.timeout), this.container.addClass(k + "_ready"), a || this.container.trigger("ready." + k, this.number)
              },
              getCounterElem: function() {
                  var b = this.widget.find("." + l + "counter_single");
                  return b.length || (b = a("<span>", {
                      class: h("counter", "single")
                  }), this.widget.append(b)), b
              }
          }, d.prototype = {
              init: function() {
                  this.detectParams(), this.initHtml(), setTimeout(a.proxy(this.initCounter, this), 0)
              },
              update: function(b) {
                  a.extend(this.options, {
                      forceUpdate: !1
                  }, b), this.widget.find("." + k + "__counter").remove(), this.initCounter()
              },
              detectService: function() {
                  var b = this.widget.data("service");
                  if (!b) {
                      for (var c = this.widget[0], d = c.classList || c.className.split(" "), e = 0; e < d.length; e++) {
                          var f = d[e];
                          if (o[f]) {
                              b = f;
                              break
                          }
                      }
                      if (!b) return
                  }
                  this.service = b, a.extend(this.options, o[b])
              },
              detectParams: function() {
                  var a = this.widget.data();
                  if (a.counter) {
                      var b = parseInt(a.counter, 10);
                      isNaN(b) ? this.options.counterUrl = a.counter : this.options.counterNumber = b
                  }
                  a.title && (this.options.title = a.title), a.url && (this.options.url = a.url)
              },
              initHtml: function() {
                  var b = this.options,
                      c = this.widget,
                      d = c.find("a");
                  d.length && this.cloneDataAttrs(d, c);
                  var e = a("<span>", {
                      class: this.getElementClassNames("button"),
                      html: c.html()
                  });
                  if (b.clickUrl) {
                      var g = f(b.clickUrl, {
                              url: b.url,
                              title: b.title
                          }),
                          h = a("<a>", {
                              href: g
                          });
                      this.cloneDataAttrs(c, h), c.replaceWith(h), this.widget = c = h
                  } else c.on("click", a.proxy(this.click, this));
                  c.removeClass(this.service), c.addClass(this.getElementClassNames("widget")), e.prepend(a("<span>", {
                      class: this.getElementClassNames("icon")
                  })), c.empty().append(e), this.button = e
              },
              initCounter: function() {
                  if (this.options.counters)
                      if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);
                      else {
                          var b = {
                              counterUrl: this.options.counterUrl,
                              forceUpdate: this.options.forceUpdate
                          };
                          p.fetch(this.service, this.options.url, b).always(a.proxy(this.updateCounter, this))
                      }
              },
              cloneDataAttrs: function(a, b) {
                  var c = a.data();
                  for (var d in c) c.hasOwnProperty(d) && b.data(d, c[d])
              },
              getElementClassNames: function(a) {
                  return h(a, this.service)
              },
              updateCounter: function(b) {
                  b = parseInt(b, 10) || 0;
                  var c = {
                      class: this.getElementClassNames("counter"),
                      text: b
                  };
                  b || this.options.zeroes || (c.class += " " + k + "__counter_empty", c.text = "");
                  var d = a("<span>", c);
                  this.widget.append(d), this.widget.trigger("counter." + k, [this.service, b])
              },
              click: function(b) {
                  var c = this.options,
                      d = !0;
                  if (a.isFunction(c.click) && (d = c.click.call(this, b)), d) {
                      var e = f(c.popupUrl, {
                          url: c.url,
                          title: c.title
                      });
                      e = this.addAdditionalParamsToUrl(e), this.openPopup(e, {
                          width: c.popupWidth,
                          height: c.popupHeight
                      })
                  }
                  return !1
              },
              addAdditionalParamsToUrl: function(b) {
                  var c = a.param(a.extend(this.widget.data(), this.options.data));
                  if (a.isEmptyObject(c)) return b;
                  var d = b.indexOf("?") === -1 ? "?" : "&";
                  return b + d + c
              },
              openPopup: function(c, d) {
                  var e = window.screenLeft !== b ? window.screenLeft : screen.left,
                      f = window.screenTop !== b ? window.screenTop : screen.top,
                      g = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                      h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                      i = Math.round(g / 2 - d.width / 2) + e,
                      j = 0;
                  h > d.height && (j = Math.round(h / 3 - d.height / 2) + f);
                  var l = window.open(c, "sl_" + this.service, "left=" + i + ",top=" + j + ",width=" + d.width + ",height=" + d.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
                  if (l) {
                      l.focus(), this.widget.trigger("popup_opened." + k, [this.service, l]);
                      var m = setInterval(a.proxy(function() {
                          l.closed && (clearInterval(m), this.widget.trigger("popup_closed." + k, this.service))
                      }, this), this.options.popupCheckInterval)
                  } else location.href = c
              }
          }, a(function() {
              a("." + k).socialLikes()
          })
      }), ! function() {
          function a(a, h) {
              a = a || "", h = h || {};
              for (var i in b) b.hasOwnProperty(i) && (h.autoFix && (h["fix_" + i] = !0), h.fix = h.fix || h["fix_" + i]);
              var j = [],
                  k = document.createElement("div"),
                  l = function(a) {
                      return "string" == typeof a && -1 !== a.indexOf("&") ? (k.innerHTML = a, k.textContent || k.innerText || a) : a
                  },
                  m = function(b) {
                      a += b
                  },
                  n = function(b) {
                      a = b + a
                  },
                  o = {
                      comment: /^<!--/,
                      endTag: /^<\//,
                      atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                      startTag: /^</,
                      chars: /^[^<]/
                  },
                  p = {
                      comment: function() {
                          var b = a.indexOf("-->");
                          return b >= 0 ? {
                              content: a.substr(4, b),
                              length: b + 3
                          } : void 0
                      },
                      endTag: function() {
                          var b = a.match(d);
                          return b ? {
                              tagName: b[1],
                              length: b[0].length
                          } : void 0
                      },
                      atomicTag: function() {
                          var b = p.startTag();
                          if (b) {
                              var c = a.slice(b.length);
                              if (c.match(new RegExp("</\\s*" + b.tagName + "\\s*>", "i"))) {
                                  var d = c.match(new RegExp("([\\s\\S]*?)</\\s*" + b.tagName + "\\s*>", "i"));
                                  if (d) return {
                                      tagName: b.tagName,
                                      attrs: b.attrs,
                                      content: d[1],
                                      length: d[0].length + b.length
                                  }
                              }
                          }
                      },
                      startTag: function() {
                          var b = a.indexOf(">");
                          if (-1 === b) return null;
                          var d = a.match(c);
                          if (d) {
                              var g = {},
                                  h = {},
                                  i = d[2];
                              return d[2].replace(e, function(a, b) {
                                  if (arguments[2] || arguments[3] || arguments[4] || arguments[5])
                                      if (arguments[5]) g[arguments[5]] = "", h[b] = !0;
                                      else {
                                          var c = arguments[2] || arguments[3] || arguments[4] || f.test(b) && b || "";
                                          g[b] = l(c)
                                      } else g[b] = null;
                                  i = i.replace(a, "")
                              }), {
                                  tagName: d[1],
                                  attrs: g,
                                  booleanAttrs: h,
                                  rest: i,
                                  unary: !!d[3],
                                  length: d[0].length
                              }
                          }
                      },
                      chars: function() {
                          var b = a.indexOf("<");
                          return {
                              length: b >= 0 ? b : a.length
                          }
                      }
                  },
                  q = function() {
                      for (var b in o)
                          if (o[b].test(a)) {
                              g && console.log("suspected " + b);
                              var c = p[b]();
                              return c ? (g && console.log("parsed " + b, c), c.type = c.type || b, c.text = a.substr(0, c.length), a = a.slice(c.length), c) : null
                          }
                  },
                  r = function(a) {
                      for (var b; b = q();)
                          if (a[b.type] && a[b.type](b) === !1) return
                  },
                  s = function() {
                      var b = a;
                      return a = "", b
                  },
                  t = function() {
                      return a
                  };
              return h.fix && ! function() {
                  var b = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
                      c = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,
                      d = [];
                  d.last = function() {
                      return this[this.length - 1]
                  }, d.lastTagNameEq = function(a) {
                      var b = this.last();
                      return b && b.tagName && b.tagName.toUpperCase() === a.toUpperCase()
                  }, d.containsTagName = function(a) {
                      for (var b, c = 0; b = this[c]; c++)
                          if (b.tagName === a) return !0;
                      return !1
                  };
                  var e = function(a) {
                          return a && "startTag" === a.type && (a.unary = b.test(a.tagName) || a.unary, a.html5Unary = !/\/>$/.test(a.text)), a
                      },
                      f = q,
                      g = function() {
                          var b = a,
                              c = e(f());
                          return a = b, c
                      },
                      i = function() {
                          var a = d.pop();
                          n("</" + a.tagName + ">")
                      },
                      j = {
                          startTag: function(a) {
                              var b = a.tagName;
                              "TR" === b.toUpperCase() && d.lastTagNameEq("TABLE") ? (n("<TBODY>"), l()) : h.fix_selfClose && c.test(b) && d.containsTagName(b) ? d.lastTagNameEq(b) ? i() : (n("</" + a.tagName + ">"), l()) : a.unary || d.push(a)
                          },
                          endTag: function(a) {
                              var b = d.last();
                              b ? h.fix_tagSoup && !d.lastTagNameEq(a.tagName) ? i() : d.pop() : h.fix_tagSoup && k();
                          }
                      },
                      k = function() {
                          f(), l()
                      },
                      l = function() {
                          var a = g();
                          a && j[a.type] && j[a.type](a)
                      };
                  q = function() {
                      return l(), e(f())
                  }
              }(), {
                  append: m,
                  readToken: q,
                  readTokens: r,
                  clear: s,
                  rest: t,
                  stack: j
              }
          }
          var b = function() {
                  var a, b = {},
                      c = this.document.createElement("div");
                  return a = "<P><I></P></I>", c.innerHTML = a, b.tagSoup = c.innerHTML !== a, c.innerHTML = "<P><i><P></P></i></P>", b.selfClose = 2 === c.childNodes.length, b
              }(),
              c = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
              d = /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
              e = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
              f = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,
              g = !1;
          a.supports = b, a.tokenToString = function(a) {
              var b = {
                  comment: function(a) {
                      return "<!--" + a.content
                  },
                  endTag: function(a) {
                      return "</" + a.tagName + ">"
                  },
                  atomicTag: function(a) {
                      return g && console.log(a), b.startTag(a) + a.content + b.endTag(a)
                  },
                  startTag: function(a) {
                      var b = "<" + a.tagName;
                      for (var c in a.attrs) {
                          b += " " + c;
                          var d = a.attrs[c];
                          ("undefined" == typeof a.booleanAttrs || "undefined" == typeof a.booleanAttrs[c]) && (b += '="' + (d ? d.replace(/(^|[^\\])"/g, '$1\\"') : "") + '"')
                      }
                      return a.rest && (b += a.rest), b + (a.unary && !a.html5Unary ? "/>" : ">")
                  },
                  chars: function(a) {
                      return a.text
                  }
              };
              return b[a.type](a)
          }, a.escapeAttributes = function(a) {
              var b = {};
              for (var c in a) {
                  var d = a[c];
                  b[c] = d && d.replace(/(^|[^\\])"/g, '$1\\"')
              }
              return b
          };
          for (var h in b) a.browserHasFlaw = a.browserHasFlaw || !b[h] && h;
          this.htmlParser = a
      }(),
      function() {
          function a() {}

          function b(a) {
              return a !== m && null !== a
          }

          function c(a) {
              return "function" == typeof a
          }

          function d(a, b, c) {
              var d, e = a && a.length || 0;
              for (d = 0; e > d; d++) b.call(c, a[d], d)
          }

          function e(a, b, c) {
              var d;
              for (d in a) a.hasOwnProperty(d) && b.call(c, d, a[d])
          }

          function f(a, b) {
              return e(b, function(b, c) {
                  a[b] = c
              }), a
          }

          function g(a, c) {
              return a = a || {}, e(c, function(c, d) {
                  b(a[c]) || (a[c] = d)
              }), a
          }

          function h(a) {
              try {
                  return o.call(a)
              } catch (c) {
                  var b = [];
                  return d(a, function(a) {
                      b.push(a)
                  }), b
              }
          }

          function i(a) {
              return !!(a && "tagName" in a) && !!~a.tagName.toLowerCase().indexOf("script")
          }

          function j(a) {
              return !!(a && "tagName" in a) && !!~a.tagName.toLowerCase().indexOf("style")
          }
          var k = {
                  afterAsync: a,
                  afterDequeue: a,
                  afterStreamStart: a,
                  afterWrite: a,
                  autoFix: !0,
                  beforeEnqueue: a,
                  beforeWriteToken: function(a) {
                      return a
                  },
                  beforeWrite: function(a) {
                      return a
                  },
                  done: a,
                  error: function(a) {
                      throw a
                  },
                  releaseAsync: !1
              },
              l = this,
              m = void 0;
          if (!l.postscribe) {
              var n = !1,
                  o = Array.prototype.slice,
                  p = function(a) {
                      return a[a.length - 1]
                  },
                  q = function() {
                      function a(a, c, d) {
                          var e = k + c;
                          if (2 === arguments.length) {
                              var f = a.getAttribute(e);
                              return b(f) ? String(f) : f
                          }
                          b(d) && "" !== d ? a.setAttribute(e, d) : a.removeAttribute(e)
                      }

                      function g(b, c) {
                          var d = b.ownerDocument;
                          f(this, {
                              root: b,
                              options: c,
                              win: d.defaultView || d.parentWindow,
                              doc: d,
                              parser: htmlParser("", {
                                  autoFix: c.autoFix
                              }),
                              actuals: [b],
                              proxyHistory: "",
                              proxyRoot: d.createElement(b.nodeName),
                              scriptStack: [],
                              writeQueue: []
                          }), a(this.proxyRoot, "proxyof", 0)
                      }
                      var k = "data-ps-";
                      return g.prototype.write = function() {
                          [].push.apply(this.writeQueue, arguments);
                          for (var a; !this.deferredRemote && this.writeQueue.length;) a = this.writeQueue.shift(), c(a) ? this.callFunction(a) : this.writeImpl(a)
                      }, g.prototype.callFunction = function(a) {
                          var b = {
                              type: "function",
                              value: a.name || a.toString()
                          };
                          this.onScriptStart(b), a.call(this.win, this.doc), this.onScriptDone(b)
                      }, g.prototype.writeImpl = function(a) {
                          this.parser.append(a);
                          for (var b, c, d, e = [];
                              (b = this.parser.readToken()) && !(c = i(b)) && !(d = j(b));) b = this.options.beforeWriteToken(b), b && e.push(b);
                          this.writeStaticTokens(e), c && this.handleScriptToken(b), d && this.handleStyleToken(b)
                      }, g.prototype.writeStaticTokens = function(a) {
                          var b = this.buildChunk(a);
                          if (b.actual) return b.html = this.proxyHistory + b.actual, this.proxyHistory += b.proxy, this.proxyRoot.innerHTML = b.html, n && (b.proxyInnerHTML = this.proxyRoot.innerHTML), this.walkChunk(), n && (b.actualInnerHTML = this.root.innerHTML), b
                      }, g.prototype.buildChunk = function(a) {
                          var b = this.actuals.length,
                              c = [],
                              e = [],
                              f = [];
                          return d(a, function(a) {
                              var d = htmlParser.tokenToString(a);
                              if (c.push(d), a.attrs) {
                                  if (!/^noscript$/i.test(a.tagName)) {
                                      var g = b++;
                                      e.push(d.replace(/(\/?>)/, " " + k + "id=" + g + " $1")), "ps-script" !== a.attrs.id && "ps-style" !== a.attrs.id && f.push("atomicTag" === a.type ? "" : "<" + a.tagName + " " + k + "proxyof=" + g + (a.unary ? " />" : ">"))
                                  }
                              } else e.push(d), f.push("endTag" === a.type ? d : "")
                          }), {
                              tokens: a,
                              raw: c.join(""),
                              actual: e.join(""),
                              proxy: f.join("")
                          }
                      }, g.prototype.walkChunk = function() {
                          for (var c, d = [this.proxyRoot]; b(c = d.shift());) {
                              var e = 1 === c.nodeType,
                                  f = e && a(c, "proxyof");
                              if (!f) {
                                  e && (this.actuals[a(c, "id")] = c, a(c, "id", null));
                                  var g = c.parentNode && a(c.parentNode, "proxyof");
                                  g && this.actuals[g].appendChild(c)
                              }
                              d.unshift.apply(d, h(c.childNodes))
                          }
                      }, g.prototype.handleScriptToken = function(a) {
                          var b = this.parser.clear();
                          if (b && this.writeQueue.unshift(b), a.src = a.attrs.src || a.attrs.SRC, a = this.options.beforeWriteToken(a)) {
                              a.src && this.scriptStack.length ? this.deferredRemote = a : this.onScriptStart(a);
                              var c = this;
                              this.writeScriptToken(a, function() {
                                  c.onScriptDone(a)
                              })
                          }
                      }, g.prototype.handleStyleToken = function(a) {
                          var b = this.parser.clear();
                          b && this.writeQueue.unshift(b), a.type = a.attrs.type || a.attrs.TYPE || "text/css", a = this.options.beforeWriteToken(a), a && this.writeStyleToken(a), b && this.write()
                      }, g.prototype.writeStyleToken = function(a) {
                          var b = this.buildStyle(a);
                          this.insertStyle(b), a.content && (b.styleSheet && !b.sheet ? b.styleSheet.cssText = a.content : b.appendChild(this.doc.createTextNode(a.content)))
                      }, g.prototype.buildStyle = function(a) {
                          var b = this.doc.createElement(a.tagName);
                          return b.setAttribute("type", a.type), e(a.attrs, function(a, c) {
                              b.setAttribute(a, c)
                          }), b
                      }, g.prototype.insertStyle = function(a) {
                          this.writeImpl('<span id="ps-style"/>');
                          var b = this.doc.getElementById("ps-style");
                          b.parentNode.replaceChild(a, b)
                      }, g.prototype.onScriptStart = function(a) {
                          a.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(a)
                      }, g.prototype.onScriptDone = function(a) {
                          return a !== this.scriptStack[0] ? void this.options.error({
                              message: "Bad script nesting or script finished twice"
                          }) : (this.scriptStack.shift(), this.write.apply(this, a.outerWrites), void(!this.scriptStack.length && this.deferredRemote && (this.onScriptStart(this.deferredRemote), this.deferredRemote = null)))
                      }, g.prototype.writeScriptToken = function(a, b) {
                          var c = this.buildScript(a),
                              d = this.shouldRelease(c),
                              e = this.options.afterAsync;
                          a.src && (c.src = a.src, this.scriptLoadHandler(c, d ? e : function() {
                              b(), e()
                          }));
                          try {
                              this.insertScript(c), (!a.src || d) && b()
                          } catch (a) {
                              this.options.error(a), b()
                          }
                      }, g.prototype.buildScript = function(a) {
                          var b = this.doc.createElement(a.tagName);
                          return e(a.attrs, function(a, c) {
                              b.setAttribute(a, c)
                          }), a.content && (b.text = a.content), b
                      }, g.prototype.insertScript = function(a) {
                          this.writeImpl('<span id="ps-script"/>');
                          var b = this.doc.getElementById("ps-script");
                          b.parentNode.replaceChild(a, b)
                      }, g.prototype.scriptLoadHandler = function(a, b) {
                          function c() {
                              a = a.onload = a.onreadystatechange = a.onerror = null
                          }

                          function d() {
                              c(), b()
                          }

                          function e(a) {
                              c(), g(a), b()
                          }
                          var g = this.options.error;
                          f(a, {
                              onload: function() {
                                  d()
                              },
                              onreadystatechange: function() {
                                  /^(loaded|complete)$/.test(a.readyState) && d()
                              },
                              onerror: function() {
                                  e({
                                      message: "remote script failed " + a.src
                                  })
                              }
                          })
                      }, g.prototype.shouldRelease = function(a) {
                          var b = /^script$/i.test(a.nodeName);
                          return !b || !!(this.options.releaseAsync && a.src && a.hasAttribute("async"))
                      }, g
                  }();
              l.postscribe = function() {
                  function b() {
                      var a, b = j.shift();
                      b && (a = p(b), a.afterDequeue(), b.stream = d.apply(null, b), a.afterStreamStart())
                  }

                  function d(c, d, g) {
                      function j(a) {
                          a = g.beforeWrite(a), m.write(a), g.afterWrite(a)
                      }
                      m = new q(c, g), m.id = i++, m.name = g.name || m.id, e.streams[m.name] = m;
                      var k = c.ownerDocument,
                          l = {
                              close: k.close,
                              open: k.open,
                              write: k.write,
                              writeln: k.writeln
                          };
                      f(k, {
                          close: a,
                          open: a,
                          write: function() {
                              return j(h(arguments).join(""))
                          },
                          writeln: function() {
                              return j(h(arguments).join("") + "\n")
                          }
                      });
                      var n = m.win.onerror || a;
                      return m.win.onerror = function(a, b, c) {
                          g.error({
                              msg: a + " - " + b + ":" + c
                          }), n.apply(m.win, arguments)
                      }, m.write(d, function() {
                          f(k, l), m.win.onerror = n, g.done(), m = null, b()
                      }), m
                  }

                  function e(d, e, f) {
                      c(f) && (f = {
                          done: f
                      }), f = g(f, k), d = /^#/.test(d) ? l.document.getElementById(d.substr(1)) : d.jquery ? d[0] : d;
                      var h = [d, e, f];
                      return d.postscribe = {
                          cancel: function() {
                              h.stream ? h.stream.abort() : h[1] = a
                          }
                      }, f.beforeEnqueue(h), j.push(h), m || b(), d.postscribe
                  }
                  var i = 0,
                      j = [],
                      m = null;
                  return f(e, {
                      streams: {},
                      queue: j,
                      WriteStream: q
                  })
              }()
          }
      }(), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
          if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
          var c = this.length >>> 0;
          for (b = +b || 0, Math.abs(b) === 1 / 0 && (b = 0), 0 > b && (b += c, 0 > b && (b = 0)); c > b; b++)
              if (this[b] === a) return b;
          return -1
      }), window.matchMedia || (window.matchMedia = function(a) {
          "use strict";
          var b = a.document,
              c = b.documentElement,
              d = [],
              e = 0,
              f = "",
              g = {},
              h = /\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,
              i = /^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,
              j = 0,
              k = function(a) {
                  var b = -1 !== a.indexOf(",") && a.split(",") || [a],
                      c = b.length - 1,
                      d = c,
                      e = null,
                      j = null,
                      k = "",
                      l = 0,
                      m = !1,
                      n = "",
                      o = "",
                      p = null,
                      q = 0,
                      r = 0,
                      s = null,
                      t = "",
                      u = "",
                      v = "",
                      w = "",
                      x = "",
                      y = !1;
                  if ("" === a) return !0;
                  do
                      if (e = b[d - c], m = !1, j = e.match(h), j && (k = j[0], l = j.index), !j || -1 === e.substring(0, l).indexOf("(") && (l || !j[3] && k !== j.input)) y = !1;
                      else {
                          if (o = e, m = "not" === j[1], l || (n = j[2], o = e.substring(k.length)), y = n === f || "all" === n || "" === n, p = -1 !== o.indexOf(" and ") && o.split(" and ") || [o], q = p.length - 1, r = q, y && q >= 0 && "" !== o)
                              do {
                                  if (s = p[q].match(i), !s || !g[s[3]]) {
                                      y = !1;
                                      break
                                  }
                                  if (t = s[2], u = s[5], w = u, v = s[7], x = g[s[3]], v && (w = "px" === v ? Number(u) : "em" === v || "rem" === v ? 16 * u : s[8] ? (u / s[8]).toFixed(2) : "dppx" === v ? 96 * u : "dpcm" === v ? .3937 * u : Number(u)), y = "min-" === t && w ? x >= w : "max-" === t && w ? w >= x : w ? x === w : !!x, !y) break
                              } while (q--);
                          if (y) break
                      }
                  while (c--);
                  return m ? !y : y
              },
              l = function() {
                  var b = a.innerWidth || c.clientWidth,
                      d = a.innerHeight || c.clientHeight,
                      e = a.screen.width,
                      f = a.screen.height,
                      h = a.screen.colorDepth,
                      i = a.devicePixelRatio;
                  g.width = b, g.height = d, g["aspect-ratio"] = (b / d).toFixed(2), g["device-width"] = e, g["device-height"] = f, g["device-aspect-ratio"] = (e / f).toFixed(2), g.color = h, g["color-index"] = Math.pow(2, h), g.orientation = d >= b ? "portrait" : "landscape", g.resolution = i && 96 * i || a.screen.deviceXDPI || 96, g["device-pixel-ratio"] = i || 1
              },
              m = function() {
                  clearTimeout(j), j = setTimeout(function() {
                      var b = null,
                          c = e - 1,
                          f = c,
                          g = !1;
                      if (c >= 0) {
                          l();
                          do
                              if (b = d[f - c], b && (g = k(b.mql.media), (g && !b.mql.matches || !g && b.mql.matches) && (b.mql.matches = g, b.listeners)))
                                  for (var h = 0, i = b.listeners.length; i > h; h++) b.listeners[h] && b.listeners[h].call(a, b.mql);
                          while (c--)
                      }
                  }, 10)
              },
              n = function() {
                  var c = b.getElementsByTagName("head")[0],
                      d = b.createElement("style"),
                      e = null,
                      g = ["screen", "print", "speech", "projection", "handheld", "tv", "braille", "embossed", "tty"],
                      h = 0,
                      i = g.length,
                      j = "#mediamatchjs { position: relative; z-index: 0; }",
                      k = "",
                      n = a.addEventListener || (k = "on") && a.attachEvent;
                  for (d.type = "text/css", d.id = "mediamatchjs", c.appendChild(d), e = a.getComputedStyle && a.getComputedStyle(d) || d.currentStyle; i > h; h++) j += "@media " + g[h] + " { #mediamatchjs { position: relative; z-index: " + h + " } }";
                  d.styleSheet ? d.styleSheet.cssText = j : d.textContent = j, f = g[1 * e.zIndex || 0], c.removeChild(d), l(), n(k + "resize", m), n(k + "orientationchange", m)
              };
          return n(),
              function(a) {
                  var b = e,
                      c = {
                          matches: !1,
                          media: a,
                          addListener: function(a) {
                              d[b].listeners || (d[b].listeners = []), a && d[b].listeners.push(a)
                          },
                          removeListener: function(a) {
                              var c = d[b],
                                  e = 0,
                                  f = 0;
                              if (c)
                                  for (f = c.listeners.length; f > e; e++) c.listeners[e] === a && c.listeners.splice(e, 1)
                          }
                      };
                  return "" === a ? (c.matches = !0, c) : (c.matches = k(a), e = d.push({
                      mql: c,
                      listeners: null
                  }), c)
              }
      }(window)), ! function(a, b) {
          "undefined" != typeof module ? module.exports = b() : "function" == typeof define && "object" == typeof define.amd ? define(b) : this[a] = b()
      }("domready", function(a) {
          function b(a) {
              for (n = 1; a = d.shift();) a()
          }
          var c, d = [],
              e = !1,
              f = document,
              g = f.documentElement,
              h = g.doScroll,
              i = "DOMContentLoaded",
              j = "addEventListener",
              k = "onreadystatechange",
              l = "readyState",
              m = h ? /^loaded|^c/ : /^loaded|c/,
              n = m.test(f[l]);
          return f[j] && f[j](i, c = function() {
              f.removeEventListener(i, c, e), b()
          }, e), h && f.attachEvent(k, c = function() {
              /^c/.test(f[l]) && (f.detachEvent(k, c), b())
          }), a = h ? function(b) {
              self != top ? n ? b() : d.push(b) : function() {
                  try {
                      g.doScroll("left")
                  } catch (c) {
                      return setTimeout(function() {
                          a(b)
                      }, 50)
                  }
                  b()
              }()
          } : function(a) {
              n ? a() : d.push(a)
          }
      }), LazyAds = function() {
          "use strict";

          function a() {
              m === !0 && window.console && (a = Function.prototype.bind ? Function.prototype.bind.call(console.log, console) : function() {
                  Function.prototype.apply.call(console.log, console, arguments)
              }, a.apply(this, arguments))
          }

          function b(a, b) {
              var c, d, e, f;
              return function() {
                  e = this, d = [].slice.call(arguments, 0), f = new Date;
                  var g = function() {
                      var h = new Date - f;
                      b > h ? c = setTimeout(g, b - h) : (c = null, a.apply(e, d))
                  };
                  c || (c = setTimeout(g, b))
              }
          }

          function c(a, b, c) {
              b.addEventListener ? b.addEventListener(a, c, !1) : b.attachEvent ? b.attachEvent("on" + a, c) : b["on" + a] = c
          }

          function d(a, b, c) {
              var d, e, f, g, h, i = [],
                  c = c || document;
              if (g = "classList" in document.createElement("_"), h = "querySelectorAll" in document) d = a, d += b ? "." + b : "", i = c.querySelectorAll(d);
              else
                  for (q = c.getElementsByTagName(a), f = 0; f < q.length; f++) e = q[f], b === !1 ? i.push(e) : g ? e.classList.contains(b) && i.push(e) : e.className && -1 !== e.className.split(/\s/).indexOf(b) && i.push(e);
              return i
          }

          function e(a) {
              for (var b, c = d(n.containerElement, n.containerClass), e = !1, f = [], g = 0; g < c.length; g++) b = c[g], e = null !== b.getAttribute("data-lazyad"), e === !0 && f.push(b);
              return f
          }

          function f(a) {
              for (var b, c, e = d("script", !1, a), f = [], g = 0; g < e.length; g++) b = e[g], c = b.getAttribute("type"), c && "text/lazyad" === c && f.push(b);
              return f
          }

          function g(a) {
              return a = a.replace(/^\s+|\s+$/g, ""), a.replace("<!--", "").replace("-->", "").trim()
          }

          function h(b, c) {
              a("Injecting lazy-loaded Ad", b), c = g(c), setTimeout(function() {
                  postscribe(b, c)
              }, 0), b.setAttribute("data-lazyad-loaded", !0)
          }

          function i(a) {
              for (var b, c, d, e, g, i, k, l, m, n, o = 0, p = 0; p < a.length; p++) {
                  b = a[p], l = b.getAttribute("data-matchmedia") || !1, i = parseInt(b.getAttribute("data-adwidth"), 0) || !1, k = parseInt(b.getAttribute("data-adheight"), 0) || !1, c = f(b);
                  for (var q = 0; q < c.length; q++) {
                      if (d = c[q], n = "true" === b.getAttribute("data-lazyad-loaded"), (i || k) && (e = b.offsetWidth, g = b.offsetHeight, m = !0, i && i > e && (m = !1), k && k > g && (m = !1), m === !1)) {
                          n && j(b);
                          break
                      }
                      if (l !== !1 && matchMedia(l).matches === !1) {
                          n && j(b);
                          break
                      }
                      n || (h(b, d.innerHTML), o++)
                  }
              }
              return o
          }

          function j(b) {
              a("Unloading Ad:", b);
              for (var c = b.getElementsByTagName("*"); c;) {
                  var d = c[c.length - 1];
                  if ("script" === d.nodeName.toLowerCase() && "text/lazyad" === d.type) break;
                  d.parentNode.removeChild(d)
              }
              b.setAttribute("data-lazyad-loaded", "false")
          }

          function k() {
              var b, c, d = 0;
              l = (new Date).getTime(), b = e(), b && b.length > 0 && (d = i(b)), c = (new Date).getTime() - l, c = "~" + c + "ms", a("Lazy-loaded count: ", d, c)
          }
          var l, m = !1,
              n = {
                  containerElement: "div",
                  containerClass: "ad"
              };
          return "".trim || (String.prototype.trim = function() {
              return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
          }), domready(function() {
              c("resize", window, b(function(a) {
                  k()
              }, 250)), k()
          }), {
              init: k
          }
      }(), ! function(a, b, c, d) {
          var e = a(b);
          a.fn.lazyload = function(f) {
              function g() {
                  var b = 0;
                  i.each(function() {
                      var c = a(this);
                      if (!j.skip_invisible || c.is(":visible"))
                          if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                          else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                          if (++b > j.failure_limit) return !1
                      } else c.trigger("appear"), b = 0
                  })
              }
              var h, i = this,
                  j = {
                      threshold: 0,
                      failure_limit: 0,
                      event: "scroll",
                      effect: "show",
                      container: b,
                      data_attribute: "original",
                      skip_invisible: !1,
                      appear: null,
                      load: null,
                      placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                  };
              return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
                  return g()
              }), this.each(function() {
                  var b = this,
                      c = a(b);
                  b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
                      if (!this.loaded) {
                          if (j.appear) {
                              var d = i.length;
                              j.appear.call(b, d, j)
                          }
                          a("<img />").bind("load", function() {
                              var d = c.attr("data-" + j.data_attribute);
                              c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                              var e = a.grep(i, function(a) {
                                  return !a.loaded
                              });
                              if (i = a(e), j.load) {
                                  var f = i.length;
                                  j.load.call(b, f, j)
                              }
                          }).attr("src", c.attr("data-" + j.data_attribute))
                      }
                  }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
                      b.loaded || c.trigger("appear")
                  })
              }), e.bind("resize", function() {
                  g()
              }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
                  b.originalEvent && b.originalEvent.persisted && i.each(function() {
                      a(this).trigger("appear")
                  })
              }), a(c).ready(function() {
                  g()
              }), this
          }, a.belowthefold = function(c, f) {
              var g;
              return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
          }, a.rightoffold = function(c, f) {
              var g;
              return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
          }, a.abovethetop = function(c, f) {
              var g;
              return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
          }, a.leftofbegin = function(c, f) {
              var g;
              return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
          }, a.inviewport = function(b, c) {
              return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
          }, a.extend(a.expr[":"], {
              "below-the-fold": function(b) {
                  return a.belowthefold(b, {
                      threshold: 0
                  })
              },
              "above-the-top": function(b) {
                  return !a.belowthefold(b, {
                      threshold: 0
                  })
              },
              "right-of-screen": function(b) {
                  return a.rightoffold(b, {
                      threshold: 0
                  })
              },
              "left-of-screen": function(b) {
                  return !a.rightoffold(b, {
                      threshold: 0
                  })
              },
              "in-viewport": function(b) {
                  return a.inviewport(b, {
                      threshold: 0
                  })
              },
              "above-the-fold": function(b) {
                  return !a.belowthefold(b, {
                      threshold: 0
                  })
              },
              "right-of-fold": function(b) {
                  return a.rightoffold(b, {
                      threshold: 0
                  })
              },
              "left-of-fold": function(b) {
                  return !a.rightoffold(b, {
                      threshold: 0
                  })
              }
          })
      }(jQuery, window, document);
