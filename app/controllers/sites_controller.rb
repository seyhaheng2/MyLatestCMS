class SitesController < InheritedResources::Base

  private

    def site_params
      params.require(:site).permit(:name, :facebook, :twitter, :google, :ads1, :ads2, :ads3, :ads4)
    end
end

