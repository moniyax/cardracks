class SessionsController < ApplicationController
  skip_before_action :get_current_user, only: [:create, :destroy]

  def create
    l = Login.create params[:email], params[:password]
    unless l.valid?
      render json: {error: l.error_msg}, status: :unprocessable_entity
      return
    end

    if u = User.find_by(email: params[:email])
      if user = u.authenticate(params[:password])
        render json: user.attributes.slice('name', 'id', 'token')
      else
        render json: {}, status: :unauthorized
      end
    else
      render json: {error: 'Email or password is wrong'}, status: :unauthorized
    end
  end

  def destroy
  end

end
