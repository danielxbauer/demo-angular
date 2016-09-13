module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var vendors = [
        'jquery/dist/jquery.min.js',
        'angular/angular.min.js',
        'angular-ui-router/release/angular-ui-router.js',
        'bootstrap-sass/assets/javascripts/bootstrap.js'
    ];
    var vendorsInLib = vendors.map(function (path) { return 'wwwroot/libs/' + path; });

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: ""
        },
        vendors: vendorsInLib,

        clean: {
            dev: [
                '<%= config.dev %>/js',
                '<%= config.dev %>/css',
                '<%= config.dev %>/views',
                '<%= config.dev %>/libs',
                '<%= config.dev %>/index.html'
            ]
        },
        copy: {
            dev: {
                files: [
                    /* copies views to wwwroot */
                    { expand: true, cwd: 'app/', src: ['**/*.html', '!index.tpl.html'], dest: '<%= config.dev %>/views', filter: 'isFile' },

                    /* copies bower_components to wwwroot/libs */
                    { expand: true, cwd: 'bower_components/', src: vendors, dest: '<%= config.dev %>/libs', filter: 'isFile' }
                ]
            }
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
            options: {
            },
            dev: {
                files: {
                    '<%= config.dev %>/index.html': 'app/index.tpl.html'
                }
            }
        },
        watch: {
            js: {
                files: ['app/**/*.ts'],
                tasks: ['typescript:dev', 'includeSource:dev']
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:dev']
            },
            index: {
                files: ['app/index.tpl.html'],
                tasks: ['includeSource:dev', 'wiredep:dev']
            },
            views: {
                files: ['app/**/*.html', '!app/index.tpl.html'],
                tasks: ['copy']
            }
        },
    });

    grunt.registerTask('dev', ['clean:dev', 'copy:dev', 'typescript:dev', 'sass:dev', 'includeSource:dev']); //, 'watch']);
};