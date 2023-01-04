class MoviesController < ApplicationController

    def index 
        movies = Movie.all
        render json: movies 
    end

    def show 
        movie = Movie.find(params[:id])
        render json: movie
    end

    def create 
        movie = @current_user.movies.create!(movie_params)
        render json: movie, status: :created
    end

    def update 
        movie = Movie.find(params[:id])
        movie.update!(movie_params)
        render json: movie, status: 202
    end

    private 

    def movie_params
        params.permit(:title, :genre, :year, :director, :image_url)
    end

end
