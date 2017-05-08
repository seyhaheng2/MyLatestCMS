class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :checking
  def checking
    @categories = Category.limit(4).where(position: [0..4]).order(:position)
    @more_categories = Category.find(5)
  end
end
