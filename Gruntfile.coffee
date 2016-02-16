module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    aws: grunt.file.readJSON(process.env['HOME'] + '/.grunt-aws.json')

    connect:
      server:
        options:
          base: './'
    coffee:
      compile:
        files:
          'build/bsvideos_tv_coffee.js': 'src/bsvideos_tv.coffee'
    concat:
      dynamic:
        files:[ {
          expand: true
          cwd: 'src/js/'
          src: [ '**/*.js' ]
          dest: 'build/'
          extDot: 'first'
        } ]
      basic:
        files:
          'build/article_videolist.js': ['vendors/js/jquery.bxslider.js','src/js/article_videolist.js']
          'build/article_videolist.css': ['vendors/css/jquery.bxslider.css','src/css/article_videolist.css']
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:[ {
          expand: true
          cwd: 'build/'
          src: [ '**/*.js' ]
          dest: 'dist/'
          ext: '.min.js'
          extDot: 'first'
        } ]
    cssmin:
      target:
        files:
          'dist/bsvideos_tv.min.css': ['build/bsvideos_tv.css']
          'dist/article_videolist.min.css': ['build/article_videolist.css']
    
    aws_s3:
      options:
        accessKeyId: '<%= aws.key %>'
        secretAccessKey: '<%= aws.secret %>'
        bucket: '<%= aws.bucket %>'
        params:
          CacheControl: 'max-age=630720000, public'
          Expires: new Date(Date.now() + 63072000000)
      prod:
        files: 
          '<%= pkg.version %>/dist/interstitial.min.js': 'dist/interstitial.min.js'
          '<%= pkg.version %>/dist/interstitial_v2.min.js': 'dist/interstitial_v2.min.js'
          '<%= pkg.version %>/dist/bottomarticle.min.js': 'dist/bottomarticle.min.js'
          '<%= pkg.version %>/dist/bottomarticle_v2.min.js': 'dist/bottomarticle_v2.min.js'
          '<%= pkg.version %>/dist/inarticle.min.js': 'dist/inarticle.min.js'
          '<%= pkg.version %>/dist/inarticle_v2.min.js': 'dist/inarticle_v2.min.js'
          # videojs player start
          '<%= pkg.version %>/dist/article_videolist.min.js': 'dist/article_videolist.min.js'
          '<%= pkg.version %>/dist/article_videolist.min.css': 'dist/article_videolist.min.css'
          '<%= pkg.version %>/dist/videolist_script.min.js': 'dist/videolist_script.min.js'
          'html/<%= pkg.version %>/article_videolist_player.html':'src/html/<%= pkg.version %>/article_videolist_player.html'
          # videojs player end
          'demo/index.html': 'demo/index.html'
          'html/interstitial_html.htm':'src/html/interstitial_html.htm'
          'html/bottomarticle_html.htm':'src/html/bottomarticle_html.htm'
          'html/inarticle_html.htm':'src/html/inarticle_html.htm'
          'html/<%= pkg.version %>/interstitial_html.htm':'src/html/<%= pkg.version %>/interstitial_html.htm'
          'html/<%= pkg.version %>/bottomarticle_html.htm':'src/html/<%= pkg.version %>/bottomarticle_html.htm'
          'html/<%= pkg.version %>/inarticle_html.htm':'src/html/<%= pkg.version %>/inarticle_html.htm'
          'images/close.png':'src/images/close.png'
          'images/skip.png':'src/images/skip.png'
          'videos/video.mp4':'src/videos/video.mp4'
       vendors:
         files:[ 
           {
            expand: true
            cwd: 'vendors/images/'
            src: [ '**/*' ]
            dest: 'vendors/images/'
            extDot: 'first'
           } 
         ]
  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  # Default task(s).
  grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify', 'cssmin']
  grunt.registerTask 'deliver', [ 'aws_s3' ]
  return
