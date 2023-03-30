export interface product{
      id: number ,
      category: string,
      productName :string,
      description :string,
      quantity : number,
      price : number, 
      image : string,
      discount:number,
      userId:number
    
  }
export interface cart{
  id: number ,
  category: string,
  productName :string,
  description :string,
  quantity : number,
  price : number, 
  image : string,
  discount:number,
  productId:number,
  userId:number
  }
