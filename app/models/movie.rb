class Movie < ApplicationRecord
    has_many :reviews, dependent: :destroy 
    has_many :users, through: :reviews

    validates :title, uniqueness: true, presence: true 
    validates :genre, presence: true 
    validates :year, presence: true, numericality: { greater_than_or_equal_to: 1895, less_than_or_equal_to: Date.today.year }
    validates :director, presence: true
    validates :image_url, presence: true
end
