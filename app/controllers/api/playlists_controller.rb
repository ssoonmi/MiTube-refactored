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
  
  def create
    if params[:channel_id] # channel playlist
      @channel = Channel.find_by(id: params[:channel_id])
      if @channel
        if current_user.id == @channel.id
          @playlist = current_user.playlists.create(playlist_params)
        else
          render json: ["Unauthorized"], status: 401
        end
      else
        render json: ["Could not find channel"], status: 404
      end
    else # user playlist
      @playlist = current_user.playlists.create(playlist_params)
    end

    if @playlist && @playlist.save
      render json: @playlist
    elsif @playlist
      render json: @playlist.errors.full_messages, status: 400
    end
  end

  def add_video
    if Playlist
        .videos
        .where("playlists.id = ?", params[:playlist_id])
        .where("videos.id = ?", params[:video_id])
        .present?
      render json: ["Playlist already contains video"], status: 400
    else
      @playlist_video = Playlist.playlist_videos.create(playlist_videos_params)
      if @playlist_video.save
        render json: {video_id: params[:video_id], playlist_id: params[:playlist_id]}
      else
        render json: ["Unable to save video to playlist"], status: 400
      end
    end
  end

  def delete_video
    @playlist_video = Playlist
        .videos
        .where("playlists.id = ?", params[:playlist_id])
        .where("videos.id = ?", params[:video_id])
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