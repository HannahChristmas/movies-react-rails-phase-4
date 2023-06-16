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
movie4 = Movie.create(title: 'Edward Scissorhands', genre: 'Romance', year: 1990, director: 'Tim Burton', image_url: 'https://cdn.shopify.com/s/files/1/0693/4223/products/EdwardScissorhands_Coverweb_1800x1800.jpg?v=1607628890')
movie5 = Movie.create(title: 'Holes', genre: 'Teen', year: 2003, director: 'Andrew Davis', image_url: 'https://lumiere-a.akamaihd.net/v1/images/p_holes_19755_8f3e1618.jpeg')
movie6 = Movie.create(title: 'Moulin Rouge', genre: 'Musical', year: 2001, director: 'Baz Luhrmann', image_url: 'https://m.media-amazon.com/images/M/MV5BMWFhYjliNjYtYjNhNS00OGExLWFhMjQtNDgwOWYyNWJiYzhmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg')
movie7 = Movie.create(title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, director: 'Frank Darabont', image_url: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg')
movie8 = Movie.create(title: 'Titanic', genre: 'Romance', year: 1997, director: 'James Cameron', image_url: 'https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png')
movie9 = Movie.create(title: 'The Godfather', genre: 'Crime', year: 1972, director: 'Francis Ford Coppola', image_url: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg')
movie10 = Movie.create(title: 'Pulp Fiction', genre: 'Crime', year: 1994, director: 'Quentin Tarantino', image_url: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg')
movie11 = Movie.create(title: 'Jaws', genre: 'Thriller', year: 1975, director: 'Steven Spielberg', image_url: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg')
movie12 = Movie.create(title: 'Back to the Future', genre: 'Sci-fi', year: 1985, director: 'Robert Zemeckis', image_url: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg')
movie13 = Movie.create(title: 'Forrest Gump', genre: 'Drama', year: 1994, director: 'Robert Zemeckis', image_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/220px-Forrest_Gump_poster.jpg')
movie14 = Movie.create(title: 'Love Actually', genre: 'Romance', year: 2003, director: 'Richard Curtis', image_url: 'https://m.media-amazon.com/images/M/MV5BNThkNjgxNGQtOTIxMy00ZTFmLWIwMDItYzE5YzM3ZDMzNDE3XkEyXkFqcGdeQXVyMTUyNjc3NDQ4._V1_QL75_UY281_CR4,0,190,281_.jpg')
movie15 = Movie.create(title: 'Dirty Dancing', genre: 'Romance', year: 1987, director: 'Emile Ardolino', image_url: 'https://m.media-amazon.com/images/M/MV5BMTc3MDY3ODQ2OV5BMl5BanBnXkFtZTgwOTQ2NTYxMTE@._V1_FMjpg_UX1000_.jpg')

puts "✅ Done seeding!"

# Profile Picture: https://img.freepik.com/free-vector/fast-food-sticker-design-with-hot-dog-isolated_1308-67129.jpg?w=360