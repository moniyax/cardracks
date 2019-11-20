class Board < ApplicationRecord
    has_many :card_racks, dependent: :delete_all
    belongs_to :creator, class_name: 'User'
end
