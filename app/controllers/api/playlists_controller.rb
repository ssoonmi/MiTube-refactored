class Api::PlaylistsController < ApplicationController
  before_action :ensure_logged_in
  
  def index
    if params[:channel_id]
      @channel = Channel.find_by(id: params[:channel_id])
      @playlists = @channel.playlists.include_all
      render :index
    else
      @playlists = current_user.playlists.include_all
      render :index
    end
  end

  def show
    @playlist = Playlist.include_all.find_by(id: params[:id])
    if @playlist.present? 
      render :show
    else
      render json: ['Could not find playlist'], status: 404
    end
  end
  
  def create
    if params[:channel_id] # channel playlist
      @channel = Channel.find_by(id: params[:channel_id])
      if @channel
        if current_user.id == @channel.id
          @playlist = current_user.playlists.new(playlist_params)
        else
          render json: ["Unauthorized"], status: 401
        end
      else
        render json: ["Could not find channel"], status: 404
      end
    else # user playlist
      @playlist = current_user.playlists.new(playlist_params)
    end

    if @playlist && @playlist.save
      render json: @playlist
    elsif @playlist
      render json: @playlist.errors, status: 400
    end
  end

  def update
    @playlist = Playlist.find_by(id: params[:id])
    if @playlist.present?
      if (@playlist.ownable_type == 'Channel' && 
        current_user.channels.find_by(id: @playlist.ownable_id).present?) ||
        (@playlist.ownable_type == 'User' && 
        @playlist.ownable_id == current_user.id)
          @playlist.update(playlist_params)
          if @playlist.save
            render json: @playlist
          else
            render json: @playlist.errors, status: 400
          end
      else 
        render json: ['Not authorized to update playlist'], status: 422
      end
    else
      render json: ['Could not find playlist'], status: 404
    end
  end

  def add
    @playlist_video = PlaylistVideo.new(playlist_videos_params)
    if @playlist_video.save
      render json: {video_id: params[:video_id], playlist_id: params[:playlist_id]}
    else
      render json: ["Unable to save video to playlist"], status: 400
    end
  end

  def delete
    @playlist_video = PlaylistVideo.find_by(playlist_video_params)
    if @playlist_video.present?
      if @playlist_video.destroy
        render json: {video_id: params[:video_id], playlist_id: params[:playlist_id]}
      else
        render json: ["Unable to save video to playlist"], status: 400
      end
    else
      render json: ["Playlist does not have video"], status: 404
    end
  end

  private

  def playlist_videos_params
    params.permit(:playlist_id, :video_id)
  end

  def playlist_params
    params.require(:playlist).permit(:title, :description)
  end

end