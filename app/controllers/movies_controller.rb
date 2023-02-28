class MoviesController < ApplicationController

    def index 
        movies = Movie.all
        render json: movies 
    end

    def show 
        movie = Movie.find_by(id: params[:id])
        render json: movie
    end

    def create 
        movie = Movie.create!(movie_params)
        render json: movie, status: :created
    end

    def update 
        movie = Movie.find(params[:id])
        movie.update!(movie_params)
        render json: movie, status: 202
    end

    def destroy 
        movie = Movie.find(params[:id])
        movie.destroy 
        head :no_content
    end

    def grab 

        # grab all of the movies where review.review_content starts with the letter from params

        # select through movies mov
        movies = Movie.all

        grabbedMovies = movies.filter{|mov| mov.reviews.filter{|rev| rev.review_content.downcase.start_with?(params[:letter].downcase)}.length > 0}

        #start with one movie

        # movie = Movie.first 
        # movie.reviews.filter{|rev| rev.review_content.downcase.start_with?(params[:letter].downcase)}
        
        #starts with 

        # not case sensitive

        render json: grabbedMovies
    end

    private 

    def movie_params
        params.permit(:title, :genre, :year, :director, :image_url)
    end

end
