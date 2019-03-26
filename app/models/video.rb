# == Schema Information
#
# Table name: videos
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  description :text
#  channel_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Video < ApplicationRecord
  include Likeable

  validates :title, presence: true

  belongs_to :channel
  has_one :user,
    through: :channel,
    source: :user

  has_many :views,
    dependent: :destroy
  has_many :comments,
    dependent: :destroy
  
  has_one_attached :video
  has_one_attached :thumbnail

  has_many :playlist_videos
  has_many :playlists,
    through: :playlist_videos,
    source: :playlist

  def top_level_comments
    Comment.top_level_comments(self)
  end

  def self.limit_by_channel_ids(ids, limit=6)
    # videoIds = Video.find_by_sql(<<-SQL)
    #   select v.id
    #   from
    #       videos v
    #       inner join (
    #           select
    #               row_number() over (partition by channel_id order by id) rn,
    #               id
    #           from videos
    #           where videos.channel_id IN (#{ids.join(', ')})
    #       ) channels on channels.id = v.id
    #   where rn <= #{limit}
    # SQL

    joins(
      %{
        INNER JOIN (
        SELECT
            ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY id) rn, id
        FROM videos v
        WHERE v.channel_id IN (#{ids.join(', ')})
        ) channels on channels.id = videos.id
      }
    ).where("rn <= #{limit}")
  end

  def self.include_num_views
    # WHERE inner_views.video_id IN (#{ids.join(', ')})
    joins(
    %{
      LEFT OUTER JOIN (
        SELECT inner_views.video_id, COUNT(*) num_views
        FROM   views inner_views
        GROUP BY inner_views.video_id
      ) views ON views.video_id = videos.id
    }
    ).select("videos.*, COALESCE(views.num_views, 0) AS num_views")
  end

  def self.include_all
    includes(video_attachment: :blob, thumbnail_attachment: :blob)
      .include_num_views
      .include_like_counts
      .include_dislike_counts
  end
end
