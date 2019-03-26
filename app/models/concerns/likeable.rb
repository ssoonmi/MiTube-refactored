module Likeable
  extend ActiveSupport::Concern

  included do
    has_many :likes, as: :likeable, dependent: :destroy
  end

  module ClassMethods
    def include_like_counts
      # AND positives.likeable_id IN (#{ids.join(', ')}) 
      joins(
      %{
        LEFT OUTER JOIN (
          SELECT positives.likeable_id, COUNT(*) like_count
          FROM   likes positives
          WHERE positives.likeable_type = '#{self.name}' AND positives.positive = TRUE
          GROUP BY positives.likeable_id
        ) positive_counts ON positive_counts.likeable_id = #{self.table_name}.id
      }
      ).select("#{self.table_name}.*, COALESCE(positive_counts.like_count, 0) AS like_count")
    end

    def include_dislike_counts
      # AND negatives.likeable_id IN (#{ids.join(', ')}) 
      joins(
      %{
        LEFT OUTER JOIN (
          SELECT negatives.likeable_id, COUNT(*) dislike_count
          FROM   likes negatives
          WHERE negatives.likeable_type = '#{self.name}' AND negatives.positive = FALSE
          GROUP BY negatives.likeable_id
        ) negative_counts ON negative_counts.likeable_id = #{self.table_name}.id
      }
      ).select("#{self.table_name}.*, COALESCE(negative_counts.dislike_count, 0) AS dislike_count")
    end
  end

end