module Ownable
  extend ActiveSupport::Concern

  included do
    has_many :playlists, 
      as: :ownable,
      dependent: :destroy
    has_many :videos_on_playlists,
      through: :playlists,
      source: :videos
  end

end