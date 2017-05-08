json.extract! post, :id, :title, :image, :content, :format, :summary, :keywords, :color, :subcategory_id, :user_id, :via_url, :via_name, :source_url, :created_at, :updated_at
json.url post_url(post, format: :json)
