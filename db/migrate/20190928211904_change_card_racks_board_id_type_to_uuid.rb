class ChangeCardRacksBoardIdTypeToUuid < ActiveRecord::Migration[5.2]
  def change
    add_column :card_racks, :board_uuid, :uuid 
   
    change_table :card_racks do |t| 
     t.remove :board_id 
     t.rename :board_uuid, :board_id 
   end
  end
end
