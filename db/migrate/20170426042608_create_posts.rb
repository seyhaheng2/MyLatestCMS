class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :image
      t.text :content
      t.string :format
      t.text :summary
      t.string :keywords
      t.string :color
      t.references :subcategory, foreign_key: true
      t.references :user, foreign_key: true
      t.string :via_url
      t.string :via_name
      t.string :source_url

      t.timestamps
    end
  end
end
