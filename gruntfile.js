module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        config: {
            dev: "wwwroot",
            prod: ""
        },
        clean: {
            dev: ['<%= config.dev %>/js', '<%= config.dev %>/css']
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
        }
    });

    grunt.registerTask('dev', ['clean:dev', 'typescript:dev', 'sass:dev']);
};