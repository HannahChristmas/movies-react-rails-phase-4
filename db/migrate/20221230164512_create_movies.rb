class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :genre
      t.integer :year
      t.string :director
      t.string :image_url

      t.timestamps
    end
  end
end
