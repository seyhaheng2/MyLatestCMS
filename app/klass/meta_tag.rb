class MetaTag
  def initialize(options={})
    @site_name = 'Phumithai'
    @category  = options[:category]
    @movie     = options[:movie]
    @host       = options[:host]
    @hash      = {}
  end

  def hash_options
    set_site_name
    set_title
    set_og_image if movie.present?
    hash
  end

  private
  def set_site_name
    @hash[:site] = site_name
  end

  def set_title
    @hash[:title] = category.name if category.present?
    @hash[:title] = movie.name if movie.present?
  end

  def set_og_image
    @hash[:og] = {
      image: {
        _: "http://#{host}#{movie.picture.fbthumb.url}",
        width: 1200,
        height: 630
      }
    }
  end

  attr_accessor :site_name, :hash, :category, :movie, :host
end