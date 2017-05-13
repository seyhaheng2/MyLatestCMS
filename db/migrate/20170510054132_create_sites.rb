class CreateSites < ActiveRecord::Migration[5.0]
  def change
    create_table :sites do |t|
      t.string :name
      t.string :facebook
      t.string :twitter
      t.string :google
      t.text :ads1
      t.text :ads2
      t.text :ads3
      t.text :ads4

      t.timestamps
    end
  end
end
