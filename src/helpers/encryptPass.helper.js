import crypto from 'crypto';

export default function(pass) {
    //Hashed pass
    return crypto.createHmac('sha256', 'super secret')
                   .update(pass)
                   .digest('hex');
}