class AddCreatorIdToBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :creator_id, :string
  end
end
