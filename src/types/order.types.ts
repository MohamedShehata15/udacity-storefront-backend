type OrderTypes = {
   id?: string;
   user_id: string;
   product_id: string;
   quantity: number;
   status: string;
   created_at?: Date;
   updated_at?: Date;
};

export default OrderTypes;
