class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :posts
  extend FriendlyId

  friendly_id :name, use: [:slugged, :history, :finders]

  def should_generate_new_friendly_id?
    name_changed?
  end
end
