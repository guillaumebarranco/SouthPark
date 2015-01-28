module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ['js/main.js'],
		},

		uglify: {
			my_target: {
				files: {
					'js/dest/min.js': ['js/main.js']
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'css/dest/min.css': ['css/normalize.css', 'css/idangerous.swiper.css', 'css/main.css']
				}
			}
		},
		imagemin: {
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'img/',                   // Src matches are relative to this path
					src: ['*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'img/min/'                  // Destination path prefix
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'imagemin']);
}