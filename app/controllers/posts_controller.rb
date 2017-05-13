class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  impressionist :actions=>[:show]
  caches_page :index, :show
  self.page_cache_directory = :domain_cache_directory

  def index

  	search = params[:query]
    if search.present?
      @posts = Post.order("created_at DESC")
        .text_search(search)
        .paginate(:page => params[:page], :per_page => 7)
    else
      if params[:tag]
        @posts = Post.tagged_with(params[:tag])
          .order("created_at DESC")
          .paginate(:page => params[:page], :per_page => 7)
      else
        sub_id = params[:sub_id]
        if sub_id
          @posts = Post.in_sub(sub_id)
            .order("created_at DESC")
            .paginate(:page => params[:page], :per_page => 5)
        else
          @subcategories = Subcategory.all
          @slides = Post.of_slide.limit(4).order("created_at desc")
          @recent = Post.of_post.limit(7).order("created_at desc")
          @posts = Post.of_post.order(:created_at).paginate(page: params[:page], per_page: 5 )
          @trendings = Post.of_trending.order("created_at desc")
          @slide_left_top = Post.of_slide_left_top.limit(1).order("created_at desc")
          @slide_left_bot = Post.of_slide_left_bottom.limit(1).order("created_at desc")
          @slide_right_top = Post.of_slide_right_top.limit(1).order("created_at desc")
          @slide_right_bot = Post.of_slide_right_bottom.limit(1).order("created_at desc")
        end
      end
    end

    # if params[:tag]
    #   @posts = Post.tagged_with(params[:tag]).paginate(page: params[:page], per_page: 7 )
    #   @slides = Post.of_slide.limit(4).order("created_at desc")
    #   @recent = Post.of_post.limit(7).order("created_at desc")
    #   # @posts = Post.of_post.order(:created_at).paginate(page: params[:page], per_page: 5 )
    #   @trendings = Post.of_trending.order("created_at desc")
    #   @slide_left_top = Post.of_slide_left_top.limit(1).order("created_at desc")
    #   @slide_left_bot = Post.of_slide_left_bottom.limit(1).order("created_at desc")
    #   @slide_right_top = Post.of_slide_right_top.limit(1).order("created_at desc")
    #   @slide_right_bot = Post.of_slide_right_bottom.limit(1).order("created_at desc")
    # else
    #
    # end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    # set_meta_tags MetaTag.new({host: request.host, movie: @movie}).hash_options
    impressionist(@post, nil, { unique: [:session_hash] })
    @post.impressionist_count(:filter => :params)

    set_meta_tags title: @post.title,
                  site: 'Cat Blog',
                  description: @post.summary,
                  keywords: @post.keywords,
                  og: {
                    title:'Cat Blog',
                    description: @post.summary,
                    type: 'website',
                    url: post_url(@post)
                  }



  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    def domain_cache_directory
      Rails.root.join("public", request.domain)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :image, :content, :format, :summary, :keywords, :color, :subcategory_id, :user_id, :via_url, :via_name, :source_url, :tag_list)
    end
end
