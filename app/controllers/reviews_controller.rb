class ReviewsController < ApplicationController

    def index 
        reviews = @current_user.reviews.all 
        render json: reviews, status: 200
    end

    def create 
        review = @current_user.reviews.create!(review_params)
        render json: review.movie, status: 201
    end

    def update 
        review = @current_user.reviews.find(params[:id])
        review.update!(review_params)
        render json: review, status: 202
    end
    
    def destroy 
        review = @current.user.reviews.find(params[:id])
        review.destroy 
        head :no_content
    end

    private 

    def review_params 
        params.permit(:review_content, :user_id, :movie_id)
    end

end
