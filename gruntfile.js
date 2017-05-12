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
            cwd: "./src/views",
            src: ["**"],
            dest: "./dist/src/views"
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
          src: ["config/\*\*/\*.ts", "src/\*\*/\*.ts", "!src/.baseDir.ts"],
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
        files: ["/src/views/**/*.pug"],
        tasks: ["copy"]
      }
    },
    express: {
      options: {
        port: 8080,
      },
      dev: {
        options: {
          script: './dist/config/server.conf.js'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ["dist/src/tests/\*\*/\*.js"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("server", [
    "copy",
    "ts",
    "tslint",
    "express"
  ]);

  grunt.registerTask("test", ["server", "mochaTest"]);

  grunt.registerTask("default", [
    "copy",
    "ts",
    "tslint"
  ]);

};