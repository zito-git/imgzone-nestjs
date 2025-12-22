const { Worker } = require("bullmq");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
require("dotenv").config();

const webpDir = path.join(process.cwd(), "webp");

if (!fs.existsSync(webpDir)) fs.mkdirSync(webpDir, { recursive: true });

const myWorker = new Worker(
  "images",
  async (job) => {
    const { files } = job.data;
    if (!files) return;
    console.log("🔥 처리 시작:", files);

    await Promise.all(
      files.map(async (fileName) => {
        //경로 확인
        const inputPath = path.join("../backend/uploads", fileName);
        if (!fs.existsSync(inputPath))
          return console.error("파일 없음:", inputPath);

        const outputFileName = path.parse(fileName).name + ".webp";
        const outputPath = path.join(webpDir, outputFileName);
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`${fileName} -> ${outputFileName}`);
      })
    );
    console.log("작업 완료");
  },
  {
    connection: {
      host: process.env.MY_URL,
      port: 6379,
    },
  }
);

myWorker.on("completed", (job) => console.log(`Job ${job.id} 완료`));
myWorker.on("failed", (job, err) => console.error(`Job ${job?.id} 실패:`, err));
