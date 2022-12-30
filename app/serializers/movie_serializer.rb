class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :year, :director, :image_url
end
