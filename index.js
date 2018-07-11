'use strict';

module.exports = {
  name: 'ember-cli-bootstrap-datetimepicker',

  included: function(app) {
    this._super.included(app);

    // Import unminified css and js
    let vendor = this.treePaths.vendor;
    app.import(`${vendor}/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js`);
    app.import(`${vendor}/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css`);

  },

  treeForVendor: function(vendorTree) {
    let Funnel = require('broccoli-funnel');
    let map = require('broccoli-stew').map;
    let mergeTrees = require('broccoli-merge-trees');

    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      new Funnel('node_modules/eonasdan-bootstrap-datetimepicker/build', {
        destDir: '/bootstrap-datetimepicker'
      })
    );

    return map(mergeTrees(trees), (content, relativePath) => {
      if (relativePath.match(/\.js$/i)) {
        return `if (typeof FastBoot === 'undefined') { ${content} }`;
      }
      return content;
    });
  }
};
