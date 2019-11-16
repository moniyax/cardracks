class AddCardOrderToCardRacks < ActiveRecord::Migration[5.2]
  def change
    add_column :card_racks, :card_order, :string, array: true

  end
end
