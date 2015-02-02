(function() {
  module.exports = function(grunt) {
    var remapify = require('remapify');
    grunt.initConfig({
      //每次运行Grunt的时候清除之前生成的文件
      clean: {
        bin: ["bin"],
        sassCache: '.sass-cache'
      },
      //分析模块依赖树，最后生成一个main.js文件
      browserify: {
        dev: {
          expand: true,
          flatten: true,
          src: ["src/js/main.js"],
          dest: "bin/js",
          ext: ".js"
        }
      },
      //压缩js文件
      uglify: {
        build: {
          files: [
            {
              expand: true,
              cwd: 'bin/js',
              src: '**/*.js',
              dest: 'dist/js'
            }
          ]
        }
      },
      //压缩css文件
      cssmin: {
        build: {
          files: {
            "dist/css/main.css": ["bin/css/main.css"]
          }
        }
      },
      //监听文件变化，如果src文件夹中的js或css文件变化了，执行任务`browserify`和`sass`
      watch: {
        compile: {
          files: ["src/**/*.js", "src/**/*.scss"],
          tasks: ["browserify","sass"]
        }
      },
      //scss文件编译成css
      sass: {
        dist: {
          files: {
            "bin/css/main.css": "src/scss/main.scss"
          }
        }
      }
    });
    //加载上述任务所需要的插件
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    //定义被执行的任务列表
    grunt.registerTask("default", function() {
      return grunt.task.run(["clean:bin","browserify", "sass", "watch"]);
    });
    return grunt.registerTask("build", function() {
      return grunt.task.run(["clean:bin", "clean:dist", "browserify", "sass", "clean:sassCache", "cssmin", "uglify", "copy"]);
    });
  };
}).call(this);