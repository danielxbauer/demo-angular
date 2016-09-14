module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');      // to delete folder, files
    grunt.loadNpmTasks('grunt-contrib-copy');       // to copy folder, files
    grunt.loadNpmTasks('grunt-typescript');         // to compile typescript to js
    grunt.loadNpmTasks('grunt-sass');               // to compile sass to css
    grunt.loadNpmTasks('grunt-include-source');     // to include js, css tags into index.html
    grunt.loadNpmTasks('grunt-contrib-watch');      // to watch files and do tasks

    grunt.loadNpmTasks('grunt-contrib-uglify');     // to minify js
    grunt.loadNpmTasks('grunt-contrib-cssmin');     // to minify css

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: "wwwrootprod"
        },

        clean: {
            dev: '<%= config.dev %>',
            prod: '<%= config.prod %>',

            /* above ones for watch task */
            devJs: '<%= config.dev %>/js',
            devCss: '<%= config.dev %>/css',
        },
        copy: {            
            /* copies bower_components to wwwroot/libs */
            devVendor: { expand: true, cwd: 'bower_components/', src: '<%= vendors %>', dest: '<%= config.dev %>/libs', filter: 'isFile' },
            
            /* copies views to wwwroot */
            devViews: { expand: true, cwd: 'app/', src: ['**/*.html', '!index.tpl.html'], dest: '<%= config.dev %>/views', filter: 'isFile' },

            /* copies views from wwwroot to prod */
            prodViews: { expand: true, cwd: '<%= config.dev %>/views', src: ['**/*.html'], dest: '<%= config.prod %>/views', filter: 'isFile' }
        },
        typescript: {
            options: {
                module: 'amd', //or commonjs 
                target: 'es5', //or es3
                sourceMap: true,
                declaration: true
            },
            dev: {
                src: ['app/**/*.ts'],
                dest: '<%= config.dev %>/js'                
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

        /* uglify and cssmin are only used in prod task */
        uglify: {
            prod: {
                files: {
                    '<%= config.prod %>/app.min.js': '<%= config.dev %>/js/**/*.js',
                    '<%= config.prod %>/vendors.min.js': '<%= vendorsDevJs %>',
                }
            }
        },
        cssmin: {
            prod: {
                files: {
                    '<%= config.prod %>/app.min.css': '<%= config.dev %>/css/**/*.css',
                    '<%= config.prod %>/vendor.min.css': '<%= vendorsDevCss %>'
                }
            }
        }
    });

    grunt.registerTask('dev', ['devWithoutWatch', 'watch']);
    grunt.registerTask('devWithoutWatch', ['clean:dev', 'setupVarsDev', 'copy:devVendor', 'copy:devViews', 'typescript:dev', 'sass:dev', 'includeSource:dev']);

    grunt.registerTask('prod', ['devWithoutWatch', 'clean:prod', 'copy:prodViews', 'uglify:prod', 'cssmin:prod', 'setupVarsProd', 'includeSource:prod']);

    grunt.registerTask('setupVarsDev', '', function () {
        var base = grunt.config('config').dev;

        var vendors = grunt.file.readJSON("app/vendors.json");
        var vendorsInLib = vendors.map(function (path) { return 'wwwroot/libs/' + path; });

        var vendorsJs = vendorsInLib.filter(function (path) { return path.endsWith(".js"); });
        var vendorsCss = vendorsInLib.filter(function (path) { return path.endsWith(".css"); });

        grunt.config('vendors', vendors);
        grunt.config('vendorsDevJs', vendorsJs);
        grunt.config('vendorsDevCss', vendorsCss);

        grunt.config('vendorsJs', vendorsJs);
        grunt.config('vendorsCss', vendorsCss);
        
        grunt.config('appJs', [base + "/js/app.js", base + "/js/**/*.js"]);
        grunt.config('appCss', [base + "/css/app.css"]);
    });
    grunt.registerTask('setupVarsProd', '', function () {
        var base = grunt.config('config').prod;

        grunt.config('vendorsJs', [base + '/vendors.min.js']);
        grunt.config('vendorsCss', [base + '/vendors.min.css']);

        grunt.config('appJs', [base + '/app.min.js']);
        grunt.config('appCss', [base + '/app.min.css']);
    });
};