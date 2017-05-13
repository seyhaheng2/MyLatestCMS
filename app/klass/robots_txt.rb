class RobotsTxt
  def self.call(env)
    response = Rack::Response.new
    response['Content-Type'] = 'text/plain'
    response['Cache-Control'] = 'public, max-age=31557600'

    # if !Rails.env.production?
    #   response.write "User-agent: *\nDisallow: /"
    # else
    response.write "User-agent: *\nDisallow:\nSitemap: #{ENV['URL']}/sitemap.xml.gz"
    # end

    response.finish
  end
end
