class Api::ChannelsController < ApplicationController
  def index
    if params[:user_id]
      @channels = Channel
        .include_all
        .where('channels.user_id = ?', params[:user_id])
    else
      @channels = Channel.include_all
        .limit(params[:limit] || 20)
        .offset(params[:offset] || 0)
      @videos = Video.include_all
        .limit_by_channel_ids(@channels.ids, 6)
    end
    render :index
  end

  def show
    # @channel = Channel.with_attached_icon.with_attached_splash
    #               .find(params[:id])
    @channel = Channel.include_all
                  .find(params[:id])
    if @channel
      @videos = @channel.videos
        .include_all
        .limit(params[:limit] || 20)
        .offset(params[:offset] || 0)
      # @videos = @channel.videos.with_attached_video.with_attached_thumbnail
      render :show
    else 
      render json: ['Could not find channel'], status: 404
    end
  end

  def create
    @channel = current_user.channels.new(channel_params)
    splash = params[:channel][:splash]
    icon = params[:channel][:icon]
    @channel.splash.attach(splash) if splash && splash != ''
    @channel.icon.attach(icon) if icon && icon != ''
    if @channel.save
      @channel = Channel.include_all.find_by(id: @channel.id)
      render :show
    else
      render json: @channel.errors, status: 400
    end
  end

  def update
    @channel = current_user.channels.include_all.find(params[:id])
    if @channel
      @channel.update(channel_params)
      splash = params[:channel][:splash]
      icon = params[:channel][:icon]
      @channel.splash.attach(splash) if splash && splash != ''
      @channel.icon.attach(icon) if icon && icon != ''
      if @channel.save
        render json: @channel
      else
        render json: @channel.errors, status: 400
      end
    else
      render json: ['Could not find channel'], status: 404
    end
  end

  def destroy
    @channel = current_user.channels.find(params[:id])
    if @channel && @channel.destroy
      render json: { id: @channel.id }
    else
      render json: ['Unsuccessful attempt'], status: 400
    end
  end

  def subscribe
    @subscription = current_user.subscriptions.new(channel_id: params[:id])
    if @subscription.save
      render json: { channelId: @subscription.channel_id }
    else
      render json: @subscription.errors.full_messages, status: 400
    end
  end

  def unsubscribe
    @subscription = current_user.subscriptions.find_by(channel_id: params[:id])
    if @subscription.destroy
      render json: { channelId: @subscription.channel_id }
    else
      render json: @subscription.errors.full_messages, status: 400
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description)
  end
end