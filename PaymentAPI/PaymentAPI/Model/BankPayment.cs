using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentAPI.Model
{
    [Serializable]
    public class BankPayment
    {
        public string Bsb { get; set; }
        public string AccountNumber { get; set; }
        public string AccountName { get; set; }
        public int ReferenceNumber { get; set; }
        public string PaymentAmount { get; set; }

        public BankPayment( string bsb, string accountNumber, string accountName, int referenceNumber, string paymentAmount)
        {
            AccountName = accountName;
            AccountNumber = accountNumber;
            Bsb = bsb;
            ReferenceNumber = referenceNumber;
            PaymentAmount = paymentAmount;
        }
    }
}