class Api::VideosController < ApplicationController
  def index
    if params[:channel_id]
      @channel = Channel.include_all
        .find(params[:id])
      @videos = @channel.videos.include_all
        .limit(params[:limit] || 20)
        .offset(params[:offset] || 0)
      render 'api/channels/index'
    end
  end

  def show
    @video = Video.include_all.find(params[:id])
    @channel = Channel.include_all.find(@video.channel_id)
    @comments = @video.comments
      .include_all
      .limit(params[:limit] || 20)
      .offset(params[:offset] || 0)

    render :show
  end

  def create
    @channel = Channel.include_all
                .find(params[:channel_id])
    if @channel && @channel.user_id == current_user.id
      @video = @channel.videos.new(video_params)
      if (params[:video][:thumbnail] && params[:video][:video]) &&
          (params[:video][:thumbnail] != "" && params[:video][:video] != "")
          if @video.save
            @video = Video.include_all.find_by(id: @video.id)
            render :show
          else
            render json: @video.errors.full_messages, status: 400
          end
      else
        @video.valid?
        errors = @video.errors.messages
        if !params[:video][:video] || params[:video][:video] != ""
          errors[:thumbnail] = ["must be uploaded"]
        end
        if !params[:video][:thumbnail] || params[:video][:thumbnail] != ""
          errors[:video] = ["must be uploaded"]
        end
        render json: errors, status: 422
      end
    elsif @channel
      render json: ["Can't upload to someone else's channel"], status: 422
    else
      render json: ["Can't find channel"], status: 422
    end
  end

  def update
    @video = current_user.videos.include_all.find_by(params[:id])
    if @video.present?
      @video.update(video_params)
      if (params[:video][:thumbnail] && params[:video][:video]) &&
          (params[:video][:thumbnail] != "" && params[:video][:video] != "")
          if @video.save
            @video = Video.include_all.find_by(id: @video.id)
            render :show
          else
            render json: @video.errors.full_messages, status: 400
          end
      else
        @video.valid?
        errors = @video.errors.messages
        if !params[:video][:video] || params[:video][:video] != ""
          errors[:thumbnail] = ["must be uploaded"]
        end
        if !params[:video][:thumbnail] || params[:video][:thumbnail] != ""
          errors[:video] = ["must be uploaded"]
        end
        render json: errors, status: 422
      end
    else
      render json: ['Could not find video'], status: 404
    end
  end

  def destroy
    @video = current_user.videos.find_by(params[:id])
    if @video
      render json: { channelId: @video.channel_id, videoId: @video.id }
    else
      render json: ['Could not find video'], status: 404
    end
  end

  def uplike
    @like = Like.new(user: current_user, likeable_type: 'Video', likeable_id: params[:id], positive: true)
    if @like.save
      render json: { user_id: current_user.id, videoId: params[:id], positive: true }
    else 
      render json: @like.errors
    end
  end

  def downlike
    @like = Like.new(user: current_user, likeable_type: 'Video', likeable_id: params[:id], positive: false)
    if @like.save
      render json: { user_id: current_user.id, videoId: params[:id], positive: false }
    else 
      render json: @like.errors
    end
  end

  def unlike
    @like = Like.find_by(user: current_user, likeable_type: 'Video', likeable_id: params[:id])
    if @like
      @like.destroy
    else
      render json: ['Could not find like'], status: 422
    end
  end

  def view
    @view = current_user.views.new(video_id: params[:id])
    if @view.save
      render json: { user_id: @view.user_id, video_id: @view.video_id }
    else
      render json: @view.errors, status: 400
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video, :thumbnail)
  end
end