import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request); // userID -> userId (в Clerk обычно так)
        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message || "An unexpected error occurred.",
        }, { status: 500 });
    }
}
