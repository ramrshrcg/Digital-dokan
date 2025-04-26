//cart requiremnts 
// userId(foreign key), productId(foreign key)
// quantity, totalPrice



import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'cart',
    modelName: 'Cart',
    timestamps: true,

})
export class CartModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

   
}

export default CartModel;