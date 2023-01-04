class Review < ApplicationRecord
    belongs_to :user
    belongs_to :movie

    validates :user_id, uniqueness: { scope: :movie_id, message: "Limited 1 review per movie" }
    #   validates :review, presence: true

end
