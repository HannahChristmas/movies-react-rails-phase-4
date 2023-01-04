class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url
  
  has_many :movies
  has_many :reviews
end
