channelVideoIds = Hash.new { |h, k| h[k] = [] }

if @videos.present?
  json.videos do
    @videos.each do |video|
      json.set! video.id do
        json.partial! 'api/videos/video', video: video
      end
      channelVideoIds[video.channel_id].push(video.id)
    end
  end
end

json.channels do
  json.array! @channels.each do |channel|
    json.partial! 'api/channels/channel', channel: channel
    json.videoIds channelVideoIds[channel.id]
  end
end

