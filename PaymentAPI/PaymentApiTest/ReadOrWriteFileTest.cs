
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PaymentAPI.Model;
using Moq;
using PaymentAPI;

namespace PaymentApiTest
{
    [TestClass]
    public class ReadOrWriteFileTest
    {
        [TestMethod]
        public void Check_Write_To_File_Success()
        {
            string filePath = "C:\\Github\\BankPayment\\PaymentHistory.txt";
            BankPayment payment = new BankPayment("Ankita", 22222222, 345567);
            ReadOrWriteFile.WriteToBinaryFile(filePath, payment, true);

            BankPayment paymentTest = ReadOrWriteFile.ReadFromBinaryFile<BankPayment>(filePath);

            Assert.AreEqual(payment.AccountNumber, paymentTest.AccountNumber);
            Assert.AreEqual(payment.AccountName, paymentTest.AccountName);
            Assert.AreEqual(payment.Bsb, paymentTest.Bsb);

        }
    }
}
