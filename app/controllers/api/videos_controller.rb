class Api::VideosController < ApplicationController
  def show
    @video = Video.include_all.find(params[:id])
    @channel = Channel.include_all.find(@video.channel_id)
    @comments = @video.comments.include_all

    render :show
  end

  def create
    @channel = Channel.include_all
                .find(params[:channel_id])
    if @channel && @channel.user_id == current_user.id
      if (params[:video][:thumbnail] && params[:video][:video]) &&
          (params[:video][:thumbnail] != "" && params[:video][:video] != "")
          @video = @channel.videos.new(video_params)
          if @video.save
            @video.include_all
            render :show
          else
            render json: @video.errors.full_messages, status: 400
          end
      else
        render json: ["Need thumbnail and video file"], status: 422
      end
    elsif @channel
      render json: ["Can't upload to someone else's channel"], status: 422
    else
      render json: ["Can't find channel"], status: 422
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video, :thumbnail)
  end
end