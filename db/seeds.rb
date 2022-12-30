# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🍿 Seeding movies..."

movie1 = Movie.create(title: 'The Lion King', genre: 'Musical', year: 1994, director: 'Rob Minkoff', image_url: 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/612YWU3cO1L._AC_SY879_.jpg')

puts "🍿 Seeding users..."

user1 = User.create(username: 'HannahChrissy', password_digest: "I don't know", avatar_url: "https://t4.ftcdn.net/jpg/02/65/00/69/240_F_265006936_2dlz2VtcqZZUbco1VnDpU2diyd8OagFS.jpg")

puts "✅ Done seeding!"