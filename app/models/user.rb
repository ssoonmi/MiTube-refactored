# == Schema Information
#
# Table name: users
#
#  id            :bigint(8)        not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  provider      :string
#  uid           :string
#  token         :string
#  expires_at    :integer
#  expires       :boolean
#  refresh_token :string
#  username      :string
#  email         :string
#  name          :string
#  image         :string
#

class User < ApplicationRecord
  include Ownable

  has_many :sessions,
    dependent: :destroy
  has_many :channels,
    dependent: :destroy
  has_many :subscriptions,
    dependent: :destroy
  has_many :channel_subscriptions,
    through: :subscriptions,
    source: :channel
  has_many :subscribers, 
    through: :channels,
    source: :subscribers
  has_many :comments,
    dependent: :destroy
  has_many :views
  has_many :likes,
    dependent: :destroy
  has_many :videos,
    through: :channels,
    source: :videos

  def self.from_omniauth(auth)
    # Creates a new user only if it doesn't exist
    where(email: auth.info.email).first_or_initialize do |user|
      user.name = auth.info.name
      user.email = auth.info.email
      user.image = auth.info.image
    end
  end

end
