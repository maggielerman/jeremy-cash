(function() {
  // IE < 10 pollify for requestAnimationFrame
  var isDevice = "ontouchstart" in window;
  var isLoaded = false;
  var iscroll = undefined;
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        callback();
      }
    );
  })();

  $(window).resize(function() {
    if ($(window).width() < 769) {
      $.fn.fullpage.destroy("all");
    }
  });

  $(document).ready(function() {
     $(".fr-link").click(function(){
         $("html").attr("lang","fr")
     })
$(".eng-link").click(function(){
         $("html").attr("lang","en-US")
     })
$(".fr-link").click(function(){
         $("html").attr("lang","fr")
     })
    $(".wpcf7").on("wpcf7:invalid", function(event) {
      $(".appendval .error-contact").css("opacity","1");
      $(".success-contact").css("opacity","0")
    });
    $(".wpcf7").on("wpcf7:mailsent", function(event) {
      $(".appendval .success-contact").css("opacity","1")
      $(".error-contact").css("opacity","0")
    });
    //  $(".append-validation").appendTo(".wpcf7-validation-errors");
    $("#menu-item-36 a").addClass("notranslate");
    $(".scrolla,.scroll_content").mCustomScrollbar({
      setHeight: false
    });
    var wh = $(window).height();
    $(".about").css("height", wh + "px");
    // ClickEvent($(".langtrans"));
    preload();
    $(".sidenav li").click(function() {});
    $("body").addClass("lang-eng");

    $(".sidenav li").append('<span class="border-indicator"></span>');

    $(".lang-english").click(function() {
      $("body").addClass("lang-eng");
      $("body").removeClass("lang-fr");
    });
    $(".lang-french").click(function() {
      $("body").addClass("lang-fr");
      $("body").removeClass("lang-eng");
    });
    $("header .logo").append("<a href='#' class='closebtn'</a>");
    $(".closebtn").click(function() {
      $("header .topmenu li:first-child").removeClass("active");
      $("header .logo").removeClass("opacity");
      $(".modal").fadeOut("slow");
      $(".logo a:first-child").show();
      $(".closebtn").hide();
      return false;
    });
    // ////// ================= >>> DESKTOP
    $(".topmenu li:first").click(function() {
      if ($(".modal").is(":hidden")) {
        $(this).addClass("active");
        // $(this)
        //   .children("a")
        //   .css("color", "#eaccc2 ")
        $("header .logo").addClass("opacity");
        $(".closebtn").show();
        // $('header').addClass('active')
        $(".modal").fadeIn("slow");
        $(this).addClass("active");
        $(".logo a:first-child").hide();
        ContactFormAnim();
      } else {
        $(".closebtn").hide();
        $(this).removeClass("active");
        $("header .logo").removeClass("opacity");
        $(".modal").fadeOut("slow");
        $(this).removeClass("active");
        $(".logo a:first-child").show();
      }
    });

    if ($(window).width() < 769) {
      $(".about.section").removeClass("fp-auto-height");
      // mobileSwipe()
    } else {
      $(".about.section").addClass("fp-auto-height");
    }

    //
    $(".sidenav").on("click", "a", function(e) {
      e.preventDefault();
      var _this = parseInt(
        $(this)
          .parent()
          .index() + 1
        // .index() + 2
      );
      ElementsPosition(_this);
      $.fn.fullpage.moveTo(_this);
      iScrollTo(_this);
    });

    fullpage();

    if ($(window).width() < 769) {
      $(".menudrop li a").click(function(e) {
        // e.preventDefault()
        var _this = $(this);

        $(".menudrop").removeClass("active");
        $(".burger a").removeClass("active");
        // $('.menudrop').hide()
        if (parseInt(_this.attr("target")) > 0) {
          $(".modal")
            .fadeOut()
            .removeClass("active");

          setTimeout(function() {
            if ($(window).width() > 768) {
              $.fn.fullpage.moveTo(parseInt(_this.attr("target")));
            }
            if (!$(".modal").hasClass("active") && $(window).width() > 768) {
              $.fn.fullpage.setAllowScrolling(true);
            }
          }, 700);
        }

        if ($(window).width() < 769) {
          // mobileTitle($(_this).attr('link'))
          var posY = $(_this.attr("href")).offset().top;
          if (_this.attr("href") === "#about") {
            posY = 0;
          }
          scrollTo($(_this.attr("href")).offset().top);
        }

        if (
          $(this)
            .parent()
            .hasClass("social") &&
          !$(this).hasClass("notranslate")
        ) {
          if ($(".modal").is(":hidden")) {
            setTimeout(function() {
              $("header").addClass("active");
              $(".modal")
                .fadeIn()
                .addClass("active");
              $(this)
                .parent()
                .addClass("active");
            }, 700);
          }
        } else {
          if (!parseInt(_this.attr("target"))) {
            if ($(window).width() > 768) {
              $.fn.fullpage.setAllowScrolling(true);
            }
          }
        }
      });

      $(".menudrop li.contactlink").click(function(e) {
        e.preventDefault();
        if ($(".modal").is(":hidden")) {
          setTimeout(function() {
            $("header").addClass("active");
            $(".modal")
              .fadeIn()
              .addClass("active");
            $(this)
              .parent()
              .addClass("active");
            $("header .burger a").addClass("active");
          }, 700);
        } else if ($(".modal").is(":visible")) {
          $(".modal").fadeOut();
          $("html, body").removeClass("scrolldisabled");
        }
      });

      // $('.menudrop').hide()

      $(".burger a").click(function(e) {
        e.preventDefault();
        // $('.actiontag').html('Menu')
        if ($(".modal").hasClass("active")) {
          $(".modal")
            .fadeOut()
            .removeClass("active");
          $("header .burger a").removeClass("active");
          $("header").removeClass("active");
        }
        if (!$(".menudrop").hasClass("active")) {
          $("html, body").addClass("scrolldisabled");
          $(".mobilelogo").css("opacity", "0.5");
          $(".menudrop").addClass("active");
          mobileTitle("menu");
          if ($(".modal").hasClass("active")) {
            $("header").removeClass("active");
          }
          $(this).addClass("active");
          if ($(window).width() > 768) {
            $.fn.fullpage.setAllowScrolling(false);
          }
        } else {
          $(".mobilelogo").css("opacity", "1");
          $(".menudrop").removeClass("active");
          if ($(".modal").hasClass("active")) {
            $("header").addClass("active");
          }
          $(this).removeClass("active");
          var sectionactive = $("section.active").attr("id");
          $("html, body").removeClass("scrolldisabled");
          mobileTitle(sectionactive);

          if (!$(".modal").hasClass("active")) {
            if ($(window).width() > 768) {
              $.fn.fullpage.setAllowScrolling(true);
            }
          }
        }
      });

      $("body").append(
        "<div class='navlink'><a href='#' class='prev'></a><a href='#' class='nxt'></a></div>"
      );

      $(".navlink a.prev").click(function(e) {
        e.preventDefault();
        if ($(window).width() > 768) {
          $.fn.fullpage.moveSectionUp();
        } else {
          var active = $(".section.active"),
            targetIndex = active.index() - 2;
          if (
            $(".section")
              .eq(targetIndex)
              .hasClass("section")
          ) {
            // mobileTitle($('.section').eq(targetIndex).attr('id'))
            scrollTo(
              $(".section")
                .eq(targetIndex)
                .offset().top - 62
            );
          }
        }
      });
      $(".navlink a.nxt").click(function(e) {
        e.preventDefault();
        if ($(window).width() > 768) {
          $.fn.fullpage.moveSectionDown();
        } else {
          var active = $(".section.active"),
            targetIndex = active.index();
          if (
            $(".section")
              .eq(targetIndex)
              .hasClass("section")
          ) {
            // mobileTitle($('.section').eq(targetIndex).attr('id'))

            scrollTo(
              $(".section")
                .eq(targetIndex)
                .offset().top
            );
          }
        }
      });
      $(".homearrow	a").click(function() {
        if ($(window).width() > 768) {
          $.fn.fullpage.moveSectionDown();
        } else {
          scrollTo(
            $(".section")
              .eq(1)
              .offset().top
          );
          mobileTitle("about");
        }
      });
    }

    $(".html.fp-enabled, .fp-enabled body");
  }); /* Enddocument ready*/

  function fullpage(status) {
    if (!status) {
      var nse = $(window).width() > 768 ? "" : ".context-desc";
      if ($(window).width() > 768) {
        $("#fullpage").fullpage({
          scrollingSpeed: 1500,
          css3: true,
          easingcss3: "cubic-bezier(0.77, 0, 0.175, 1)",
          navigation: true,
          lockAnchors: true,
          fitToSection: false,
          // setAutoScrolling: true,
          scrollOverflow: true,
          scrollOverflowOptions: {
            probeType: 3
          },
          loopBottom: false,
          navigation: true,
          afterLoad: function(anchorLink, index) {
            // TweenMax.to('section.active .context-desc .inner', 0.4, {
            //   autoAlpha: 1,
            //   ease: Power1.easeOut
            // })
            tmax = new TimelineMax();
            tmax
              .to("section.active .context-desc .inner h1", 0.8, {
                y: -15,
                autoAlpha: 1,
                ease: Power1.easeInOut
              })
              .to(
                "section.active .context-desc .inner .context",
                0.5,
                { y: -15, autoAlpha: 1, ease: Power1.easeInOut },
                "0.2"
              )
              .to(
                "section.active .context-desc .inner .context .quicklinks",
                0.5,
                { y: -15, autoAlpha: 1, delay: 0.5, ease: Power1.easeInOut },
                "0.2"
              );

            ElementsPosition(index);

            if (index == 1 || index == 2) {
              $(".navlink").hide();
            } else {
              $(".navlink").show();
            }

            iscroll = $(".about.fp-section.active")
              .find(".fp-scrollable")
              .data("iscrollInstance");

            if (iscroll && typeof iscroll !== undefined) {
              iscroll.on("scroll", getScroll);
            }
            // mobilelements(index)
          },
          afterRender: function() {
            ElementsPosition(1);
          },
          onLeave: function(index, nextIndex, direction) {
            tmax = new TimelineMax();
            tmax
              .to("section.active .context-desc .inner h1", 0.8, {
                y: 0,
                autoAlpha: 0,
                ease: Power1.easeOut
              })
              .to(
                "section.active .context-desc .inner .context ",
                0.5,
                { y: 0, autoAlpha: 0, ease: Power1.easeInOut },
                "0.2"
              )
              .to(
                "section.active .context-desc .inner .context .quicklinks",
                0.5,
                { y: 0, autoAlpha: 0, ease: Power1.easeInOut },
                "0.2"
              );

            setTimeout(function() {
              ElementsPosition(nextIndex);
            }, 300);
          }
        });
      } else {
      }
    } else {
      $.fn.fullpage.reBuild();
    }
  }

  function ElementsPosition(index) {
    var $indicator = $(".indicator");

    if (index !== 1) {
      // $('.indicator')
      //   .stop(false, true)
      //   .fadeIn()
    }
    $(".sidenav li").removeClass("active");

    $(".sidenav li")
      .eq(index - 1)
      .addClass("active");

    var gettop =
      72 *
      parseInt(
        $(".sidenav li")
          .eq(index - 1)
          .index()
      );

    TweenMax.to("section.active .context-desc .inner", 1.6, {
      top: 0,
      ease: Power1.easeInOut
    });

    TweenMax.to($(".indicator"), 1, { y: gettop, ease: Power1.easeInOut });
  }

  function preload() {
    var width = 100,
      perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime / 1000) % 60) * 100;

    var items = $(".preloader .dots");

    items.sort(function() {
      return Math.random() * 10 > 5 ? 1 : -1;
    });
    var total = items.length;
    var result = total / 100 * 10000;

    items.each(function(i) {
      var initial = time;
      var delay = initial - initial / (total + 1) * (total - i);
      var speed = initial - initial / (total + 1) * i;
      var item = $(this);
      item.css({
        "transition-delay": delay + "ms",
        "transition-duration": speed + "ms",
        background: "#eaccc2"
      });
    });

    // Fading Out Preloader on Finised
    setTimeout(function() {
      $(".preloader").fadeOut(300);
      if ($(window).width() < 769) {
        setTimeout(function() {
          $(window).scrollTop(0);
          isLoaded = true;
          $("body").addClass("disable-scroll");
          $(".about.section").addClass("active");
          $(".navlink").hide();
        }, 100);
      }
      AnimationIntro();
    }, time);
  }

  function AnimationIntro() {
    $("a.glink")
      .parent("div")
      .addClass("langtrans");
    var $logo = $(".logo"),
      $menu = $("#menu-top-menu").children("li"),
      $titletext = $(".headtext, .body section.about h1"),
      $abimg = $(".abimg"),
      $lang = $(".langtrans"),
      $sidenav = $(".sidenav ul li");
    $indicator = $(".indicator");

    t1 = new TimelineMax();

    t1
      .from($logo, 0.4, { y: 20, autoAlpha: 0, ease: Power1.easeOut })
      .staggerFrom(
        $menu,
        0.3,
        { y: 20, autoAlpha: 0, ease: Power1.easeOut },
        0.1
      )
      .add("animcon")
      .from(
        $lang,
        0.8,
        { y: 20, autoAlpha: 0, ease: Power1.easeOut },
        "animcon-=0.4"
      )
      .from(
        $titletext,
        0.8,
        { autoAlpha: 0, y: 20, ease: Power1.easeOut },
        "animcon-=0.4"
      )
      .staggerFrom($sidenav, 0.3, { autoAlpha: 0, ease: Power1.easeOut }, 0.1)
      .add("indicatoranim")
      .from(
        $indicator,
        0.8,
        { autoAlpha: 0, ease: Power1.easeOut },
        "indicatoranim-=0.9"
      )
      .from(
        $abimg,
        1.5,
        { autoAlpha: 0, y: 100, ease: Power1.easeOut },
        "indicatoranim-=0.9"
      );
  }

  function ContactFormAnim() {
    var $form = $(".form"),
      $email = $(".email_list ul").children("li");
    t1 = new TimelineMax();
    t1
      .from($form, 0.6, { y: 15, autoAlpha: 0, delay: 1, ease: Power1.easeOut })
      .from(
        $(".modal .email_list li:nth-child(3)"),
        0.3,
        { y: 15, autoAlpha: 0, ease: Power1.easeOut },
        "-=0.4"
      )
      .from(
        $(".modal .email_list li:nth-child(2)"),
        0.4,
        { y: 15, autoAlpha: 0, ease: Power1.easeOut },
        "-=0.5"
      )
      .from(
        $(".modal .email_list li:first-child"),
        0.5,
        { y: 15, autoAlpha: 0, ease: Power1.easeOut },
        "-=0.6"
      );
    // .add("anim")
    // .staggerFrom(
    //   $email,
    //   0.4,
    //   { autoAlpha: 0, ease: Power1.easeOut },
    //   "anim-=0.6"
    // )
  }

  function animateValue(id, start, end, duration) {
    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

    var timer = setInterval(function() {
      current += increment;
      $(obj).text(current + "%");
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  function getScroll() {
    var headtext = $(".headtext"),
      headtextPos = headtext.offset().top + headtext.height(),
      headtextTrigger = headtextPos,
      abimgPos = $(".abimg").offset().top;
    if (abimgPos < headtextTrigger) {
      TweenMax.to(headtext, 0.5, { opacity: 0, ease: Power1.easeOut });
    } else {
      TweenMax.to(headtext, 0.5, { opacity: 1, ease: Power1.easeOut });
    }
    if (this.y <= this.maxScrollY) {
      $.fn.fullpage.moveTo(2);
    } else {
      TweenMax.to(headtext, 0.5, { y: this.y * 0.1, ease: Power1.easeOut });
    }
  }
  var lastScrollTop = 0;
  var isScrolling = false;
  var running = false;
  var timeout = null;

  // function mobileSwipe() {
  //   $(".about.section").swipe({
  //     // Generic swipe handler for all directions
  //     swipe: function(
  //       event,
  //       direction,
  //       distance,
  //       duration,
  //       fingerCount,
  //       fingerData
  //     ) {
  //       if (direction == "down") {
  //         // mobileTitle($('.about.section').next().attr('id'))
  //         scrollTo($(".about.section").height())
  //         $("body").removeClass("disable-scroll")
  //       }
  //     }
  //   })

  //   $("#experience .fullbg").swipe({
  //     // Generic swipe handler for all directions
  //     swipe: function(
  //       event,
  //       direction,
  //       distance,
  //       duration,
  //       fingerCount,
  //       fingerData
  //     ) {
  //       if (direction == "up") {
  //         scrollTo(0)
  //         $("body").addClass("disable-scroll")
  //       }
  //     }
  //     // allowPageScroll: 'vertical'
  //   })
  // }
  function mobileTitle(target) {
    var el = "title-" + target;
    if (target === "title-menu") {
      $(".title-menu")
        .addClass("active")
        .siblings()
        .removeClass("prev active");
    } else {
      if (target === "about") {
        if (!$("body").hasClass("disable-scroll")) {
          $("body").addClass("disable-scroll");
        }
        $(".navlink")
          .stop()
          .fadeOut();
      } else {
        if ($("body").hasClass("disable-scroll")) {
          $("body").removeClass("disable-scroll");
        }
        $(".navlink")
          .stop()
          .fadeIn();
      }
      if (!$("." + el).hasClass("active")) {
        $("." + el)
          .addClass("active")
          .removeClass("prev")
          .siblings()
          .removeClass("active");
        $("." + el)
          .prevAll()
          .addClass("prev");
        $("." + el)
          .nextAll()
          .removeClass("prev");
      }
    }
  }
  function mobileScroll() {
    var lastsection = $("#partners");
    var _win = $(window);
    var st = _win.scrollTop();

    var header = $("header").offset().top + $("header").height();

    $(".section").each(function() {
      var _section = $(this);

      if (_win.scrollTop() + 62 >= _section.offset().top) {
        _section
          .addClass("bg-fixed active")
          .siblings()
          .removeClass("active");
      } else {
        _section.removeClass("bg-fixed active");
      }
    });

    if (lastsection.hasClass("active")) {
      $(".navlink .nxt").addClass("shy-hide");
    } else {
      $(".navlink .nxt").removeClass("shy-hide");
    }

    mobileTitle($(".section.active").attr("id"));

    lastScrollTop = st;
  }

  function scrollTo(pos) {
    $("html, body")
      .stop()
      .animate({ scrollTop: pos }, { duration: 1000, complete: function() {} });
  }

  function iScrollTo(index) {
    if ($(window).width() < 769) return false;
    if (!iscroll) {
      iscroll = $(".about.fp-section.active")
        .find(".fp-scrollable")
        .data("iscrollInstance");
    }
    if (index === 1 && iscroll) {
      iscroll.scrollTo(0, 0);
      $(".headtext").removeAttr("style");
    }
  }
  $(window).on("scroll", function() {
    if ($(window).width() < 769) {
      if (isLoaded) {
        mobileScroll();
      }
    }
  });
})();

/* Click Event */

// function ClickEvent(element) {
//   var $this = $(this);
//   Translate();
//   $this.click(function() {
//     Translate();
//   });
// }

// function Translate() {
//   var $FrenchContent = $(".frenchcontent"),
//     $EnglishContent = $(".englishcontent"),
//     $html = $("html");
//   $FrenchContent.hide();
//   if ($html.is(".translated-ltr")) {
//     $EnglishContent.hide();
//     $FrenchContent.show();
//   } else if (!$html.hasClass(".translated-ltr")) {
//     $EnglishContent.show();
//     $FrenchContent.hide();
//   }
// }
