module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    var vendors = grunt.file.readJSON("app/vendors.json");

    var vendorsInLib = vendors.map(function (path) { return 'wwwroot/libs/' + path; });
    var vendorsJs = vendorsInLib.filter(function(path) { return path.endsWith(".js"); });
    var vendorsCss = vendorsInLib.filter(function(path) { return path.endsWith(".css"); });

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: "wwwrootProd" // TODO: this is just to test the prod tasks
        },
        vendors: vendorsInLib,
        vendorsJs: vendorsJs,
        vendorsCss: vendorsCss,

        clean: {
            dev: '<%= config.dev %>',

            devJs: '<%= config.dev %>/js',
            devCss: '<%= config.dev %>/css',

            prod: '<%= config.prod =>'
        },
        copy: {            
            /* copies bower_components to wwwroot/libs */
            devVendor: { expand: true, cwd: 'bower_components/', src: vendors, dest: '<%= config.dev %>/libs', filter: 'isFile' },
            
            /* copies views to wwwroot */
            devViews: { expand: true, cwd: 'app/', src: ['**/*.html', '!index.tpl.html'], dest: '<%= config.dev %>/views', filter: 'isFile' },

            /* copies views from wwwroot to prod */
            prodViews: { expand: true, cwd: '<%= config.dev %>/views', src: ['**/*.html'], dest: '<%= config.prod %>/views', filter: 'isFile' }
        },
        typescript: {
            dev: {
                src: ['app/**/*.ts'],
                dest: '<%= config.dev %>/js',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    '<%= config.dev %>/css/app.css': 'sass/app.scss'
                }
            }
        },
        includeSource: {
            dev: {
                files: {
                    '<%= config.dev %>/index.html': 'app/index.tpl.html'
                }
            },
            prod: {
                files: {
                    '<%= config.prod %>/index.html': 'app/index.tpl.html'
                }
            }
        },
        watch: {
            app: {
                files: ['app/**/*.ts'],
                tasks: ['clean:devJs', 'typescript:dev', 'includeSource:dev']
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['clean:devCss', 'sass:dev', 'includeSource:dev']
            },
            index: {
                files: ['app/index.tpl.html'],
                tasks: ['includeSource:dev']
            },
            views: {
                files: ['app/**/*.html', '!app/index.tpl.html'],
                tasks: ['copy:devViews']
            }
        },

        uglify: {
            prod: {
                files: {
                    '<%= config.prod %>/app.min.js': '<%= config.dev %>/js/**/*.js',
                    '<%= config.prod %>/vendors.min.js': '<%= vendorsJs %>',
                }
            }
        },
        cssmin: {
            prod: {
                files: {
                    '<%= config.prod %>/app.min.css': '<%= config.dev %>/css/**/*.css',
                    '<%= config.prod %>/vendor.min.css': '<%= vendorsCss %>'
                }
            }
        }
    });

    grunt.registerTask('dev', ['devWithoutWatch', 'watch']);
    grunt.registerTask('devWithoutWatch', ['clean:dev', 'copy:devVendor', 'copy:devViews', 'typescript:dev', 'sass:dev', 'includeSource:dev']);

    grunt.registerTask('prod', ['clean:prod', 'devWithoutWatch', 'copy:prodViews', 'uglify:prod', 'cssmin:prod', 'daniel', 'includeSource:prod']);

    grunt.registerTask("daniel", "", function () {
        grunt.config("vendors", [''])
    });
};