import { NextApiRequest, NextApiResponse } from "next";

/**
 * API Routes
 * API Routes 공식 문서
 * https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 * @param req
 * @param res
 */
export default function handlerhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}
