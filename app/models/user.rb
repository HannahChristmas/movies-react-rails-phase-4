class User < ApplicationRecord
    has_secure_password

    has_many :reviews 
    has_many :movies, through: :reviews 

    validates :username, presence: true, uniqueness: true
    # validates :avatar_url, presence: true
end
