import { Request, Response } from "express"


const errorHandler = (fn: Function) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((err: Error) => {
            res.status(500).json({
                message: "internal error",
                errorMessage: err.message,
                error:err,
            })
            return
        })
    }

    // return (req: Request, res: Response) => {
    //     try {
    //         fn(req, res)
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "internal error",
    //             errorMessage: error
    //         })
            
    //     }
    // }

}
export default errorHandler;