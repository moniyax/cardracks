class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception, unless: -> { request.format.json? }

    before_action :get_current_user
    attr_accessor :current_user
  
    def get_current_user
      if u = token_auth
        @current_user = u
      else
        render json: {error: 'unathorized request'}, status: :unauthorized
      end
    end
  
    def token_auth
      authenticate_with_http_token do |token, options|
        User.find_by(token: token)
      end
    end


    def fallback_index_html
        render :file => 'public/index.html'
    end
  end
  