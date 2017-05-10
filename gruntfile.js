module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./views",
                        src: ["**"],
                        dest: "./dist/views"
                    },
                    {
                        expand: true,
                        cwd: "./config",
                        src: ["**"],
                        dest: "./dist/config"
                    },
                    {
                        expand: true,
                        cwd: "./config",
                        src: ["config/\*\*/\*.js"],
                        dest: "./dist"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["config/\*\*/\*.ts" ,"src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: true
                }
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["src/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts"],
                tasks: ["ts", "tslint"]
            },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.registerTask("default", [
        "copy",
        "ts",
        "tslint"
    ]);

};