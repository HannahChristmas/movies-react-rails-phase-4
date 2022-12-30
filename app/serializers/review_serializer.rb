class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_content, :user_id, :movie_id
end
