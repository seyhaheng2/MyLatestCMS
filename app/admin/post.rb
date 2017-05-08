ActiveAdmin.register Post do

  permit_params :title, :image, :content, :user_id, :subcategory_id, :published_at, :format, :source, :url_source, :via, :url_via

  filter :title, as: :string
  # filter :format_post, :as => :select
  filter :subcategory
  filter :user

  index do
    selectable_column
    column :title
    column :image do |img|
      image_tag img.image,size: "150x100"
    end
    column :content do |desc|
      truncate(desc.content.html_safe,length: 100)
    end
    column :subcategory do |cate|
       cate.subcategory.name
    end
    column :user_id do |u|
       u.user.username
    end
    # column :format
    actions
  end

  form do |f|
    inputs "New Post" do
      f.input :title
      f.input :image, as: :file, hint: f.object.image.present? \
        ? f.template.image_tag(f.object.image)
        : f.template.content_tag(:span, "no cover page yet")
      input :content, as: :ckeditor, :class => 'ckeditor'
      input :user
      input :subcategory
      f.input :format, as: :select, :collection => [["Post"],["Slide"],["Trending"],["slide_left_top"],["slide_left_bot"],["slide_right_top"],["slide_right_bot"]]
      input :tag_list
      # input :source
      # input :url_source
      # input :via
      # input :url_via
    end
    f.actions
  end
  show do |t|
    attributes_table do
      row :title
      row :image do
        post.image? ? image_tag(post.image.url, height: '100') : content_tag(:span, "No Photo yet")
      end
      row :format
      row :user
      row :subcategory
      row :content do |post|
        raw(post.content)
      end
    end
  end

  action_item only: :show do
    link_to('New Post', new_resource_path)
  end

end
