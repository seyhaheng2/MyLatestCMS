class CreateSubcategories < ActiveRecord::Migration[5.0]
  def change
    create_table :subcategories do |t|
      t.string :name
      t.integer :position, default: 0
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
