class Post < ApplicationRecord
  belongs_to :subcategory
  belongs_to :user

  is_impressionable
  acts_as_taggable
  include PgSearch
	pg_search_scope :search, against: [:name, :description],
				  using: {tsearch: {dictionary: "english"}}

  def self.text_search(query)
  	if query.present?
  		search(query)
  	end
  end

  has_attached_file :image, :styles => { :medium => "620x349!", :thumbnail => "385x216!", :small => "112x63!" },
                    :url  => "/assets/images/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/images/:id/:style/:basename.:extension"

  validates_presence_of :image, :title, :content, :user, :subcategory, :format
  validates_attachment_presence :image
  validates_attachment_size :image, :less_than => 5.megabytes
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  extend FriendlyId

  friendly_id :title, use: [:slugged, :history, :finders]

  def should_generate_new_friendly_id?
    title_changed?
  end

 scope :of_post, lambda{
   where("format = 'Post'")
 }
 scope :of_slide, lambda{
   where("format = 'Slide'")
 }
 scope :of_trending, lambda{
   where("format = 'Trending'")
 }
 scope :of_slide_left_top, lambda{
   where("format = 'slide_left_top'")
 }
 scope :of_slide_left_bottom, lambda{
   where("format = 'slide_left_bot'")
 }
 scope :of_slide_right_top, lambda{
   where("format = 'slide_right_top'")
 }
 scope :of_slide_right_bottom, lambda{
   where("format = 'slide_right_bot'")
 }

 scope :in_sub, lambda{ |sub_id|
  where("subcategory_id = ?", sub_id)
 }


 def previous
   @post = Post.where(["id < ?", id]).order(:id).last
 end

 def next
   @post = Post.where(["id > ?", id]).order(:id).first
 end
end
