class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :avatar_url
end
