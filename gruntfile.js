module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: ""
        },

        clean: {
            dev: [
                '<%= config.dev %>/js',
                '<%= config.dev %>/css',
                '<%= config.dev %>/views',
                '<%= config.dev %>/index.html'
            ]
        },
        copy: {
            dev: {
                files: [
                    /* copies html from app */
                    { expand: true, cwd: 'app/', src: ['**/*.html', '!index.tpl.html'], dest: '<%= config.dev %>/views', filter: 'isFile' },
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
        wiredep: {
            dev: {
                src: ['<%= config.dev %>/index.html']
            },
            overrides: {
                'bootstrap-sass': {
                    'main': ['../bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js']
                }
            }
        }
    });

    grunt.registerTask('dev', ['clean:dev', 'copy:dev', 'typescript:dev', 'sass:dev', 'includeSource:dev', 'wiredep:dev', 'watch']);
};