# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "cardracks_api"
# set :repo_url, "git@bitbucket.org/moniyax/redux-todo-api.git"
set :repo_url, "git@bitbucket.org:moniyax/cardracks_api.git"
set :user, "deploy"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :deploy_via, :remote_cache
append :linked_files, ".rbenv-vars"

# append :linked_files, "config/database.yml", "config/secrets.yml"

append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
set :rbenv_ruby, File.read('.ruby-version').strip
