class RenameRackOrderListToRackOrder < ActiveRecord::Migration[5.2]
  def change
    rename_column :boards, :rack_order_list, :rack_order
  end
end
