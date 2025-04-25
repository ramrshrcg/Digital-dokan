import Category from "../Model/categoryModel";
import Product from "../Model/productModel";





 const  productData = [
    {
      productName: "Premium Chicken Dog Food",
      productDescription: "High-protein kibble for active dogs.",
      productPrice: "25.99",
      productTotalStock: "120",
      discount: "0",
      productImageUrl: "https://example.com/images/dogfood1.jpg",
      categoryId: ""
    },
    {
      productName: "Wireless Bluetooth Earbuds",
      productDescription: "Noise-cancelling, long battery life.",
      productPrice: "59.99",
      productTotalStock: "200",
      discount: "10",
      productImageUrl: "https://example.com/images/earbuds.jpg",
      categoryId: ""
    },
    {
      productName: "Organic Brown Rice 1kg",
      productDescription: "Healthy, whole grain rice for daily meals.",
      productPrice: "3.49",
      productTotalStock: "300",
      discount: "0",
      productImageUrl: "https://example.com/images/rice.jpg",
      categoryId: ""
    },
    {
      productName: "Men's Classic Denim Jacket",
      productDescription: "Stylish and durable denim jacket.",
      productPrice: "45.00",
      productTotalStock: "80",
      discount: "5",
      productImageUrl: "https://example.com/images/denimjacket.jpg",
      categoryId: ""
    },
    {
      productName: "Fresh Farm Eggs (12 pcs)",
      productDescription: "Farm-fresh eggs, rich in protein.",
      productPrice: "2.99",
      productTotalStock: "150",
      discount: "0",
      productImageUrl: "https://example.com/images/eggs.jpg",
      categoryId: ""
    },
    {
      productName: "Women's Summer Maxi Dress",
      productDescription: "Lightweight, floral print maxi dress.",
      productPrice: "29.99",
      productTotalStock: "60",
      discount: "0",
      productImageUrl: "https://example.com/images/maxidress.jpg",
      categoryId: ""
    },
    {
      productName: "Smart Fitness Watch",
      productDescription: "Track your health and notifications.",
      productPrice: "89.99",
      productTotalStock: "75",
      discount: "15",
      productImageUrl: "https://example.com/images/fitnesswatch.jpg",
      categoryId: ""
    },
    {
      productName: "Gourmet Cat Food Tuna 400g",
      productDescription: "Delicious tuna cat food for all breeds.",
      productPrice: "4.50",
      productTotalStock: "110",
      discount: "0",
      productImageUrl: "https://example.com/images/catfood.jpg",
      categoryId: ""
    },
    {
      productName: "Organic Almonds 250g",
      productDescription: "Crunchy, healthy snack for all ages.",
      productPrice: "5.25",
      productTotalStock: "140",
      discount: "0",
      productImageUrl: "https://example.com/images/almonds.jpg",
      categoryId: ""
    },
    {
      productName: "Unisex Sports Sneakers",
      productDescription: "Comfortable sneakers for running and casual wear.",
      productPrice: "39.99",
      productTotalStock: "90",
      discount: "0",
      productImageUrl: "https://example.com/images/sneakers.jpg",
      categoryId: ""
    }
  ];

  const productSeeder= async ()=>
  {
    const data = await Product.findAll();


    if(data.length==0)
    {
        // await Category.findAll()
         productData.forEach(async product => {
             await Product.create({
                productName:product.productName,
                productDescription:product.productDescription,
                productPrice:product.productPrice,
                productTotalStock:product.productTotalStock,
                discount:product.discount,
                productImageUrl:product.productImageUrl,
                categoryId:null

            })
        });
    }
  }
  export {productSeeder}

  
  