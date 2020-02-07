class CardsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cards_channel_for_user_#{params['user_id']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
