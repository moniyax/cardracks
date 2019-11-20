class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :created_conversations, class_name: 'Conversation'
  has_many :joined_conversations, class_name: 'Conversation', foreign_key: :peer_id

  has_many :created_boards, foreign_key: :creator_id, class_name: 'Board'
  validates :email, uniqueness: true

  def all_conversations
    Conversation.where 'user_id = ? or peer_id=?', id, id
  end
end
