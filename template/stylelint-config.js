module.exports = {
  processors: ["stylelint-processor-styled-components"],
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-styled-components"
  ],
  rules: {
    "font-family-no-missing-generic-family-keyword": null,
    "selector-type-no-unknown": null,
    "no-descending-specificity": null,
    "property-no-vendor-prefix": null,
  },
  customSyntax: "postcss-scss",
};
