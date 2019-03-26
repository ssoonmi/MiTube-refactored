json.extract! channel, :id, :name, :description, :user_id, :created_at
json.splash polymorphic_url(channel.splash) if channel.splash.attached?
json.icon polymorphic_url(channel.icon) if channel.icon.attached?
json.numSubscribers channel.subscriber_count
json.numViews channel.num_views