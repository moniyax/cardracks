class ChangeCardRackIdTypeToUuid < ActiveRecord::Migration[5.2]

  def up
    change_table :card_racks do |t|
      t.remove :id
      t.uuid :id, default: "gen_random_uuid()", null: false
      t.remove :board_id
      t.uuid :board_id, foreign_key: true
    end
    execute "ALTER TABLE card_racks ADD PRIMARY KEY (id);"
  end

  def down
    change_table :card_racks do |t|
      t.remove :id
      t.column :id, :integer
    end
  end
end