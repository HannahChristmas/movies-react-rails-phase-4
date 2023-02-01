class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :year, :director, :image_url, :movies_with_reviews

  #object stands for self 

  def movies_with_reviews
    object.reviews.map { |review|
      {review_id: review.id,
      review_content: review.review_content,
      username: review.user.username,
      user_id: review.user.id
      }
    }
  end

end
