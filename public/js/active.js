$(document).ready(function() {

    if ($('.topNavigationLink__topBar').length) {
        $(".topNavigationLink__topBar").each(function() {
            if (this.href == window.location.href) {
                $(this).addClass("active-about");
            }
        });
    }

});
