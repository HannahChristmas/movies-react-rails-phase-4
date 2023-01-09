class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :year, :director, :image_url, :movies_with_reviews

  #object stands for self 

  def movies_with_reviews
    # byebug
    object.reviews.map { |review|
      {review_id: review.id,
      review_content: review.review_content,
      username: review.user.username,
      user_id: review.user.id
      }
    }
  end

  

  #this needs to stay commented out
  # has_many :reviews




  # has_many :users, through: :reviews

  # create a custom method for serializer

  # movie_reviews- return array with review content and username
end
