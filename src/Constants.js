
const url = window.location.href;

export const title     = 'MyMPS';
export const subtitle  = 'Majlis Perbandaran Selayang';
export const FPX       = 'https://epstaging.mps.gov.my/fpx/sd.php';
export const CC        = 'https://epstaging.mps.gov.my/MiGS/payment.php';

export const returnURL      = 'https://mymps.mps.gov.my/int/resitpembayaran.php';
export const callbackURL    = 'https://mymps.mps.gov.my/int/callback.php';

export const captchaToken_localhost   = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
export const captchaToken_client_side = "6LeVouYUAAAAAP28NXI2rkRNFpyyJSuLXS62vT6b";
export const captchaToken_server_side = "6LeVouYUAAAAAMtOCWv-VownzeBah_fhT31K3xOB";

export const captchaToken = url.search("localhost") !== -1 ? captchaToken_localhost : captchaToken_client_side;