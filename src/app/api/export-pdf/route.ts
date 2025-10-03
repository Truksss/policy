// import { NextResponse } from "next/server";
// import puppeteer from "puppeteer";

// // Ensure this route runs on the Node.js runtime so native chromium can be launched.
// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { html, filename } = await req.json();
//     // Build launch options with sensible defaults and allow overriding the
//     // executable path via env (useful if your deployment provides a chrome binary)
//     const launchOptions: any = {
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
//     };
//     if (process.env.PUPPETEER_EXECUTABLE_PATH) {
//       launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
//     }

//     const browser = await puppeteer.launch(launchOptions);
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "40px", right: "20px", bottom: "40px", left: "40px" },
//     });

//     await browser.close();

//     return new NextResponse(Buffer.from(pdfBuffer), {
//       headers: {
//         "Content-Disposition": `attachment; filename=${filename || "export.pdf"}`,
//         "Content-Type": "application/pdf",
//       },
//     });
//   } catch (error) {
//     console.error("PDF export error:", error);
//     return NextResponse.json({ error: "Failed to export PDF" }, { status: 500 });
//   }
// }
