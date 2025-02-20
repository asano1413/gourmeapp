import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
     username: z.string().min(1, "ユーザー名は必須です"),
     email: z.string().min(1, "メールアドレスは必須です").email(),
     password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export const POST = async (request: Request) => {
     try {
          const body = await request.json();

          const result = schema.safeParse(body);
          if (!result.success) {
               return NextResponse.json({
                    errors: result.error.format(),
               }, { status: 422 });
          }

          const { username, password, email } = result.data;

          const existingUser = await prisma.user.findUnique({ where: { email } });
          if (existingUser) {
               return NextResponse.json({
                    errors: {
                         email: "このメールアドレスは既に使用されています",
                    }
               }, { status: 422 });
          }
          

          const hashedPassword = await bcrypt.hash(password, 12);
          const user = await prisma.user.create({
               data: {
                    name: username,
                    email,
                    password: hashedPassword,
               },
          });

          return NextResponse.json({
               message: "登録が成功しました！",
               user,
          }, { status: 201 });
     } catch (error) {
          console.error('Error during registration:', error);
          return NextResponse.json({
               error: "Internal Server Error",
          }, { status: 500 });
     };
}
