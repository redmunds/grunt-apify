/*
 * grunt-apify
 * https://github.com/jbalsas/grunt-apify
 *
 * Copyright (c) 2013 Chema Balsas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask("apify", "Grunt plugin for apify", function () {
        var defaults    = require("apify/lib/defaults.json"),
            documenter  = require("apify/lib/Documenter"),
            path        = require("path"),
            done        = this.async();
        
        // Resolve absolute path for default templates and assets
        var templates = Object.keys(defaults.templates);
        
        templates.forEach(function (templateName) {
            defaults.templates[templateName] = path.resolve(__dirname + "/../node_modules/apify/bin/" + defaults.templates[templateName]);
        });
        
        defaults.assets = path.resolve(__dirname + "/../node_modules/apify/bin/" + defaults.assets);
        
        defaults.source = this.options().src || "src";
        defaults.output = this.options().output || "docs";
        defaults.title = this.options().title || "";
        
        documenter.init(defaults).then(function (err) {
            if (err) {
                done(err);
            } else {
                done(true);
            }
        });
    });

};
