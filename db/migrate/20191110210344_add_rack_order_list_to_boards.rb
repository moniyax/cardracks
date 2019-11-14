class AddRackOrderListToBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :rack_order_list, :string, array: true
  end
end
