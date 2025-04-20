
/*
seed categories  
categories like electoronics, ...

custom categories

delete fetch update
*/

import { Request, Response } from "express";
import Category from "../Model/categoryModel"

class categoryController {

    static categoryData = [
        {
            categoryName: 'electronics'
        },
        {
            categoryName: 'groceries'
        },
        {
            categoryName: 'foods'
        },
        {
            categoryName: 'fashion'
        }
    ]

    static async seedCategories(): Promise<void> {
        const data = await Category.findAll();
        if (!data.length) {
            await Category.bulkCreate(this.categoryData);
            console.log("Categories seeded")
        } else {
            console.log("Categories already seeded")
        }

    }
    // static async create(req:Request, res:Response){
    // {
    //     return res.status(200).json({
    //         message:"api hitted"
    //     })
    // }
    // }
    // Create custom category
    static async createCategory(req: Request, res: Response) {
        const { categoryName } = req.body;
        try {
            if (!categoryName) {
                return res.status(400).json({
                    message: "Category name is required"
                })
            }
            const existing = await Category.findOne({ where: { categoryName } });
            if (existing) {
                return res.status(400).json({ message: "Category already exists" });
            }
            const category = await Category.create({ categoryName });
            res.status(201).json({ message: "Category created", category });
        } catch (err) {
            res.status(500).json({ message: "Error creating category", error: err });
        }
    }

    // Get all categories
    static async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: "Error fetching categories", error: err });
        }
    }
    //get category by id
    static async getCategory(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const categories = await Category.findByPk(id);
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: "Error fetching categories", error: err });
        }
    }

    // Update category
    static async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        const { categoryName } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            category.categoryName = categoryName;
            await category.save();
            res.status(200).json({ message: "Category updated", category });
        } catch (err) {
            res.status(500).json({ message: "Error updating category", error: err });
        }
    }

    // Delete category
    static async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            // const category= await Category.findAll({
            //     where:
            //     {
            //         id:id
            //         }
            // })
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.destroy();
            res.status(200).json({ message: "Category deleted" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting category", error: err });
        }
    }
}

export default categoryController;  // export the class