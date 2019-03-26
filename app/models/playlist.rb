# == Schema Information
#
# Table name: playlists
#
#  id           :bigint(8)        not null, primary key
#  title        :string           not null
#  description  :string
#  ownable_type :string           not null
#  ownable_id   :bigint(8)        not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Playlist < ApplicationRecord
  belongs_to :ownable, polymorphic: true
  
  has_many :playlist_videos
  has_many :videos,
    through: :playlist_videos,
    source: :video
end
