class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.include_all.where(video_id: params[:video_id])
    p @comments
    render :index
  end

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.video_id = params[:video_id]
    if @comment.save
      @comment = Comment.include_all.find_by(id: @comment.id)
      render :show
    else
      render json: @comment.errors, status: 400
    end
  end

  def update
    @comment = current_user.comments.include_all.find_by(id: params[:id])
    if @comment.present?
      @comment.update(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors, status: 400
      end
    else 
      render json: ['Could not find comment'], status: 404
    end
  end

  def destroy
    @comment = current_users.comments.find_by(id: params[:id])
    if @comment.destroy
      render json: {id: @comment.id}
    else
      render json: @comment.errors, status: 400
    end
  end

  def uplike
    @like = Like.new(user: current_user, likeable_type: 'Comment', likeable_id: params[:id], positive: true)
    if @like.save
      render json: { userId: current_user.id, commentId: params[:id], positive: true }
    else 
      render json: @like.errors
    end
  end

  def downlike
    @like = Like.new(user: current_user, likeable_type: 'Comment', likeable_id: params[:id], positive: false)
    if @like.save
      render json: { userId: current_user.id, commentId: params[:id], positive: false }
    else 
      render json: @like.errors
    end
  end

  def unlike
    @like = current_user.likes.find_by(likeable_type: 'Comment', likeable_id: params[:id])
    if @like
      @like.destroy
    else
      render json: ['Could not find like'], status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :parent_comment_id)
  end
end