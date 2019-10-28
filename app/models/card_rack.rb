class CardRack < ApplicationRecord
  belongs_to :board
  has_many :cards
end
