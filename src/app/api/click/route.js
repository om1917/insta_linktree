import { Statistics } from "@/models/Statistics";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URI);
    const uri = new URL(req.url);
    const clickedLink = atob(uri.searchParams.get('uri'));
    const page = uri.searchParams.get('page');
    await Statistics.create({ type: 'click', uri: clickedLink, page});
    return Response.json(true);
}