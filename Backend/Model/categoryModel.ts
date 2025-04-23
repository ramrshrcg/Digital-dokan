
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Product from "./productModel";

@Table({
    tableName: "categories",
    timestamps: true,
    modelName: "Category",
})

class Category extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        // type: DataType.UUID,
        // defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare categoryName: string;


    
}

export default Category;