class CreateCardRacks < ActiveRecord::Migration[5.2]
  def change
    create_table :card_racks do |t|
      t.string :title
      t.uuid :board_id, foreign_key: true

      t.timestamps
    end
  end
end
