import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
        const json = await request.json();
        console.log(json);
        const response = await db.profile.update({
            where: {
                userId: json.id,
            },
            data: {
                subscribed: json.subscribed,
                agreed: json.agreed,
            },
        });
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}
