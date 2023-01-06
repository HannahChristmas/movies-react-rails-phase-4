class ReviewsController < ApplicationController

    def index 
        # First ask if this dynamic param is present 
        # Find nested routes lab!!!! 
        reviews = @current_user.reviews 
        render json: reviews, status: 200
    end

    def show 
        review = @current_user.reviews.find(params[:id])
        render json: review
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
        review = @current_user.reviews.find(params[:id])
        review.destroy 
        head :no_content
    end

    def my_reviews
        reviews = @current_user.reviews 
        render json: reviews
    end

    def my_single_review
        review = @current_user.reviews.find(params[:id]) 
        render json: review
    end

    # def delete_my_single_review
    #     review = @current_user.reviews.find(params[:id]) 
    #     render json: review
    # end

    private 

    def review_params 
        params.permit(:review_content, :user_id, :movie_id)
    end

end

# class ReviewsController < ApplicationController

#     def index 
#         # First ask if this dynamic param is present 
#         # Find nested routes lab!!!! 
#         reviews = @current_user.reviews 
#         render json: reviews, status: 200
#     end

#     def show 
#         review = @current_user.reviews.find(params[:id])
#         render json: review
#     end

#     def create 
#         review = @current_user.reviews.create!(review_params)
#         render json: review.movie, status: 201
#     end

#     def update 
#         review = @current_user.reviews.find(params[:id])
#         review.update!(review_params)
#         render json: review, status: 202
#     end
    
#     def destroy 
#         review = @current_user.reviews.find(params[:id])
#         review.destroy 
#         head :no_content
#     end

#     def my_reviews
#         reviews = @current_user.reviews 
#         render json: reviews
#     end

#     def my_single_review
#         review = @current_user.reviews.find(params[:id]) 
#         render json: review
#     end

#     private 

#     def review_params 
#         params.permit(:review_content, :user_id, :movie_id)
#     end

# end

