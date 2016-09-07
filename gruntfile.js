module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: ""
        },
        
        clean: {
            dev: ['<%= config.dev %>/js', '<%= config.dev %>/css', '<%= config.dev %>/index.html']
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
            files: ['app/**/*.ts'],
            tasks: ['typescript:dev']
        }
    });

    grunt.registerTask('dev', ['clean:dev', 'typescript:dev', 'sass:dev', 'includeSource:dev', 'watch']);
};