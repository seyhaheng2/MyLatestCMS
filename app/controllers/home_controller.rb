class HomeController < ApplicationController
  def index
  end
  def generate_sitemap
    Sitemap.new.generate
    redirect_to root_path
  end
end
