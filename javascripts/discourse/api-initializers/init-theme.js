import $ from "jquery";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  $.fn.dframes = function () {
    let links = settings.iframe_origin_domains;

    let link = links.split("|"),
      dframe = this.find(
        "iframe[src*='" + link.join("'],iframe[src*='") + "']"
      ),
      rando = (function () {
        let i = 0;
        return function () {
          return i + Math.floor(Math.random() * 900) + 10000;
        };
      })();

    dframe.each(function () {
      $(this).attr("id", rando);
      let fId = $(this).attr("id");
      $(this)
        .css("width", "100%")
        .before(
          "<button data-frame='#" +
            fId +
            "' class='btn btn-default fExpand'><i class='fa fa-expand d-icon d-icon-expand'></i></button>"
        );
    });

    this.on("mouseenter", ".fExpand", function () {
      $(this).featherlight({
        targetAttr: "data-frame",
        root: "html",
      });
    });
  };
  api.decorateCooked(($elem) => $elem.dframes());
});
