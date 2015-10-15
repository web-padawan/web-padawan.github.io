# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Location of the theme's resources.
css_dir = "assets/css"
sass_dir = "sass"
images_dir = "assets/images"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "assets/js"
fonts_dir = "assets/fonts"

# Require any additional compass plugins installed on your system.
require 'toolkit'
require 'breakpoint'
require 'susy'
require 'sass-globbing'
add_import_path "bower_components/normalize-scss"

# Select output style (:expanded, :nested, :compact, :compressed).
output_style = (environment == :production) ? :compressed : :expanded

# Enable relative paths to assets via compass helper functions.
relative_assets = true

# Disable output line comments in CSS.
line_comments = false
