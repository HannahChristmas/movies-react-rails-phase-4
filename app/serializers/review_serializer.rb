class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_content, :user_id, :movie_id
  
  belongs_to :user
  belongs_to :movie
end
