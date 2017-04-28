
module.exports = function(grunt) {

  grunt.initConfig({

    aws: grunt.file.readJSON('../../aws.json'),

    jshint: {
      all: ['gruntfile.js']
    },

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.ACCESS_KEY %>',
        secretAccessKey: '<%= aws.SECRET_KEY %>',
        region: '<%= aws.REGION %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      deploy: {
        options: {
          bucket: '<%= aws.BUCKET_NAME %>',
        },
        files: [
          {
            expand: true,
            cwd: '../../app/',
            src: ['**'],
            dest: '/'
          }
        ]
      }
    },

    mustache_render: {
      options: {
        // Task global options go here
      },
      business: {
        options: {
          // Target specific options go here
        },
        files: [
          {
            data: '../../data.json',
            template: 'templates/business/index.html',
            dest: '../../app/index.html'
          },
          {
            data: 'data.json',
            template: 'templates/business/index.css',
            dest: '../../app/index.css'
          }
        ]
      },
      musician: {
        options: {
          // Target specific options go here
        },
        files: [
          {
            data: '../../data.json',
            template: 'templates/musician/index.html',
            dest: '../../app/index.html'
          },
          {
            data: '../../data.json',
            template: 'templates/musician/index.css',
            dest: '../../app/index.css'
          }
        ]
      },

    },

    convert: {
      options: {
        explicitArray: false,
      },
      yml2json: {
        options: {
          xml: {
            header: true
          }
        },
        src: ['../../data.yml'],
        dest: '../../data.json'
      }
    },

    copy: {
      files: {
        expand: true,
        cwd: 'resources/',
        src: '**',
        dest: '../../app/resources/'
      }
    },

    clean: ['../../data.json'],

    prompt: {
      target: {
        options: {
          questions: [
            {
              config: 'chosen_template',
              type: 'list',
              message: 'Select a template to render:',
              choices:[
                {
                  value: 'musician',
                  name: 'musician'
                },
                {
                  value: 'business',
                  name: 'business'
                }
              ]
            }
          ],
          then: function(results, done){
            chosen_template = results.chosen_template;
          }
        }
      }
    }

  });

  var templates = ['musician', 'business'];
  var chosen_template = '';

  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('convertyaml', ['convert']);
  grunt.registerTask('copyresources', ['copy']);
  grunt.registerTask('deploy', ['aws_s3']);

  grunt.task.registerTask('list', 'List available templates', function(){
    grunt.log.writeln("Templates available: ");
    for(t of templates){
      grunt.log.writeln("   - " + t)
    }
  });

  grunt.task.registerTask('render', 'Parse config, populate templates, copy resources and deploy', function(){

      grunt.task.run('convertyaml');
      grunt.task.run('prompt')
      grunt.task.run('mustache_render:' + chosen_template);
      grunt.task.run('clean');
      grunt.task.run('copyresources');
      grunt.task.run('deploy');

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-clean');

};
