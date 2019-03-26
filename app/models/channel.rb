# == Schema Information
#
# Table name: channels
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord
  include Ownable

  validates :name, presence: true

  belongs_to :user

  has_many :subscriptions,
    dependent: :destroy
  has_many :subscribers,
    through: :subscriptions,
    source: :user
  has_many :videos,
    dependent: :destroy
  
  has_one_attached :splash
  has_one_attached :icon

  def self.include_subscriber_counts
    joins(
     %{
       LEFT OUTER JOIN (
         SELECT sub_count.channel_id, COUNT(*) subscriber_count
         FROM   subscriptions sub_count
         GROUP BY sub_count.channel_id
       ) sub_counts ON sub_counts.channel_id = channels.id
     }
    ).select("channels.*, COALESCE(sub_counts.subscriber_count, 0) AS subscriber_count")
  end

  def self.include_num_views
    joins(
    %{
      LEFT OUTER JOIN (
        SELECT videos.channel_id, COUNT(*) num_views
        FROM   views inner_views
        JOIN videos ON videos.id = inner_views.video_id
        GROUP BY videos.channel_id
      ) views ON views.channel_id = channels.id
    }
    ).select("channels.*, COALESCE(views.num_views, 0) AS num_views")
  end

  def self.include_all
    includes(splash_attachment: :blob, icon_attachment: :blob)
      .include_subscriber_counts
      .include_num_views
  end
end
