using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PaymentAPI.Model;

namespace PaymentAPI.Controllers
{
    public class PaymentApiController : ApiController
    {
        [Route("api/Payment")]
        [HttpPost]
        public HttpResponseMessage SubmitPayment([FromBody]BankPayment payment)
        {
           string filePath = ConfigurationManager.AppSettings["FileLocation"];
            try
            {
                ReadOrWriteFile.WriteToBinaryFile(filePath, payment, true);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            
    }
}
}
