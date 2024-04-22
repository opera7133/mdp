import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
//import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";
import { IP2Proxy } from 'ip2proxy-nodejs';
import { LimitChecker } from '../../lib/limitChecker';
import path from 'path';

const limitChecker = LimitChecker()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const env = process.env.NODE_ENV
    if (env === "production") {
        let ip2proxy = new IP2Proxy();
        const bin = path.resolve('./src/pages/api/', 'ip2proxy.bin')
        const clientIp = requestIp.getClientIp(req) || 'IP_NOT_FOUND'
        if (ip2proxy.open(bin) == 0) {
            if (ip2proxy.isProxy(clientIp) !== 0) {
                return res.status(403).json({ error: 'Your access is restricted.' })
            }
        }
    } else {
        return res.status(200).json({})
    }
    
    return res.status(400).json({ error: 'Request is not valid.' })
}
  
export default handler