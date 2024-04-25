import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";
import BannerModel, { Banner } from "../models/BannerModel";

export const revalidate = 3600;

const getLatest = cache(async () => {
    await dbConnect();
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(6).lean()
    return products as Product[]
})

const getFeatured = cache(async () => {
    await dbConnect();
    const products = await ProductModel.find({isFeatured: true}).limit(3).lean()
    return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
    await dbConnect();
    const products = await ProductModel.findOne({slug}).lean()
    return products as Product
})

const getBanner = cache(async () => {
    await dbConnect();
    const banners = await BannerModel.find({}).sort({ _id: -1 }).limit(6).lean()
    return banners as Banner[]
})

const productService = {
    getLatest,
    getFeatured,
    getBySlug,
    getBanner,
}

export default productService