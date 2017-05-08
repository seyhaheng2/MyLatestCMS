class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    if params[:tag]
      @posts = Post.tagged_with(params[:tag])
    else
      @slides = Post.of_slide.limit(4).order("created_at desc")
      @recent = Post.of_post.limit(7).order("created_at desc")
      @posts = Post.of_post.order(:created_at).page(params[:page])
      # @trending = Post.of_trending.order("created_at desc").last(1)
      @slide_left_top = Post.of_slide_left_top.limit(1).order("created_at desc")
      @slide_left_bot = Post.of_slide_left_bottom.limit(1).order("created_at desc")
      @slide_right_top = Post.of_slide_right_top.limit(1).order("created_at desc")
      @slide_right_bot = Post.of_slide_right_bottom.limit(1).order("created_at desc")
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show

    if request.path != post_path(@post)
      return redirect_to @post, :status => :moved_permanently
    end
    @meta_title = @post.title
    @meta_description = @post.content

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
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :image, :content, :format, :summary, :keywords, :color, :subcategory_id, :user_id, :via_url, :via_name, :source_url)
    end
end
