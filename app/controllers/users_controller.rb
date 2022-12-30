class UsersController < ApplicationController
    skip_before_action :authorize, only: :create 

    def index 
        users = User.all
        render json: users
    end

    def show 
        user = User.find(params[:id])
        render json: user
    end

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: 201
    end

    private 

    def user_params 
        params.permit(:username, :password, :password_confirmation, :avatar_url)
    end

end
