class PageController < ApplicationController
  def privacy
    @sites = Site.last(1)
  end

  def contact
  end

  def dmca
    @sites = Site.last(1)
  end

  def about
    @sites = Site.last(1)
  end
end
