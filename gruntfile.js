const { task } = require("grunt")

module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less:
        {
            // Aqui deve colocar o ambiente onde vai ocorrer o código
            development: 
            {
                files:
                {
                    // Coloca por primeiro o destino e depois a origem
                    "./dev/styles/main.css" : "./src/styles/main.less"
                }
            },
            production:
            {
                options:
                {
                    // Comprime o arquivo main.css
                    compress: true
                },
                files:
                {
                    "./dist/styles/main.min.css" : "./src/styles/main.less"
                }
            }
        },
        // watch:
        // {
        //     less:
        //     {
        //         files: [".src/styles/**/*.less"],
        //         tasks: ["less:development"]
        //     }
        // },
        replace: 
        {
            dev:
            {
                options: {
                    patterns: [
                    {
                        // Cria o nome de referência
                        match: 'ENDERECO_DO_CSS',
                        // Faz a substituição
                        replacement: './styles/main.css'
                    },
                    {
                        // Cria o nome de referência
                        match: 'ENDERECO_DO_JS',
                        // Faz a substituição
                        replacement: '../src/scripts/main.js'
                    }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:
            {
                options: {
                    patterns: [
                    {
                        // Cria o nome de referência
                        match: 'ENDERECO_DO_CSS',
                        // Faz a substituição
                        replacement: './styles/main.min.css'
                    },
                    {
                        // Cria o nome de referência
                        match: 'ENDERECO_DO_JS',
                        // Faz a substituição
                        replacement: './scripts/main.min.js'
                    }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:
        {
            dist:
            {
                options:
                {
                    // Remove comentários
                    removeComments: true,
                    // Remove 
                    collapseWhitespace: true
                },
                files:
                {
                    // Minificando
                    './prebuild/index.html': './src/index.html'
                    // 
                }
            }
        },
        clean: ['prebuild'],
        uglify:
        {
            target: 
            {
                files:
                {

                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    // Plugin que compila LESS
    grunt.loadNpmTasks("grunt-contrib-less")
    // Plugin que atualiza o código
    // grunt.loadNpmTasks("grunt-contrib-watch")
    // Plugin que deixa disponível executar as tarefas de forma paralela
    grunt.loadNpmTasks("grunt-concurrent")
    // Substitui as páginas html
    grunt.loadNpmTasks("grunt-replace")
    // Minimiza o arquivo html
    grunt.loadNpmTasks("grunt-contrib-htmlmin")
    // Exclui arquivos que são temporários
    grunt.loadNpmTasks("grunt-contrib-clean")
    // Minimiza o JavaScript
    grunt.loadNpmTasks("grunt-contrib-uglify")

    grunt.registerTask("default", ["less:development"])
    grunt.registerTask("build", ["less:production", "htmlmin:dist", "replace:dist", 'clean', 'uglify'])
}