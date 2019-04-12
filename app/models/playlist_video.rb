# == Schema Information
#
# Table name: playlist_videos
#
#  id          :bigint(8)        not null, primary key
#  video_id    :integer          not null
#  playlist_id :integer          not null
#

class PlaylistVideo < ApplicationRecord
  validates :playlist_id, uniqueness: { scope: :video_id }

  belongs_to :playlist
  belongs_to :video
end
