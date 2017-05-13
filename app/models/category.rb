class Category < ApplicationRecord
  has_many :subcategories

  extend FriendlyId

  friendly_id :name, use: [:slugged, :history, :finders]

  def should_generate_new_friendly_id?
    name_changed?
  end
end
