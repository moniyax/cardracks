class ChangeBoardIdTypeToUuid < ActiveRecord::Migration[5.2]

  def up
    add_column :boards, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :boards do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE boards ADD PRIMARY KEY (id);"
  end

  def down
    change_table :boards do |t|
      t.remove :id
      t.column :id, :integer
    end
  end
end