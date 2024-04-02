import { getHydratedMedia } from "@/utils/mediaClient";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const mediaLikes = JSON.parse(req.body);
    const media = await getHydratedMedia(mediaLikes);
    res.status(200).json(media);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}