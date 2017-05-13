class AddColumnsToSubcategory < ActiveRecord::Migration[5.0]
  def change
    add_column :subcategories, :slug, :string
    add_index :subcategories, :slug, unique: true
  end
end
