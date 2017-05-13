require 'sitemap_generator'
class Sitemap

  def generate
    SitemapGenerator::Sitemap.default_host = ENV['URL']
    SitemapGenerator::Sitemap.create do
      Category.all.each do |subcategory|
        add subcategory_posts_path(subcategory)
        subcategory.posts.each do |post|
          add subcategory_post_path(subcategory, post)
        end
      end
    end
    SitemapGenerator::Sitemap.ping_search_engines
  end


end
