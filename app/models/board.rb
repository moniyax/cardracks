class Board < ApplicationRecord
    has_many :card_racks, dependent: :delete_all
end
