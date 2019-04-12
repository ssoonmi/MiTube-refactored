# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  body              :text             not null
#  user_id           :integer          not null
#  video_id          :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :integer
#

class Comment < ApplicationRecord
  include Likeable

  validates :body, presence: true

  belongs_to :user
  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    optional: true
  belongs_to :video
  has_many :replies,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    dependent: :destroy

  def self.top_level_comments(video)
    if video.is_a? Integer
      Comment.includes(:replies).where(parent_comment_id: null).where(video_id: video)
    else
      video.comments.includes(:replies).where(comments: {parent_comment_id: null})
    end
  end

  def self.include_all
    includes(:user)
      .include_like_counts
      .include_dislike_counts
  end
end
