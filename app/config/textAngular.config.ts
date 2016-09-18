module Demo {
    export class TextAngularConfig {

        static $inject = ["$provide"];
        constructor($provide) {
            $provide.decorator("taTools", ["$delegate", function (taTools) {
                taTools.h1.iconclass = "mdi mdi-18px mdi-format-header-1";
                delete taTools.h1.buttontext;

                taTools.h2.iconclass = "mdi mdi-18px mdi-format-header-2";
                delete taTools.h2.buttontext;

                taTools.h3.iconclass = "mdi mdi-18px mdi-format-header-3";
                delete taTools.h3.buttontext;

                taTools.p.iconclass = "mdi mdi-18px mdi-format-paragraph";
                delete taTools.p.buttontext;

                taTools.quote.iconclass = "mdi mdi-18px mdi-format-quote";
                taTools.quote.tooltiptext = "Quote";

                taTools.bold.iconclass = "mdi mdi-18px mdi-format-bold";
                taTools.italics.iconclass = "mdi mdi-18px mdi-format-italic";
                taTools.underline.iconclass = "mdi mdi-18px mdi-format-underline";

                taTools.ul.iconclass = "mdi mdi-18px mdi-format-list-bulleted";
                taTools.ol.iconclass = "mdi mdi-18px mdi-format-list-numbers";

                taTools.justifyLeft.iconclass = "mdi mdi-18px mdi-format-align-left";
                taTools.justifyRight.iconclass = "mdi mdi-18px mdi-format-align-right";
                taTools.justifyFull.iconclass = "mdi mdi-18px mdi-format-align-justify";
                taTools.justifyCenter.iconclass = "mdi mdi-18px mdi-format-align-center";

                return taTools;
            }]);
        }
    }

    DemoApp.config(TextAngularConfig);
}

