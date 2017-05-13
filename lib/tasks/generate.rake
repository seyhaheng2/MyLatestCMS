require 'rubygems'
require 'sitemap_generator'
namespace :generate do
  desc "TODO"
  task sitemap: :environment do
    Sitemap.new.generate
  end
end
