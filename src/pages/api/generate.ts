import openai from "@/utils/openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  if (process.env.CODE && body.code !== process.env.CODE) {
    res.statusCode = 403;
    res.json({ success: false, error: "请设置正确的授权密码再尝试" });
    return;
  }
  try {
    const response = await openai.createImage({
      prompt: body.prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    res.statusCode = 200;
    res.json({
      success: true,
      base64: `data:image/png;base64,${response.data.data[0].b64_json}`,
    });
  } catch (e) {
    res.statusCode = 500;
    res.json({ success: false, error: e });
  }
}
