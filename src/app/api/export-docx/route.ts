import { NextResponse } from "next/server";
import htmlToDocx from "html-to-docx";

export async function POST(req: Request) {
  try {
    const { html, filename } = await req.json();

    const fileBuffer = await htmlToDocx(html);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename=${filename || "export.docx"}`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });
  } catch (error) {
    console.error("DOCX export error:", error);
    return NextResponse.json({ error: "Failed to export DOCX" }, { status: 500 });
  }
}
