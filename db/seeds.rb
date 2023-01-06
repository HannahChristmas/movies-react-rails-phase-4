# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🍿 Seeding movies..."

movie1 = Movie.create(title: 'The Lion King', genre: 'Musical', year: 1994, director: 'Rob Minkoff', image_url: 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/612YWU3cO1L._AC_SY879_.jpg')
movie2 = Movie.create(title: 'Elf', genre: 'Christmas', year: 2003, director: 'Jon Favreau', image_url: 'https://cdnprod.christiancinema.com/images/products/9286_255w_360h.jpg')
movie3 = Movie.create(title: 'Licorice Pizza', genre: 'Comedy', year: 2021, director: 'Paul Thomas Anderson', image_url: 'https://m.media-amazon.com/images/M/MV5BYWViNjVhZjItZTMzNi00MTI2LWExZTItZTNhMmM1MDdjOTliXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg')

puts "✅ Done seeding!"

# Profile Picture: https://img.freepik.com/free-vector/fast-food-sticker-design-with-hot-dog-isolated_1308-67129.jpg?w=360